import Link from 'next/link'
import { getCompanyByTicker, getPublishedAnalysisPosts } from '@/lib/demo-data'
import { getPublishedReports } from '@/lib/reports'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

const formatDate = (value: string | null): string => {
  if (!value) {
    return 'Unpublished'
  }

  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  }).format(new Date(value))
}

export default async function ResearchPage() {
  const usingDemoFallback = !isSupabaseConfigured()
  const reports = usingDemoFallback ? [] : await getPublishedReports()
  const demoReports = usingDemoFallback ? getPublishedAnalysisPosts() : []

  return (
    <section>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-slate-500">Published research</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Research</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Company analysis, investment write-ups, and supporting research notes.
        </p>
      </div>

      {usingDemoFallback ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Demo fallback mode: Supabase is not configured, so these are sample research records from
          the local demo dataset.
        </div>
      ) : null}

      <div className="mt-8 space-y-5">
        {usingDemoFallback ? (
          demoReports.map((report) => {
            const company = getCompanyByTicker(report.companyTicker)

            return (
              <article
                key={report.id}
                className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-slate-950">
                      <Link href={`/research/${report.slug}`} className="hover:text-emerald-700">
                        {report.title}
                      </Link>
                    </h2>
                    <p className="mt-1 text-sm text-slate-500">
                      {company
                        ? `${company.name} (${company.ticker})`
                        : `Demo company ${report.companyTicker}`}
                    </p>
                  </div>
                  <div className="text-sm font-medium text-slate-500">
                    {formatDate(report.publishedAt)}
                  </div>
                </div>

                <p className="mt-4 text-sm leading-6 text-slate-600">{report.summary}</p>

                <Link
                  href={`/research/${report.slug}`}
                  className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
                >
                  Read report
                </Link>
              </article>
            )
          })
        ) : reports.length > 0 ? (
          reports.map((report) => (
            <article
              key={report.id}
              className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-950">
                    <Link href={`/research/${report.slug}`} className="hover:text-emerald-700">
                      {report.title}
                    </Link>
                  </h2>
                  <p className="mt-1 text-sm text-slate-500">
                    {report.company
                      ? `${report.company.name}${report.company.ticker ? ` (${report.company.ticker})` : ''}`
                      : 'General research'}
                  </p>
                </div>
                <div className="text-sm font-medium text-slate-500">
                  {formatDate(report.published_at)}
                </div>
              </div>

              {report.excerpt ? (
                <p className="mt-4 text-sm leading-6 text-slate-600">{report.excerpt}</p>
              ) : null}

              <Link
                href={`/research/${report.slug}`}
                className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
              >
                Read report
              </Link>
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No published reports are available yet.
          </div>
        )}
      </div>
    </section>
  )
}
