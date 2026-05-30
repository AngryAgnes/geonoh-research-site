import 'server-only'
import { getBackendBaseUrl } from './config'

export interface BackendResearchCompany {
  id: string
  name: string
  slug: string
  ticker: string | null
  sector: string | null
  description: string | null
}

export interface BackendResearchDocument {
  id: string
  title: string | null
  description: string | null
  filename: string
  mime_type: string | null
  public: boolean
  created_at: string
}

export interface BackendResearchListItem {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
  company: BackendResearchCompany | null
}

export interface BackendResearchDetail extends BackendResearchListItem {
  content: string
  documents: BackendResearchDocument[]
}

export type BackendResearchFailureReason =
  | 'backend-not-configured'
  | 'supabase-not-configured'
  | 'not-found'
  | 'request-failed'

export type BackendResearchResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: BackendResearchFailureReason }

const mapStatusToReason = (status: number): BackendResearchFailureReason => {
  if (status === 503) {
    return 'supabase-not-configured'
  }

  if (status === 404) {
    return 'not-found'
  }

  return 'request-failed'
}

const fetchBackendJson = async <T>(path: string): Promise<BackendResearchResult<T>> => {
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

export const getBackendResearchReports = async (): Promise<
  BackendResearchResult<BackendResearchListItem[]>
> => fetchBackendJson<BackendResearchListItem[]>('/v1/research')

export const getBackendResearchReport = async (
  slug: string
): Promise<BackendResearchResult<BackendResearchDetail>> =>
  fetchBackendJson<BackendResearchDetail>(`/v1/research/${encodeURIComponent(slug)}`)
