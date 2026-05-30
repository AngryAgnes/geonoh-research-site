from fastapi.testclient import TestClient

from app.core.config import get_settings
from app.main import app


def clear_supabase_env(monkeypatch) -> None:
    monkeypatch.delenv("SUPABASE_URL", raising=False)
    monkeypatch.delenv("SUPABASE_ANON_KEY", raising=False)
    get_settings.cache_clear()


def test_list_research_requires_supabase_config(monkeypatch) -> None:
    clear_supabase_env(monkeypatch)
    client = TestClient(app)

    response = client.get("/v1/research")

    assert response.status_code == 503
    assert response.json() == {"detail": "Supabase is not configured."}


def test_research_detail_requires_supabase_config(monkeypatch) -> None:
    clear_supabase_env(monkeypatch)
    client = TestClient(app)

    response = client.get("/v1/research/example-report")

    assert response.status_code == 503
    assert response.json() == {"detail": "Supabase is not configured."}
