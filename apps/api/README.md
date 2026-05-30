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

This slice does not connect to Supabase or expose research/company/document APIs yet.
