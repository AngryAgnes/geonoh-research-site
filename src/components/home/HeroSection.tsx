import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="border-b border-slate-200 pb-12 pt-2">
      <div className="max-w-3xl">
        <p className="text-sm font-semibold uppercase text-slate-500">Independent equity research</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">
          Geon Oh Kim Research
        </h1>
        <p className="mt-5 text-lg leading-8 text-slate-600">
          Long-term company analysis, investment theses, and supporting research documents.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/analysis"
            className="inline-flex items-center justify-center rounded-md bg-slate-950 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Read analysis
          </Link>
          <Link
            href="/companies"
            className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-100"
          >
            View companies
          </Link>
        </div>
      </div>
    </section>
  )
}
