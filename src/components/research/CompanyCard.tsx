import Link from 'next/link'
import type { Company } from '@/types/research'
import ViewBadge from './ViewBadge'

export default function CompanyCard({ company }: { company: Company }) {
  return (
    <article className="rounded-md border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold text-slate-950">{company.name}</h3>
          <div className="mt-1 text-sm text-slate-500">
            {company.ticker} · {company.sector}
          </div>
        </div>
        <ViewBadge view={company.investmentView} />
      </div>

      <p className="mt-4 text-sm leading-6 text-slate-600">{company.researchSummary}</p>

      <Link
        href="/companies"
        className="mt-5 inline-flex text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-600"
      >
        View company hubs
      </Link>
    </article>
  )
}
