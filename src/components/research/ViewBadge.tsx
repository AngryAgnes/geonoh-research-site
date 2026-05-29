import type { InvestmentView, TimeHorizon } from '@/types/research'

const viewLabels: Record<InvestmentView, string> = {
  constructive: 'Constructive',
  neutral: 'Neutral',
  cautious: 'Cautious'
}

const viewStyles: Record<InvestmentView, string> = {
  constructive: 'border-emerald-200 bg-emerald-50 text-emerald-800',
  neutral: 'border-slate-200 bg-slate-100 text-slate-700',
  cautious: 'border-amber-200 bg-amber-50 text-amber-800'
}

const timeHorizonLabels: Record<TimeHorizon, string> = {
  'near-term': 'Near term',
  'medium-term': 'Medium term',
  'long-term': 'Long term'
}

export const formatInvestmentView = (view: InvestmentView): string => viewLabels[view]

export const formatTimeHorizon = (timeHorizon: TimeHorizon): string =>
  timeHorizonLabels[timeHorizon]

export default function ViewBadge({ view }: { view: InvestmentView }) {
  return (
    <span
      className={`inline-flex shrink-0 items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${viewStyles[view]}`}
    >
      {formatInvestmentView(view)}
    </span>
  )
}
