from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import get_settings

API_VERSION = "0.1.0"


def create_app() -> FastAPI:
    settings = get_settings()
    app = FastAPI(title="Geon Oh Kim Research API", version=API_VERSION)

    app.add_middleware(
        CORSMiddleware,
        allow_origins=[settings.frontend_origin],
        allow_credentials=True,
        allow_methods=["GET"],
        allow_headers=["*"],
    )

    @app.get("/health")
    async def health() -> dict[str, str]:
        return {
            "status": "ok",
            "service": "api",
            "version": API_VERSION,
        }

    return app


app = create_app()
