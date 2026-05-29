import Link from 'next/link'
import { companies as demoCompanies } from '@/lib/demo-data'
import { getPublicCompanies } from '@/lib/reports'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

export default async function CompaniesPage() {
  const usingDemoFallback = !isSupabaseConfigured()
  const companies = usingDemoFallback ? [] : await getPublicCompanies()

  return (
    <section>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-slate-500">Company research hubs</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Companies</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Company pages collect published research, supporting documents, and core business context.
        </p>
      </div>

      {usingDemoFallback ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Demo fallback mode: Supabase is not configured, so these are sample company records from
          the local demo dataset.
        </div>
      ) : null}

      <div className="mt-8 grid gap-5 md:grid-cols-2">
        {usingDemoFallback ? (
          demoCompanies.map((company) => (
            <article
              key={company.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="text-sm font-semibold uppercase text-slate-500">
                {company.ticker} · {company.exchange}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                <Link href={`/companies/${company.slug}`} className="hover:text-emerald-700">
                  {company.name}
                </Link>
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {company.sector} · {company.industry}
              </p>
              <p className="mt-4 text-sm leading-6 text-slate-600">{company.researchSummary}</p>
              <Link
                href={`/companies/${company.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
              >
                View company hub
              </Link>
            </article>
          ))
        ) : companies.length > 0 ? (
          companies.map((company) => (
            <article
              key={company.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
            >
              <div className="text-sm font-semibold uppercase text-slate-500">
                {company.ticker ?? 'Company'}
                {company.sector ? ` · ${company.sector}` : ''}
              </div>
              <h2 className="mt-2 text-xl font-semibold text-slate-950">
                <Link href={`/companies/${company.slug}`} className="hover:text-emerald-700">
                  {company.name}
                </Link>
              </h2>
              {company.description ? (
                <p className="mt-4 text-sm leading-6 text-slate-600">{company.description}</p>
              ) : null}
              <Link
                href={`/companies/${company.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
              >
                View company hub
              </Link>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm md:col-span-2">
            No company hubs are available yet.
          </div>
        )}
      </div>
    </section>
  )
}
