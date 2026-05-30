from pydantic import BaseModel, Field


class ResearchCompany(BaseModel):
    id: str
    name: str
    slug: str
    ticker: str | None = None
    sector: str | None = None
    description: str | None = None


class ResearchDocument(BaseModel):
    id: str
    title: str | None = None
    description: str | None = None
    filename: str
    mime_type: str | None = None
    public: bool
    created_at: str


class ResearchListItem(BaseModel):
    id: str
    title: str
    slug: str
    excerpt: str | None = None
    published_at: str | None = None
    company: ResearchCompany | None = None


class ResearchDetail(ResearchListItem):
    content: str
    documents: list[ResearchDocument] = Field(default_factory=list)
