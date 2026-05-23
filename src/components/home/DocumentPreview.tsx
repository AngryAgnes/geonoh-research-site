import Link from 'next/link'
import type { ResearchDocument } from '@/types/research'

const documentTypeLabels: Record<ResearchDocument['documentType'], string> = {
  'annual-report': 'Annual reports',
  'investor-presentation': 'Investor presentations',
  'earnings-transcript': 'Earnings transcripts',
  'research-model': 'Research models',
  'industry-background': 'Industry background',
  filing: 'Filings'
}

const getDocumentTypeSummary = (documents: readonly ResearchDocument[]): string[] =>
  Array.from(new Set(documents.map((document) => documentTypeLabels[document.documentType])))

export default function DocumentPreview({ documents }: { documents: readonly ResearchDocument[] }) {
  const documentTypes = getDocumentTypeSummary(documents)

  return (
    <section className="border-t border-slate-200 py-14">
      <div className="grid gap-8 rounded-lg border border-slate-200 bg-slate-950 p-6 text-white shadow-sm sm:p-8 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-emerald-300">Research library</p>
          <h2 className="mt-3 text-2xl font-semibold text-white">Document preview</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            Public research documents will be available in the document library.
          </p>
        </div>

        <div className="border-l-0 border-slate-700 lg:border-l lg:pl-8">
          <div>
            <div className="text-sm font-semibold text-white">
              {documents.length} demo document records prepared
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-300">
              The current demo set includes {documentTypes.join(', ').toLowerCase()} for future
              document-library work.
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
  )
}
