from supabase import Client, create_client

from app.core.config import get_settings


class SupabaseNotConfiguredError(RuntimeError):
    """Raised when public Supabase configuration is missing."""


def create_supabase_public_client() -> Client:
    settings = get_settings()

    if not settings.supabase_url or not settings.supabase_anon_key:
        raise SupabaseNotConfiguredError("Supabase is not configured.")

    return create_client(settings.supabase_url, settings.supabase_anon_key)


def create_supabase_service_client() -> Client:
    settings = get_settings()

    if not settings.supabase_url or not settings.supabase_service_role_key:
        raise SupabaseNotConfiguredError("Supabase is not configured.")

    return create_client(settings.supabase_url, settings.supabase_service_role_key)
