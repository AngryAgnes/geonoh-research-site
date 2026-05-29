import 'server-only'
import { createSupabaseAdminClient } from './supabase/admin'
import { createSupabaseServerClient } from './supabase/server'
import { isSupabaseAdminConfigured, isSupabaseConfigured } from './supabase/config'

export interface ReportCompany {
  id: string
  name: string
  slug: string
  ticker: string | null
  sector: string | null
  description: string | null
}

export interface ReportDocument {
  id: string
  title: string | null
  description: string | null
  bucket: string
  path: string
  filename: string
  mime_type: string | null
  public: boolean
  created_at: string
}

export interface ResearchReport {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  company: ReportCompany | null
  documents: ReportDocument[]
}

interface ReportRow {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string | null
  published: boolean
  published_at: string | null
  created_at: string
  updated_at: string
  company: ReportCompany | ReportCompany[] | null
  documents: ReportDocument[] | null
}

export interface CompanyResearchHub {
  company: ReportCompany
  reports: ResearchReport[]
}

export const slugify = (value: string): string => {
  const slug = value
    .toLowerCase()
    .trim()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

  return slug || 'report'
}

const normalizeCompany = (company: ReportRow['company']): ReportCompany | null => {
  if (Array.isArray(company)) {
    return company[0] ?? null
  }

  return company
}

const mapReportRows = (rows: ReportRow[]): ResearchReport[] =>
  rows.map((row) => ({
    ...row,
    company: normalizeCompany(row.company),
    documents: row.documents ?? []
  }))

export const getPublishedReports = async (): Promise<ResearchReport[]> => {
  if (!isSupabaseConfigured()) {
    return []
  }

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('analysis_posts')
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      published,
      published_at,
      created_at,
      updated_at,
      company:companies(id, name, slug, ticker, sector, description),
      documents(id, title, description, bucket, path, filename, mime_type, public, created_at)
    `
    )
    .eq('published', true)
    .order('published_at', { ascending: false, nullsFirst: false })

  if (error) {
    console.error('Failed to load published reports:', error.message)
    return []
  }

  return mapReportRows((data ?? []) as unknown as ReportRow[])
}

export const getPublishedReportBySlug = async (slug: string): Promise<ResearchReport | null> => {
  if (!isSupabaseConfigured()) {
    return null
  }

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('analysis_posts')
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      published,
      published_at,
      created_at,
      updated_at,
      company:companies(id, name, slug, ticker, sector, description),
      documents(id, title, description, bucket, path, filename, mime_type, public, created_at)
    `
    )
    .eq('published', true)
    .eq('slug', slug)
    .maybeSingle()

  if (error) {
    console.error('Failed to load published report:', error.message)
    return null
  }

  if (!data) {
    return null
  }

  return mapReportRows([data as unknown as ReportRow])[0] ?? null
}

export const getPublicCompanies = async (): Promise<ReportCompany[]> => {
  if (!isSupabaseConfigured()) {
    return []
  }

  const supabase = createSupabaseServerClient()
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, slug, ticker, sector, description')
    .order('name', { ascending: true })

  if (error) {
    console.error('Failed to load public companies:', error.message)
    return []
  }

  return (data ?? []) as ReportCompany[]
}

export const getCompanyResearchHub = async (slug: string): Promise<CompanyResearchHub | null> => {
  if (!isSupabaseConfigured()) {
    return null
  }

  const supabase = createSupabaseServerClient()
  const { data: company, error: companyError } = await supabase
    .from('companies')
    .select('id, name, slug, ticker, sector, description')
    .eq('slug', slug)
    .maybeSingle()

  if (companyError) {
    console.error('Failed to load company:', companyError.message)
    return null
  }

  if (!company) {
    return null
  }

  const typedCompany = company as ReportCompany
  const { data: reports, error: reportsError } = await supabase
    .from('analysis_posts')
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      published,
      published_at,
      created_at,
      updated_at,
      company:companies(id, name, slug, ticker, sector, description),
      documents(id, title, description, bucket, path, filename, mime_type, public, created_at)
    `
    )
    .eq('published', true)
    .eq('company_id', typedCompany.id)
    .order('published_at', { ascending: false, nullsFirst: false })

  if (reportsError) {
    console.error('Failed to load company reports:', reportsError.message)
    return {
      company: typedCompany,
      reports: []
    }
  }

  return {
    company: typedCompany,
    reports: mapReportRows((reports ?? []) as unknown as ReportRow[])
  }
}

export const getAdminReports = async (): Promise<ResearchReport[]> => {
  if (!isSupabaseAdminConfigured()) {
    return []
  }

  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('analysis_posts')
    .select(
      `
      id,
      title,
      slug,
      content,
      excerpt,
      published,
      published_at,
      created_at,
      updated_at,
      company:companies(id, name, slug, ticker, sector, description),
      documents(id, title, description, bucket, path, filename, mime_type, public, created_at)
    `
    )
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Failed to load admin reports:', error.message)
    return []
  }

  return mapReportRows((data ?? []) as unknown as ReportRow[])
}

export const getAdminCompanies = async (): Promise<ReportCompany[]> => {
  if (!isSupabaseAdminConfigured()) {
    return []
  }

  const supabase = createSupabaseAdminClient()
  const { data, error } = await supabase
    .from('companies')
    .select('id, name, slug, ticker, sector, description')
    .order('name', { ascending: true })

  if (error) {
    console.error('Failed to load companies:', error.message)
    return []
  }

  return (data ?? []) as ReportCompany[]
}
