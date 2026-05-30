import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getBackendResearchReport, type BackendResearchFailureReason } from '@/lib/backend/research'
import {
  getAnalysisPostBySlug,
  getCompanyByTicker,
  getDocumentsByCompanyTicker
} from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

interface ResearchDetailPageProps {
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

const formatFallbackReason = (reason: BackendResearchFailureReason): string => {
  const labels: Record<BackendResearchFailureReason, string> = {
    'backend-not-configured': 'the backend API URL is not configured',
    'supabase-not-configured': 'the backend API is missing Supabase public read configuration',
    'not-found': 'the backend API did not find a matching report',
    'request-failed': 'the backend API request failed'
  }

  return labels[reason]
}

export default async function ResearchDetailPage({ params }: ResearchDetailPageProps) {
  const researchResult = await getBackendResearchReport(params.slug)

  if (!researchResult.ok) {
    if (researchResult.reason === 'not-found') {
      notFound()
    }

    const report = getAnalysisPostBySlug(params.slug)

    if (!report || report.status !== 'published') {
      notFound()
    }

    const company = getCompanyByTicker(report.companyTicker)
    const documents = getDocumentsByCompanyTicker(report.companyTicker).filter(
      (document) => document.isPublic
    )

    return (
      <article className="mx-auto max-w-3xl">
        <Link
          href="/research"
          className="text-sm font-semibold text-slate-700 underline underline-offset-4 transition hover:text-emerald-700"
        >
          Back to research
        </Link>

        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Demo fallback mode: {formatFallbackReason(researchResult.reason)}, so this is a sample
          research record from the local demo dataset.
        </div>

        <header className="mt-8 border-b border-slate-200 pb-8">
          <p className="text-sm font-semibold uppercase text-slate-500">Research report</p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">
            {report.title}
          </h1>
          <div className="mt-4 text-sm text-slate-500">
            {company ? (
              <Link href={`/companies/${company.slug}`} className="hover:text-emerald-700">
                {company.name} ({company.ticker})
              </Link>
            ) : (
              report.companyTicker
            )}
            {' · '}
            {formatDate(report.publishedAt)}
          </div>
          <p className="mt-5 text-base leading-7 text-slate-600">{report.summary}</p>
        </header>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-xl font-semibold text-slate-950">Thesis</h2>
            <p className="mt-3 text-sm leading-7 text-slate-700">{report.thesis}</p>
          </section>

          {documents.length > 0 ? (
            <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-lg font-semibold text-slate-950">Demo document records</h2>
              <div className="mt-4 space-y-3">
                {documents.map((document) => (
                  <div key={document.id} className="text-sm leading-6 text-slate-600">
                    <div className="font-semibold text-slate-900">{document.title}</div>
                    <div>{document.fileName}</div>
                  </div>
                ))}
              </div>
            </section>
          ) : null}
        </div>
      </article>
    )
  }

  const report = researchResult.data
  const publicDocuments = report.documents.filter((document) => document.public)

  return (
    <article className="mx-auto max-w-3xl">
      <Link
        href="/research"
        className="text-sm font-semibold text-slate-700 underline underline-offset-4 transition hover:text-emerald-700"
      >
        Back to research
      </Link>

      <header className="mt-8 border-b border-slate-200 pb-8">
        <p className="text-sm font-semibold uppercase text-slate-500">Research report</p>
        <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950">
          {report.title}
        </h1>
        <div className="mt-4 text-sm text-slate-500">
          {report.company ? (
            <Link href={`/companies/${report.company.slug}`} className="hover:text-emerald-700">
              {report.company.name}
              {report.company.ticker ? ` (${report.company.ticker})` : ''}
            </Link>
          ) : (
            'General research'
          )}
          {' · '}
          {formatDate(report.published_at)}
        </div>
        {report.excerpt ? (
          <p className="mt-5 text-base leading-7 text-slate-600">{report.excerpt}</p>
        ) : null}
      </header>

      <div className="mt-8 whitespace-pre-wrap text-sm leading-7 text-slate-700">
        {report.content}
      </div>

      {publicDocuments.length > 0 ? (
        <section className="mt-8 rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-950">Supporting documents</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {publicDocuments.map((document) => (
              <Link
                key={document.id}
                href={`/documents/${document.id}/download`}
                className="inline-flex rounded-md border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:bg-slate-50"
              >
                Download {document.title ?? document.filename}
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  )
}
