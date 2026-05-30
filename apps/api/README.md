# Research API

Minimal FastAPI backend skeleton for the research platform.

## Local Development

```bash
cd apps/api
uv sync
uv run uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

Verify the health check:

```bash
curl http://127.0.0.1:8000/health
```

Expected response:

```json
{"status":"ok","service":"api","version":"0.1.0"}
```

Run backend tests:

```bash
uv run pytest
```

This backend currently exposes health checks plus public research, company, and document read
endpoints.

## Public Research API

Set backend Supabase public-read variables before using research endpoints:

```bash
SUPABASE_URL=
SUPABASE_ANON_KEY=
```

The public research endpoints use the anon key and Supabase RLS. They do not use the service-role
key.

```bash
curl http://127.0.0.1:8000/v1/research
curl http://127.0.0.1:8000/v1/research/example-slug
curl http://127.0.0.1:8000/v1/companies
curl http://127.0.0.1:8000/v1/companies/example-slug
curl http://127.0.0.1:8000/v1/documents
curl -i http://127.0.0.1:8000/v1/documents/example-id/download
```

If Supabase public-read configuration is missing, public read endpoints return HTTP `503` with:

```json
{"detail":"Supabase is not configured."}
```

`GET /v1/documents/{id}/download` uses `SUPABASE_SERVICE_ROLE_KEY` inside the backend only to
verify whether the document exists, block private documents with `403`, and create a short-lived
signed Storage URL for public documents.
