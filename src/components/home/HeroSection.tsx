import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="pb-14 pt-2">
      <div className="grid gap-8 rounded-lg border border-slate-200 bg-white px-6 py-8 shadow-sm sm:px-8 lg:grid-cols-[1.2fr_0.8fr] lg:px-10 lg:py-10">
        <div>
          <p className="inline-flex rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase text-emerald-800">
            Independent equity research
          </p>
          <h1 className="mt-5 max-w-3xl text-4xl font-semibold text-slate-950 sm:text-5xl">
            Geon Oh Kim Research
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            Long-term company analysis, investment theses, and supporting research documents.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/analysis"
              className="inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-slate-800"
            >
              Read analysis
            </Link>
            <Link
              href="/companies"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
            >
              View companies
            </Link>
          </div>
        </div>

        <div className="rounded-lg border border-slate-200 bg-slate-50 p-5">
          <p className="text-xs font-semibold uppercase text-slate-500">Research lens</p>
          <div className="mt-5 space-y-4">
            {['Quality', 'Cash flow', 'Valuation', 'Risk monitoring'].map((item) => (
              <div key={item} className="flex items-center justify-between border-b border-slate-200 pb-3 last:border-b-0 last:pb-0">
                <span className="text-sm font-medium text-slate-700">{item}</span>
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
