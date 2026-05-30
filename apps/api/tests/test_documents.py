from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import app


def clear_supabase_env(monkeypatch) -> None:
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_ANON_KEY", raising=False)
    monkeypatch.delenv("SUPABASE_SERVICE_ROLE_KEY", raising=False)
    get_settings.cache_clear()


def test_list_documents_requires_supabase_config(monkeypatch) -> None:
    clear_supabase_env(monkeypatch)
    client = TestClient(app)

    response = client.get("/v1/documents")

    assert response.status_code == 503
    assert response.json() == {"detail": "Supabase is not configured."}


def test_document_download_requires_supabase_config(monkeypatch) -> None:
    clear_supabase_env(monkeypatch)
    client = TestClient(app)

    response = client.get("/v1/documents/example-id/download")

    assert response.status_code == 503
    assert response.json() == {"detail": "Supabase is not configured."}
