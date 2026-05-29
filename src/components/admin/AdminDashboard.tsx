import { signOutAdmin } from '@/app/admin/actions'
import type { ReportCompany, ResearchReport } from '@/lib/reports'
import ReportForm from './ReportForm'

const formatDate = (value: string | null): string => {
  if (!value) {
    return 'Not published'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value))
}

export default function AdminDashboard({
  email,
  companies,
  reports,
  createdSlug,
  error,
  canManageReports
}: {
  email: string
  companies: readonly ReportCompany[]
  reports: readonly ResearchReport[]
  createdSlug?: string
  error?: string
  canManageReports: boolean
}) {
  return (
    <div className="space-y-8">
      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">Admin dashboard</p>
            <h1 className="mt-3 text-3xl font-semibold text-slate-950">Manage research reports</h1>
            <p className="mt-3 text-sm text-slate-600">Signed in as {email}</p>
          </div>
          <form action={signOutAdmin}>
            <button
              type="submit"
              className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
            >
              Sign out
            </button>
          </form>
        </div>

        {createdSlug ? (
          <div className="mt-5 rounded-md border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900">
            Report saved: {createdSlug}
          </div>
        ) : null}

        {error ? (
          <div className="mt-5 rounded-md border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            {error === 'missing-service-role'
              ? 'SUPABASE_SERVICE_ROLE_KEY is required for server-side admin report management.'
              : 'Unable to complete that admin action.'}
          </div>
        ) : null}
      </section>

      {canManageReports ? <ReportForm companies={companies} /> : null}

      <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <p className="text-sm font-semibold uppercase text-slate-500">Reports</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">Drafts and published work</h2>
          </div>
          <div className="text-sm text-slate-500">{reports.length} total</div>
        </div>

        <div className="mt-6 divide-y divide-slate-200">
          {reports.length > 0 ? (
            reports.map((report) => (
              <article key={report.id} className="py-4 first:pt-0 last:pb-0">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="font-semibold text-slate-950">{report.title}</h3>
                    <p className="mt-1 text-sm text-slate-600">
                      {report.company
                        ? `${report.company.name}${report.company.ticker ? ` (${report.company.ticker})` : ''}`
                        : 'General research'}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    {report.published ? 'Published' : 'Draft'}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{report.excerpt}</p>
                <div className="mt-3 text-xs font-medium uppercase text-slate-500">
                  {formatDate(report.published_at)}
                </div>
              </article>
            ))
          ) : (
            <p className="text-sm text-slate-600">No reports have been created yet.</p>
          )}
        </div>
      </section>
    </div>
  )
}
