import 'server-only'
import type { User } from '@supabase/supabase-js'
import { createSupabaseServerClient } from './supabase/server'
import { getMissingAdminConfig, isSupabaseConfigured } from './supabase/config'

export type AdminAuthState =
  | { status: 'not_configured'; missing: string[] }
  | { status: 'signed_out' }
  | { status: 'forbidden'; email: string }
  | { status: 'authenticated'; user: User; email: string }

export const getConfiguredAdminEmails = (): string[] =>
  (process.env.ADMIN_EMAILS ?? '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean)

export const isApprovedAdminEmail = (email: string | null | undefined): boolean => {
  if (!email) {
    return false
  }

  return getConfiguredAdminEmails().includes(email.toLowerCase())
}

export const getAdminAuthState = async (): Promise<AdminAuthState> => {
  if (!isSupabaseConfigured()) {
    return { status: 'not_configured', missing: getMissingAdminConfig() }
  }

  const supabase = createSupabaseServerClient()
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return { status: 'signed_out' }
  }

  const email = user.email ?? ''

  if (!isApprovedAdminEmail(email)) {
    return { status: 'forbidden', email }
  }

  return { status: 'authenticated', user, email }
}
