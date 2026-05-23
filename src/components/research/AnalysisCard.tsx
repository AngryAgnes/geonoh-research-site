import Link from 'next/link'
import type { AnalysisPost } from '@/types/research'
import ViewBadge, { formatTimeHorizon } from './ViewBadge'

interface AnalysisCardProps {
  post: AnalysisPost
  companyName: string
}

export default function AnalysisCard({ post, companyName }: AnalysisCardProps) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="text-xs font-semibold uppercase text-slate-500">{post.companyTicker}</div>
          <div className="mt-1 text-sm text-slate-600">{companyName}</div>
        </div>
        <ViewBadge view={post.investmentView} />
      </div>

      <h3 className="mt-5 text-lg font-semibold leading-snug text-slate-950">{post.title}</h3>
      <div className="mt-3 text-xs font-medium uppercase text-slate-500">
        {formatTimeHorizon(post.timeHorizon)}
      </div>
      <p className="mt-4 flex-1 text-sm leading-6 text-slate-600">{post.summary}</p>

      <Link
        href="/analysis"
        className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 transition hover:text-emerald-700"
      >
        View analysis index
      </Link>
    </article>
  )
}
