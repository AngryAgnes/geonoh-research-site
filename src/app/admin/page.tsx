import AdminDashboard from '@/components/admin/AdminDashboard'
import AdminLoginForm from '@/components/admin/AdminLoginForm'
import { getAdminAuthState } from '@/lib/admin'
import { getAdminCompanies, getAdminReports } from '@/lib/reports'
import { getMissingAdminConfig, isSupabaseAdminConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

interface AdminPageProps {
  searchParams?: {
    created?: string
    error?: string
  }
}

export default async function AdminPage({ searchParams }: AdminPageProps) {
  const authState = await getAdminAuthState()

  if (authState.status === 'not_configured') {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <p className="text-sm font-semibold uppercase">Configuration required</p>
        <h1 className="mt-3 text-2xl font-semibold">Supabase is not configured yet.</h1>
        <p className="mt-3 text-sm leading-6">
          Add the required environment variables before using the admin dashboard:
        </p>
        <ul className="mt-4 list-disc space-y-1 pl-5 text-sm">
          {authState.missing.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      </section>
    )
  }

  if (authState.status === 'signed_out') {
    return <AdminLoginForm error={searchParams?.error} />
  }

  if (authState.status === 'forbidden') {
    return (
      <section className="mx-auto max-w-2xl rounded-lg border border-amber-200 bg-amber-50 p-6 text-amber-950">
        <p className="text-sm font-semibold uppercase">Access blocked</p>
        <h1 className="mt-3 text-2xl font-semibold">You do not have admin access.</h1>
        <p className="mt-3 text-sm leading-6">
          The signed-in email {authState.email} is not included in `ADMIN_EMAILS`.
        </p>
      </section>
    )
  }

  const canManageReports = isSupabaseAdminConfigured()
  const [companies, reports] = canManageReports
    ? await Promise.all([getAdminCompanies(), getAdminReports()])
    : [[], []]

  return (
    <AdminDashboard
      email={authState.email}
      companies={companies}
      reports={reports}
      createdSlug={searchParams?.created}
      error={searchParams?.error ?? (canManageReports ? undefined : 'missing-service-role')}
      canManageReports={canManageReports}
    />
  )
}
