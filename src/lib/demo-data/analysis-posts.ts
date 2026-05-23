import type { AnalysisPost } from '../../types/research'

export const analysisPosts: readonly AnalysisPost[] = [
  {
    id: 'analysis-spgi-data-benchmarks',
    companyId: 'company-spgi',
    companyTicker: 'SPGI',
    slug: 'spgi-data-benchmarks-quality-compounder',
    title: 'S&P Global: Data and Benchmarks as a Quality Compounder',
    summary:
      'Demo analysis of S&P Global focusing on benchmark scale, ratings durability, and recurring data revenue.',
    thesis:
      'S&P Global combines high-retention data products with benchmark and ratings franchises that can support durable earnings growth.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    status: 'published',
    publishedAt: '2026-01-15T00:00:00.000Z',
    updatedAt: '2026-01-15T00:00:00.000Z',
    tags: ['demo-data', 'financial-data', 'quality-compounder'],
    isDemo: true
  },
  {
    id: 'analysis-ma-network-services',
    companyId: 'company-ma',
    companyTicker: 'MA',
    slug: 'mastercard-network-and-services-flywheel',
    title: 'Mastercard: Network and Services Flywheel',
    summary:
      'Demo analysis of Mastercard focusing on payment volume, cross-border mix, and value-added services.',
    thesis:
      'Mastercard benefits from global electronic payments growth while services can deepen customer relationships and diversify revenue.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    status: 'published',
    publishedAt: '2026-01-16T00:00:00.000Z',
    updatedAt: '2026-01-16T00:00:00.000Z',
    tags: ['demo-data', 'payments', 'network-effects'],
    isDemo: true
  },
  {
    id: 'analysis-msci-index-franchise',
    companyId: 'company-msci',
    companyTicker: 'MSCI',
    slug: 'msci-index-franchise-and-asset-sensitivity',
    title: 'MSCI: Index Franchise and Asset Sensitivity',
    summary:
      'Demo analysis of MSCI focusing on index licensing, analytics cross-sell, and market-level sensitivity.',
    thesis:
      'MSCI has a high-quality index franchise, but asset-based fees create sensitivity to market levels and fund flows.',
    investmentView: 'neutral',
    timeHorizon: 'long-term',
    status: 'published',
    publishedAt: '2026-01-17T00:00:00.000Z',
    updatedAt: '2026-01-17T00:00:00.000Z',
    tags: ['demo-data', 'indexes', 'asset-management'],
    isDemo: true
  },
  {
    id: 'analysis-crm-margin-ai',
    companyId: 'company-crm',
    companyTicker: 'CRM',
    slug: 'salesforce-margin-discipline-and-ai-optionality',
    title: 'Salesforce: Margin Discipline and AI Optionality',
    summary:
      'Demo analysis of Salesforce focusing on operating discipline, retention, and data cloud monetization.',
    thesis:
      'Salesforce remains a strategic enterprise software platform, with upside tied to disciplined growth and credible AI monetization.',
    investmentView: 'neutral',
    timeHorizon: 'medium-term',
    status: 'published',
    publishedAt: '2026-01-18T00:00:00.000Z',
    updatedAt: '2026-01-18T00:00:00.000Z',
    tags: ['demo-data', 'enterprise-software', 'ai'],
    isDemo: true
  },
  {
    id: 'analysis-bkng-connected-trip',
    companyId: 'company-bkng',
    companyTicker: 'BKNG',
    slug: 'booking-holdings-connected-trip-economics',
    title: 'Booking Holdings: Connected Trip Economics',
    summary:
      'Demo analysis of Booking Holdings focusing on global lodging scale, direct demand, and connected trip expansion.',
    thesis:
      'Booking Holdings can compound through travel demand growth, strong lodging supply, and better customer attachment across trip categories.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    status: 'published',
    publishedAt: '2026-01-19T00:00:00.000Z',
    updatedAt: '2026-01-19T00:00:00.000Z',
    tags: ['demo-data', 'online-travel', 'marketplace'],
    isDemo: true
  }
]
