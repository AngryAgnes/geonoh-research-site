import Link from 'next/link'
import AnalysisCard from '@/components/research/AnalysisCard'
import type { AnalysisPost } from '@/types/research'

interface FeaturedAnalysisItem {
  post: AnalysisPost
  companyName: string
}

export default function FeaturedAnalysis({ items }: { items: readonly FeaturedAnalysisItem[] }) {
  return (
    <section className="border-t border-slate-200 py-14">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Featured analysis</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Current demo research notes</h2>
        </div>
        <Link
          href="/analysis"
          className="inline-flex rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm transition hover:border-slate-400 hover:bg-slate-50"
        >
          Browse analysis
        </Link>
      </div>

      <div className="mt-7 grid gap-5 lg:grid-cols-3">
        {items.map(({ post, companyName }) => (
          <AnalysisCard key={post.id} post={post} companyName={companyName} />
        ))}
      </div>
    </section>
  )
}
