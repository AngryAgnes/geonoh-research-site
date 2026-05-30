from typing import Any

from fastapi import APIRouter, HTTPException

from app.core.supabase import SupabaseNotConfiguredError, create_supabase_public_client
from app.models.company import (
    CompanyDetail,
    CompanyDocument,
    CompanyListItem,
    CompanyResearchReport,
)

router = APIRouter(prefix="/companies", tags=["companies"])

COMPANY_SELECT = "id, name, slug, ticker, sector, description"

COMPANY_REPORT_SELECT = """
id,
title,
slug,
excerpt,
published_at,
documents(id, title, description, filename, mime_type, public, created_at)
"""


def get_public_client_or_503():
    try:
        return create_supabase_public_client()
    except SupabaseNotConfiguredError as error:
        raise HTTPException(status_code=503, detail="Supabase is not configured.") from error


def map_company(row: dict[str, Any]) -> CompanyListItem:
    return CompanyListItem(
        id=str(row["id"]),
        name=str(row["name"]),
        slug=str(row["slug"]),
        ticker=row.get("ticker"),
        sector=row.get("sector"),
        description=row.get("description"),
    )


def map_company_report(row: dict[str, Any]) -> CompanyResearchReport:
    return CompanyResearchReport(
        id=str(row["id"]),
        title=str(row["title"]),
        slug=str(row["slug"]),
        excerpt=row.get("excerpt"),
        published_at=row.get("published_at"),
    )


def map_company_document(row: dict[str, Any], report_title: str) -> CompanyDocument:
    return CompanyDocument(
        id=str(row["id"]),
        title=row.get("title"),
        description=row.get("description"),
        filename=str(row["filename"]),
        mime_type=row.get("mime_type"),
        public=bool(row.get("public")),
        created_at=str(row["created_at"]),
        report_title=report_title,
    )


@router.get("", response_model=list[CompanyListItem])
async def list_companies() -> list[CompanyListItem]:
    supabase = get_public_client_or_503()

    try:
        response = supabase.table("companies").select(COMPANY_SELECT).order("name").execute()
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load companies.") from error

    return [map_company(row) for row in response.data or []]


@router.get("/{slug}", response_model=CompanyDetail)
async def get_company_detail(slug: str) -> CompanyDetail:
    supabase = get_public_client_or_503()

    try:
        company_response = (
            supabase.table("companies").select(COMPANY_SELECT).eq("slug", slug).limit(1).execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load company.") from error

    company_rows = company_response.data or []

    if not company_rows:
        raise HTTPException(status_code=404, detail="Company not found.")

    company = map_company(company_rows[0])

    try:
        report_response = (
            supabase.table("analysis_posts")
            .select(COMPANY_REPORT_SELECT)
            .eq("published", True)
            .eq("company_id", company.id)
            .order("published_at", desc=True, nullsfirst=False)
            .execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load company research.") from error

    reports = [map_company_report(row) for row in report_response.data or []]
    documents = [
        map_company_document(document, str(row["title"]))
        for row in report_response.data or []
        for document in row.get("documents") or []
        if isinstance(document, dict) and document.get("public") is True
    ]

    return CompanyDetail(
        id=company.id,
        name=company.name,
        slug=company.slug,
        ticker=company.ticker,
        sector=company.sector,
        description=company.description,
        reports=reports,
        documents=documents,
    )
