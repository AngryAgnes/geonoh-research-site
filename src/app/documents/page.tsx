import Link from 'next/link'
import { getPublishedReports } from '@/lib/reports'

export const dynamic = 'force-dynamic'

export default async function DocumentsPage() {
  const reports = await getPublishedReports()
  const publicDocuments = reports.flatMap((report) =>
    report.documents
      .filter((document) => document.public)
      .map((document) => ({
        ...document,
        reportTitle: report.title,
        company: report.company
      }))
  )

  return (
    <section>
      <div className="rounded-lg border border-slate-200 bg-white p-6 shadow-sm">
        <p className="text-sm font-semibold uppercase text-slate-500">Public library</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-950">Documents</h1>
        <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600">
          Public supporting documents attached to published research reports appear here.
        </p>
      </div>

      <div className="mt-8 space-y-4">
        {publicDocuments.length > 0 ? (
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
                      ? `${document.company.name}${document.company.ticker ? ` (${document.company.ticker})` : ''}`
                      : 'General research'}
                    {' · '}
                    {document.reportTitle}
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
