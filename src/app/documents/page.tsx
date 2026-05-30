import Link from 'next/link'
import { getBackendDocuments, type BackendDocumentFailureReason } from '@/lib/backend/documents'
import { getCompanyByTicker, researchDocuments } from '@/lib/demo-data'

export const dynamic = 'force-dynamic'

const formatFallbackReason = (reason: BackendDocumentFailureReason): string => {
  const labels: Record<BackendDocumentFailureReason, string> = {
    'backend-not-configured': 'the backend API URL is not configured',
    'supabase-not-configured': 'the backend API is missing Supabase public read configuration',
    'not-found': 'the backend API did not find a matching document',
    forbidden: 'the backend API blocked access to the document',
    'request-failed': 'the backend API request failed'
  }

  return labels[reason]
}

export default async function DocumentsPage() {
  const documentsResult = await getBackendDocuments()
  const usingDemoFallback = !documentsResult.ok
  const publicDocuments = documentsResult.ok ? documentsResult.data : []

  return (
    <section>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-slate-500">Public library</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Documents</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Public supporting documents attached to published research reports appear here.
        </p>
      </div>

      {usingDemoFallback ? (
        <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm leading-6 text-amber-950">
          Demo fallback mode: {formatFallbackReason(documentsResult.reason)}, so these are sample
          document records from the local demo dataset.
        </div>
      ) : null}

      <div className="mt-8 space-y-4">
        {usingDemoFallback ? (
          researchDocuments.map((document) => {
            const company = getCompanyByTicker(document.companyTicker)

            return (
              <article
                key={document.id}
                className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h2 className="font-semibold text-slate-950">{document.title}</h2>
                    <p className="mt-1 text-sm text-slate-600">
                      {company ? `${company.name} (${company.ticker})` : document.companyTicker}
                      {' · '}
                      {document.fileName}
                    </p>
                  </div>
                  <span className="inline-flex w-fit rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
                    Demo record
                  </span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-600">{document.description}</p>
              </article>
            )
          })
        ) : publicDocuments.length > 0 ? (
          publicDocuments.map((document) => (
            <article
              key={document.id}
              className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h2 className="font-semibold text-slate-950">
                    {document.title ?? document.filename}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600">
                    {document.company
                      ? `${document.company.name}`
                      : 'General research'}
                    {document.report ? ` · ${document.report.title}` : ''}
                  </p>
                </div>
                <Link
                  href={`/documents/${document.id}/download`}
                  className="inline-flex rounded-md bg-slate-950 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
                >
                  Download
                </Link>
              </div>
              {document.description ? (
                <p className="mt-3 text-sm leading-6 text-slate-600">{document.description}</p>
              ) : null}
            </article>
          ))
        ) : (
          <div className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
            No public research documents are available yet.
          </div>
        )}
      </div>
    </section>
  )
}
