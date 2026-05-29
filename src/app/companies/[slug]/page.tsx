import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  analysisPosts,
  companies as demoCompanies,
  researchDocuments
} from '@/lib/demo-data'
import { getCompanyResearchHub } from '@/lib/reports'
import { isSupabaseConfigured } from '@/lib/supabase/config'

export const dynamic = 'force-dynamic'

interface CompanyDetailPageProps {
  params: {
    slug: string
  }
}

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

export default async function CompanyDetailPage({ params }: CompanyDetailPageProps) {
  const usingDemoFallback = !isSupabaseConfigured()

  if (usingDemoFallback) {
    const company = demoCompanies.find((item) => item.slug === params.slug)

    if (!company) {
      notFound()
    }

    const reports = analysisPosts
      .filter((report) => report.companyTicker === company.ticker && report.status === 'published')
      .sort((first, second) => (second.publishedAt ?? '').localeCompare(first.publishedAt ?? ''))
    const documents = researchDocuments.filter(
      (document) => document.companyTicker === company.ticker && document.isPublic
    )

    return (
      <section>
        <Link
          href="/companies"
          className="text-sm font-semibold text-slate-700 underline underline-offset-4 transition hover:text-emerald-700"
        >
          Back to companies
        </Link>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Demo fallback mode: Supabase is not configured, so this is a sample company hub from the
          local demo dataset.
        </div>

        <header className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase text-slate-500">
            {company.ticker} · {company.exchange}
          </p>
          <h1 className="mt-3 text-3xl font-semibold text-slate-950">{company.name}</h1>
          <p className="mt-2 text-sm text-slate-500">
            {company.sector} · {company.industry}
          </p>
          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
            {company.description}
          </p>
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Published research</h2>
            <div className="mt-5 divide-y divide-slate-200">
              {reports.length > 0 ? (
                reports.map((report) => (
                  <article key={report.id} className="py-4 first:pt-0 last:pb-0">
                    <h3 className="font-semibold text-slate-950">
                      <Link href={`/research/${report.slug}`} className="hover:text-emerald-700">
                        {report.title}
                      </Link>
                    </h3>
                    <div className="mt-1 text-xs font-medium uppercase text-slate-500">
                      {formatDate(report.publishedAt)}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{report.summary}</p>
                  </article>
                ))
              ) : (
                <p className="text-sm text-slate-600">No published research yet.</p>
              )}
            </div>
          </section>

          <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-950">Documents</h2>
            <div className="mt-5 space-y-4">
              {documents.length > 0 ? (
                documents.map((document) => (
                  <div key={document.id} className="text-sm leading-6 text-slate-600">
                    <div className="font-semibold text-slate-900">{document.title}</div>
                    <div>{document.fileName}</div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-slate-600">No public documents yet.</p>
              )}
            </div>
          </aside>
        </div>
      </section>
    )
  }

  const hub = await getCompanyResearchHub(params.slug)

  if (!hub) {
    notFound()
  }

  const publicDocuments = hub.reports.flatMap((report) =>
    report.documents
      .filter((document) => document.public)
      .map((document) => ({
        ...document,
        reportTitle: report.title
      }))
  )

  return (
    <section>
      <Link
        href="/companies"
        className="text-sm font-semibold text-slate-700 underline underline-offset-4 transition hover:text-emerald-700"
      >
        Back to companies
      </Link>

      <header className="mt-8 rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-slate-500">
          {hub.company.ticker ?? 'Company'}
          {hub.company.sector ? ` · ${hub.company.sector}` : ''}
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">{hub.company.name}</h1>
        {hub.company.description ? (
          <p className="mt-5 max-w-3xl text-sm leading-6 text-slate-600">
            {hub.company.description}
          </p>
        ) : null}
      </header>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
        <section className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Published research</h2>
          <div className="mt-5 divide-y divide-slate-200">
            {hub.reports.length > 0 ? (
              hub.reports.map((report) => (
                <article key={report.id} className="py-4 first:pt-0 last:pb-0">
                  <h3 className="font-semibold text-slate-950">
                    <Link href={`/research/${report.slug}`} className="hover:text-emerald-700">
                      {report.title}
                    </Link>
                  </h3>
                  <div className="mt-1 text-xs font-medium uppercase text-slate-500">
                    {formatDate(report.published_at)}
                  </div>
                  {report.excerpt ? (
                    <p className="mt-3 text-sm leading-6 text-slate-600">{report.excerpt}</p>
                  ) : null}
                </article>
              ))
            ) : (
              <p className="text-sm text-slate-600">No published research yet.</p>
            )}
          </div>
        </section>

        <aside className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-semibold text-slate-950">Documents</h2>
          <div className="mt-5 space-y-4">
            {publicDocuments.length > 0 ? (
              publicDocuments.map((document) => (
                <div key={document.id} className="text-sm leading-6 text-slate-600">
                  <div className="font-semibold text-slate-900">
                    {document.title ?? document.filename}
                  </div>
                  <div>{document.reportTitle}</div>
                  <Link
                    href={`/documents/${document.id}/download`}
                    className="mt-2 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
                  >
                    Download
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-sm text-slate-600">No public documents yet.</p>
            )}
          </div>
        </aside>
      </div>
    </section>
  )
}
