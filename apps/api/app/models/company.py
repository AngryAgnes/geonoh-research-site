from pydantic import BaseModel, Field


class CompanyListItem(BaseModel):
    id: str
    name: str
    slug: str
    ticker: str | None = None
    sector: str | None = None
    description: str | None = None


class CompanyResearchReport(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str | None = None
    published_at: str | None = None


class CompanyDocument(BaseModel):
    id: str
    title: str | None = None
    description: str | None = None
    filename: str
    mime_type: str | None = None
    public: bool
    created_at: str
    report_title: str


class CompanyDetail(CompanyListItem):
    reports: list[CompanyResearchReport] = Field(default_factory=list)
    documents: list[CompanyDocument] = Field(default_factory=list)
