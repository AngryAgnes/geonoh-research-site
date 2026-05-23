const principles = [
  {
    label: 'Business quality',
    description: 'Preference for durable demand, clear unit economics, and management teams that allocate capital well.'
  },
  {
    label: 'Recurring revenue',
    description: 'Attention to subscription, network, repeat-purchase, and usage patterns that support resilient growth.'
  },
  {
    label: 'Free cash flow and ROIC',
    description: 'Emphasis on cash conversion, reinvestment opportunity, and returns on incremental capital.'
  },
  {
    label: 'Competitive positioning',
    description: 'Assessment of switching costs, scale advantages, brand strength, data assets, and distribution reach.'
  },
  {
    label: 'Valuation discipline',
    description: 'A quality business still needs an underwriting case that leaves room for risk and opportunity cost.'
  },
  {
    label: 'Thesis risk monitoring',
    description: 'Ongoing review of evidence that could weaken, strengthen, or invalidate the investment thesis.'
  }
]

export default function ResearchPhilosophy() {
  return (
    <section className="py-12">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase text-slate-500">Research philosophy</p>
          <h2 className="mt-3 text-2xl font-semibold text-slate-950">
            A structured lens for long-term ownership.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {principles.map((principle) => (
            <div key={principle.label} className="border-t border-slate-200 pt-4">
              <h3 className="text-sm font-semibold text-slate-950">{principle.label}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{principle.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
