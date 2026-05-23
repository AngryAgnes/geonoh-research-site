import Link from 'next/link'
import AnalysisCard from '@/components/research/AnalysisCard'
import type { AnalysisPost } from '@/types/research'

interface FeaturedAnalysisItem {
  post: AnalysisPost
  companyName: string
}

export default function FeaturedAnalysis({ items }: { items: readonly FeaturedAnalysisItem[] }) {
  return (
    <section className="border-t border-slate-200 py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Featured analysis</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Current demo research notes</h2>
        </div>
        <Link
          href="/analysis"
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-600"
        >
          Browse analysis
        </Link>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        {items.map(({ post, companyName }) => (
          <AnalysisCard key={post.id} post={post} companyName={companyName} />
        ))}
      </div>
    </section>
  )
}
