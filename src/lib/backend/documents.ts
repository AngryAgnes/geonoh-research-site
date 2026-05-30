import 'server-only'
import { getBackendBaseUrl } from './config'

export interface BackendDocumentReport {
  title: string
  slug: string
}

export interface BackendDocumentCompany {
  name: string
  slug: string
}

export interface BackendPublicDocument {
  id: string
  title: string | null
  description: string | null
  filename: string
  mime_type: string | null
  public: boolean
  created_at: string
  report: BackendDocumentReport | null
  company: BackendDocumentCompany | null
}

export type BackendDocumentFailureReason =
  | 'backend-not-configured'
  | 'supabase-not-configured'
  | 'not-found'
  | 'forbidden'
  | 'request-failed'

export type BackendDocumentResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: BackendDocumentFailureReason }

const mapStatusToReason = (status: number): BackendDocumentFailureReason => {
  if (status === 503) {
    return 'supabase-not-configured'
  }

  if (status === 404) {
    return 'not-found'
  }

  if (status === 403) {
    return 'forbidden'
  }

  return 'request-failed'
}

const fetchBackendJson = async <T>(path: string): Promise<BackendDocumentResult<T>> => {
  const backendBaseUrl = getBackendBaseUrl()

  if (!backendBaseUrl) {
    return { ok: false, reason: 'backend-not-configured' }
  }

  try {
    const response = await fetch(`${backendBaseUrl}${path}`, {
      cache: 'no-store'
    })

    if (!response.ok) {
      return { ok: false, reason: mapStatusToReason(response.status) }
    }

    return { ok: true, data: (await response.json()) as T }
  } catch {
    return { ok: false, reason: 'request-failed' }
  }
}

export const getBackendDocuments = async (): Promise<
  BackendDocumentResult<BackendPublicDocument[]>
> => fetchBackendJson<BackendPublicDocument[]>('/v1/documents')
