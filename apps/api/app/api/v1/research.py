from typing import Any

from fastapi import APIRouter, HTTPException

from app.core.supabase import SupabaseNotConfiguredError, create_supabase_public_client
from app.models.research import ResearchCompany, ResearchDetail, ResearchDocument, ResearchListItem

router = APIRouter(prefix="/research", tags=["research"])

RESEARCH_LIST_SELECT = """
id,
title,
slug,
excerpt,
published_at,
company:companies(id, name, slug, ticker, sector, description)
"""

RESEARCH_DETAIL_SELECT = """
id,
title,
slug,
content,
excerpt,
published_at,
company:companies(id, name, slug, ticker, sector, description),
documents(id, title, description, filename, mime_type, public, created_at)
"""


def get_public_client_or_503():
    try:
        return create_supabase_public_client()
    except SupabaseNotConfiguredError as error:
        raise HTTPException(status_code=503, detail="Supabase is not configured.") from error


def normalize_company(company: Any) -> ResearchCompany | None:
    if isinstance(company, list):
        company = company[0] if company else None

    if not isinstance(company, dict):
        return None

    return ResearchCompany(
        id=str(company["id"]),
        name=str(company["name"]),
        slug=str(company["slug"]),
        ticker=company.get("ticker"),
        sector=company.get("sector"),
        description=company.get("description"),
    )


def map_research_list_item(row: dict[str, Any]) -> ResearchListItem:
    return ResearchListItem(
        id=str(row["id"]),
        title=str(row["title"]),
        slug=str(row["slug"]),
        excerpt=row.get("excerpt"),
        published_at=row.get("published_at"),
        company=normalize_company(row.get("company")),
    )


def map_research_document(row: dict[str, Any]) -> ResearchDocument:
    return ResearchDocument(
        id=str(row["id"]),
        title=row.get("title"),
        description=row.get("description"),
        filename=str(row["filename"]),
        mime_type=row.get("mime_type"),
        public=bool(row.get("public")),
        created_at=str(row["created_at"]),
    )


def map_research_detail(row: dict[str, Any]) -> ResearchDetail:
    documents = [
        map_research_document(document)
        for document in row.get("documents") or []
        if isinstance(document, dict) and document.get("public") is True
    ]

    return ResearchDetail(
        id=str(row["id"]),
        title=str(row["title"]),
        slug=str(row["slug"]),
        content=str(row["content"]),
        excerpt=row.get("excerpt"),
        published_at=row.get("published_at"),
        company=normalize_company(row.get("company")),
        documents=documents,
    )


@router.get("", response_model=list[ResearchListItem])
async def list_research() -> list[ResearchListItem]:
    supabase = get_public_client_or_503()

    try:
        response = (
            supabase.table("analysis_posts")
            .select(RESEARCH_LIST_SELECT)
            .eq("published", True)
            .order("published_at", desc=True, nullsfirst=False)
            .execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load research.") from error

    return [map_research_list_item(row) for row in response.data or []]


@router.get("/{slug}", response_model=ResearchDetail)
async def get_research_detail(slug: str) -> ResearchDetail:
    supabase = get_public_client_or_503()

    try:
        response = (
            supabase.table("analysis_posts")
            .select(RESEARCH_DETAIL_SELECT)
            .eq("published", True)
            .eq("slug", slug)
            .limit(1)
            .execute()
        )
    except Exception as error:
        raise HTTPException(status_code=502, detail="Unable to load research.") from error

    rows = response.data or []

    if not rows:
        raise HTTPException(status_code=404, detail="Research report not found.")

    return map_research_detail(rows[0])
