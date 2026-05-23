import Link from 'next/link'
import CompanyCard from '@/components/research/CompanyCard'
import type { Company } from '@/types/research'

export default function CompanyPreviewGrid({ companies }: { companies: readonly Company[] }) {
  return (
    <section className="border-t border-slate-200 py-12">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Company watchlist</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">Research hubs in progress</h2>
        </div>
        <Link
          href="/companies"
          className="text-sm font-semibold text-slate-900 underline underline-offset-4 hover:text-slate-600"
        >
          Browse companies
        </Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {companies.map((company) => (
          <CompanyCard key={company.id} company={company} />
        ))}
      </div>
    </section>
  )
}
