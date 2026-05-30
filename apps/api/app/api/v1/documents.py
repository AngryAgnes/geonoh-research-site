from typing import Any

from fastapi import APIRouter, HTTPException
from fastapi.responses import RedirectResponse

from app.core.supabase import (
    SupabaseNotConfiguredError,
    create_supabase_public_client,
    create_supabase_service_client,
)
from app.models.document import DocumentCompany, DocumentReport, PublicDocument

router = APIRouter(prefix="/documents", tags=["documents"])

DOCUMENT_LIST_SELECT = """
id,
title,
description,
filename,
mime_type,
public,
created_at,
report:analysis_posts(title, slug, published, company:companies(name, slug)),
company:companies(name, slug)
"""

DOCUMENT_DOWNLOAD_SELECT = "id, bucket, path, filename, public"


def get_public_client_or_503():
    try:
        return create_supabase_public_client()
    except SupabaseNotConfiguredError as error:
        raise HTTPException(status_code=503, detail="Supabase is not configured.") from error


def get_service_client_or_503():
    try:
        return create_supabase_service_client()
    except SupabaseNotConfiguredError as error:
        raise HTTPException(status_code=503, detail="Supabase is not configured.") from error


def normalize_relation(value: Any) -> dict[str, Any] | None:
    if isinstance(value, list):
        value = value[0] if value else None

    return value if isinstance(value, dict) else None


def map_report(row: dict[str, Any] | None) -> DocumentReport | None:
    if not row or row.get("published") is not True:
        return None

    return DocumentReport(title=str(row["title"]), slug=str(row["slug"]))


def map_company(row: dict[str, Any] | None) -> DocumentCompany | None:
    if not row:
        return None

    return DocumentCompany(name=str(row["name"]), slug=str(row["slug"]))


def map_public_document(row: dict[str, Any]) -> PublicDocument:
    report_row = normalize_relation(row.get("report"))
    company_row = normalize_relation(row.get("company"))
    report_company_row = normalize_relation(report_row.get("company")) if report_row else None

    return PublicDocument(
        id=str(row["id"]),
        title=row.get("title"),
        description=row.get("description"),
        filename=str(row["filename"]),
        mime_type=row.get("mime_type"),
        public=bool(row.get("public")),
        created_at=str(row["created_at"]),
        report=map_report(report_row),
        company=map_company(company_row) or map_company(report_company_row),
    )


@router.get("", response_model=list[PublicDocument])
async def list_documents() -> list[PublicDocument]:
    supabase = get_public_client_or_503()

    try:
        response = (
            supabase.table("documents")
            .select(DOCUMENT_LIST_SELECT)
            .eq("public", True)
            .order("created_at", desc=True)
            .execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load documents.") from error

    return [map_public_document(row) for row in response.data or []]


@router.get("/{document_id}/download")
async def download_document(document_id: str) -> RedirectResponse:
    supabase = get_service_client_or_503()

    try:
        response = (
            supabase.table("documents")
            .select(DOCUMENT_DOWNLOAD_SELECT)
            .eq("id", document_id)
            .limit(1)
            .execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load document.") from error

    rows = response.data or []

    if not rows:
        raise HTTPException(status_code=404, detail="Document not found.")

    document = rows[0]

    if document.get("public") is not True:
        raise HTTPException(status_code=403, detail="Document is not public.")

    try:
        signed_url_response = (
            supabase.storage.from_(str(document["bucket"]))
            .create_signed_url(
                str(document["path"]),
                60,
                {"download": str(document["filename"])},
            )
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to create download link.") from error

    signed_url = signed_url_response.get("signedUrl") or signed_url_response.get("signedURL")

    if not signed_url:
        raise HTTPException(status_code=502, detail="Unable to create download link.")

    return RedirectResponse(str(signed_url))
