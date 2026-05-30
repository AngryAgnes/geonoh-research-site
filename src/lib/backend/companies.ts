import 'server-only'
import { getBackendBaseUrl } from './config'

export interface BackendCompanyListItem {
  id: string
  name: string
  slug: string
  ticker: string | null
  sector: string | null
  description: string | null
}

export interface BackendCompanyResearchReport {
  id: string
  title: string
  slug: string
  excerpt: string | null
  published_at: string | null
}

export interface BackendCompanyDocument {
  id: string
  title: string | null
  description: string | null
  filename: string
  mime_type: string | null
  public: boolean
  created_at: string
  report_title: string
}

export interface BackendCompanyDetail extends BackendCompanyListItem {
  reports: BackendCompanyResearchReport[]
  documents: BackendCompanyDocument[]
}

export type BackendCompanyFailureReason =
  | 'backend-not-configured'
  | 'supabase-not-configured'
  | 'not-found'
  | 'request-failed'

export type BackendCompanyResult<T> =
  | { ok: true; data: T }
  | { ok: false; reason: BackendCompanyFailureReason }

const mapStatusToReason = (status: number): BackendCompanyFailureReason => {
  if (status === 503) {
    return 'supabase-not-configured'
  }

  if (status === 404) {
    return 'not-found'
  }

  return 'request-failed'
}

const fetchBackendJson = async <T>(path: string): Promise<BackendCompanyResult<T>> => {
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

export const getBackendCompanies = async (): Promise<
  BackendCompanyResult<BackendCompanyListItem[]>
> => fetchBackendJson<BackendCompanyListItem[]>('/v1/companies')

export const getBackendCompany = async (
  slug: string
): Promise<BackendCompanyResult<BackendCompanyDetail>> =>
  fetchBackendJson<BackendCompanyDetail>(`/v1/companies/${encodeURIComponent(slug)}`)
