from pydantic import BaseModel


class DocumentReport(BaseModel):
    title: str
    slug: str


class DocumentCompany(BaseModel):
    name: str
    slug: str


class PublicDocument(BaseModel):
    id: str
    title: str | None = None
    description: str | None = None
    filename: str
    mime_type: str | None = None
    public: bool
    created_at: str
    report: DocumentReport | None = None
    company: DocumentCompany | None = None
