'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { getAdminAuthState, isApprovedAdminEmail } from '@/lib/admin'
import { slugify } from '@/lib/reports'
import { createSupabaseAdminClient } from '@/lib/supabase/admin'
import { REPORT_DOCUMENTS_BUCKET, isSupabaseAdminConfigured } from '@/lib/supabase/config'
import { createSupabaseServerClient } from '@/lib/supabase/server'

const getRequiredString = (formData: FormData, key: string): string => {
  const value = formData.get(key)

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`${key} is required.`)
  }

  return value.trim()
}

const getOptionalString = (formData: FormData, key: string): string | null => {
  const value = formData.get(key)

  if (typeof value !== 'string') {
    return null
  }

  const trimmed = value.trim()

  return trimmed.length > 0 ? trimmed : null
}

const safeFileName = (fileName: string): string =>
  fileName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9.\-_]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'document'

const ensureAdmin = async (): Promise<string> => {
  const authState = await getAdminAuthState()

  if (authState.status === 'not_configured') {
    redirect('/admin?error=missing-config')
  }

  if (authState.status === 'signed_out') {
    redirect('/admin?error=signed-out')
  }

  if (authState.status === 'forbidden') {
    redirect('/admin?error=not-admin')
  }

  return authState.email
}

const createUniqueReportSlug = async (baseSlug: string): Promise<string> => {
  const supabase = createSupabaseAdminClient()
  const initialSlug = slugify(baseSlug)
  let candidate = initialSlug
  let suffix = 1

  while (suffix < 25) {
    const { data } = await supabase
      .from('analysis_posts')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle()

    if (!data) {
      return candidate
    }

    suffix += 1
    candidate = `${initialSlug}-${suffix}`
  }

  return `${initialSlug}-${Date.now().toString(36)}`
}

const resolveCompanyId = async (formData: FormData): Promise<string | null> => {
  const supabase = createSupabaseAdminClient()
  const existingCompanyId = getOptionalString(formData, 'companyId')

  if (existingCompanyId) {
    return existingCompanyId
  }

  const newCompanyName = getOptionalString(formData, 'newCompanyName')
  const newCompanyTicker = getOptionalString(formData, 'newCompanyTicker')?.toUpperCase() ?? null

  if (!newCompanyName && !newCompanyTicker) {
    return null
  }

  const companyName = newCompanyName ?? newCompanyTicker ?? 'General Research'
  const companySlug = slugify(newCompanyTicker ?? companyName)

  const { data: existingCompany } = await supabase
    .from('companies')
    .select('id')
    .eq('slug', companySlug)
    .maybeSingle()

  if (existingCompany?.id) {
    return existingCompany.id as string
  }

  const { data: createdCompany, error } = await supabase
    .from('companies')
    .insert({
      name: companyName,
      slug: companySlug,
      ticker: newCompanyTicker,
      sector: getOptionalString(formData, 'newCompanySector'),
      description: getOptionalString(formData, 'newCompanyDescription')
    })
    .select('id')
    .single()

  if (error) {
    throw new Error(error.message)
  }

  return createdCompany.id as string
}

export const signInAdmin = async (formData: FormData): Promise<void> => {
  const email = getRequiredString(formData, 'email').toLowerCase()
  const password = getRequiredString(formData, 'password')

  if (!isApprovedAdminEmail(email)) {
    redirect('/admin?error=not-admin')
  }

  const supabase = createSupabaseServerClient()
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    redirect('/admin?error=login-failed')
  }

  redirect('/admin')
}

export const signOutAdmin = async (): Promise<void> => {
  const supabase = createSupabaseServerClient()
  await supabase.auth.signOut()
  redirect('/admin')
}

export const createReport = async (formData: FormData): Promise<void> => {
  await ensureAdmin()

  if (!isSupabaseAdminConfigured()) {
    redirect('/admin?error=missing-service-role')
  }

  const supabase = createSupabaseAdminClient()
  const title = getRequiredString(formData, 'title')
  const summary = getRequiredString(formData, 'summary')
  const content = getRequiredString(formData, 'content')
  const requestedStatus = getOptionalString(formData, 'status')
  const published = requestedStatus === 'published'
  const publishedAt = published ? new Date().toISOString() : null
  const companyId = await resolveCompanyId(formData)
  const slug = await createUniqueReportSlug(getOptionalString(formData, 'slug') ?? title)

  const { data: createdReport, error: reportError } = await supabase
    .from('analysis_posts')
    .insert({
      title,
      slug,
      content,
      excerpt: summary,
      company_id: companyId,
      published,
      published_at: publishedAt
    })
    .select('id, slug')
    .single()

  if (reportError) {
    throw new Error(reportError.message)
  }

  const documentFile = formData.get('document')

  if (documentFile instanceof File && documentFile.size > 0) {
    const fileName = safeFileName(documentFile.name)
    const documentPath = `analysis/${createdReport.id}/${Date.now()}-${fileName}`
    const { error: uploadError } = await supabase.storage
      .from(REPORT_DOCUMENTS_BUCKET)
      .upload(documentPath, documentFile, {
        cacheControl: '3600',
        contentType: documentFile.type || 'application/octet-stream',
        upsert: false
      })

    if (uploadError) {
      throw new Error(uploadError.message)
    }

    const { error: documentError } = await supabase.from('documents').insert({
      bucket: REPORT_DOCUMENTS_BUCKET,
      path: documentPath,
      filename: fileName,
      mime_type: documentFile.type || null,
      size: documentFile.size,
      company_id: companyId,
      analysis_post_id: createdReport.id,
      public: published,
      title: getOptionalString(formData, 'documentTitle') ?? title,
      description: summary
    })

    if (documentError) {
      throw new Error(documentError.message)
    }
  }

  revalidatePath('/admin')
  revalidatePath('/analysis')
  revalidatePath('/documents')
  redirect(`/admin?created=${createdReport.slug}`)
}
