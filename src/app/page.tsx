import Link from 'next/link'
import CompanyPreviewGrid from '@/components/home/CompanyPreviewGrid'
import DocumentPreview from '@/components/home/DocumentPreview'
import FeaturedAnalysis from '@/components/home/FeaturedAnalysis'
import HeroSection from '@/components/home/HeroSection'
import ResearchPhilosophy from '@/components/home/ResearchPhilosophy'
import {
  companies as demoCompanies,
  getCompanyByTicker,
  getPublishedAnalysisPosts,
  researchDocuments
} from '@/lib/demo-data'
import {
  getBackendCompanies,
  type BackendCompanyFailureReason
} from '@/lib/backend/companies'
import {
  getBackendDocuments,
  type BackendDocumentFailureReason
} from '@/lib/backend/documents'
import {
  getBackendResearchReports,
  type BackendResearchFailureReason
} from '@/lib/backend/research'

export const dynamic = 'force-dynamic'

type HomepageFailureReason =
  | BackendCompanyFailureReason
  | BackendDocumentFailureReason
  | BackendResearchFailureReason

const formatFallbackReason = (reason: HomepageFailureReason): string => {
  const labels: Record<HomepageFailureReason, string> = {
    'backend-not-configured': 'the backend API URL is not configured',
    'supabase-not-configured': 'the backend Supabase public-read configuration is unavailable',
    'not-found': 'one backend homepage data source was not found',
    forbidden: 'one backend homepage data source is not public',
    'request-failed': 'the backend API request failed'
  }

  return labels[reason]
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

export default async function Home() {
  const [researchResult, companiesResult, documentsResult] = await Promise.all([
    getBackendResearchReports(),
    getBackendCompanies(),
    getBackendDocuments()
  ])

  const fallbackReason =
    (!researchResult.ok && researchResult.reason) ||
    (!companiesResult.ok && companiesResult.reason) ||
    (!documentsResult.ok && documentsResult.reason) ||
    null
  const usingDemoFallback = fallbackReason !== null
  const reports = researchResult.ok ? researchResult.data : []
  const companies = companiesResult.ok ? companiesResult.data : []
  const publicDocuments = documentsResult.ok ? documentsResult.data : []
  const featuredAnalysis = getPublishedAnalysisPosts()
    .slice(0, 3)
    .map((post) => ({
      post,
      companyName: getCompanyByTicker(post.companyTicker)?.name ?? post.companyTicker
    }))

  return (
    <div>
      <HeroSection />
      <ResearchPhilosophy />

      {usingDemoFallback ? (
        <>
          <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
            Demo fallback mode: {formatFallbackReason(fallbackReason)}, so the homepage is showing
            sample research, companies, and document records from the local demo dataset.
          </div>
          <FeaturedAnalysis items={featuredAnalysis} />
          <CompanyPreviewGrid companies={demoCompanies} />
          <DocumentPreview documents={researchDocuments} />
        </>
      ) : (
        <>
          <section className="border-t border-slate-200 py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-slate-500">
                  Featured research
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Latest published reports
                </h2>
              </div>
              <Link
                href="/research"
                className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Browse research
              </Link>
            </div>

            <div className="mt-7 grid gap-5 lg:grid-cols-3">
              {reports.length > 0 ? (
                reports.slice(0, 3).map((report) => (
                  <article
                    key={report.id}
                    className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="text-xs font-semibold uppercase text-slate-500">
                      {report.company?.ticker ?? 'Research'}
                    </div>
                    <div className="mt-1 text-sm text-slate-600">
                      {report.company?.name ?? 'General research'}
                    </div>
                    <h3 className="mt-5 text-lg font-semibold leading-snug text-slate-950">
                      {report.title}
                    </h3>
                    <div className="mt-3 text-xs font-medium uppercase text-slate-500">
                      {formatDate(report.published_at)}
                    </div>
                    {report.excerpt ? (
                      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">
                        {report.excerpt}
                      </p>
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
                <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm lg:col-span-3">
                  No published reports are available yet.
                </div>
              )}
            </div>
          </section>

          <section className="border-t border-slate-200 py-14">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-sm font-semibold uppercase text-slate-500">
                  Company watchlist
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-slate-950">
                  Research hubs
                </h2>
              </div>
              <Link
                href="/companies"
                className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
              >
                Browse companies
              </Link>
            </div>

            <div className="mt-7 grid gap-5 md:grid-cols-2">
              {companies.length > 0 ? (
                companies.slice(0, 4).map((company) => (
                  <article
                    key={company.id}
                    className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md"
                  >
                    <div className="text-sm font-semibold uppercase text-slate-500">
                      {company.ticker ?? 'Company'}
                      {company.sector ? ` · ${company.sector}` : ''}
                    </div>
                    <h3 className="mt-2 text-lg font-semibold text-slate-950">
                      {company.name}
                    </h3>
                    {company.description ? (
                      <p className="mt-4 text-sm leading-6 text-slate-600">
                        {company.description}
                      </p>
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

          <section className="border-t border-slate-200 py-14">
            <div className="grid gap-8 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:grid-cols-[1fr_1.2fr]">
              <div>
                <p className="text-sm font-semibold uppercase text-emerald-300">
                  Research library
                </p>
                <h2 className="mt-3 text-2xl font-semibold text-white">Documents</h2>
                <p className="mt-4 text-sm leading-6 text-slate-300">
                  Public supporting documents attached to published research reports.
                </p>
              </div>

              <div className="border-l-0 border-slate-700 lg:border-l lg:pl-8">
                <div>
                  <div className="text-sm font-semibold text-white">
                    {publicDocuments.length} public document records available
                  </div>
                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    Documents are sourced from the backend public document API.
                  </p>
                </div>

                <Link
                  href="/documents"
                  className="mt-5 inline-flex rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-950 shadow-sm transition hover:bg-slate-100"
                >
                  View document library
                </Link>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  )
}
