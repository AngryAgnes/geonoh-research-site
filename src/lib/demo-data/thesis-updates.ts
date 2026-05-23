import type { ThesisUpdate } from '../../types/research'

export const thesisUpdates: readonly ThesisUpdate[] = [
  {
    id: 'thesis-spgi-initiation',
    companyId: 'company-spgi',
    companyTicker: 'SPGI',
    title: 'Demo initiation: data durability remains the core question',
    summary:
      'Initial demo view emphasizes recurring data revenue, benchmark scale, and ratings cycle normalization.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    updateType: 'initiation',
    publishedAt: '2026-01-15T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'thesis-ma-quarterly-review',
    companyId: 'company-ma',
    companyTicker: 'MA',
    title: 'Demo review: services mix supports resilience',
    summary:
      'Quarterly demo note keeps the long-term view constructive while watching cross-border volume and incentives.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    updateType: 'quarterly-review',
    publishedAt: '2026-01-16T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'thesis-msci-valuation-check',
    companyId: 'company-msci',
    companyTicker: 'MSCI',
    title: 'Demo valuation check: franchise quality balanced by market beta',
    summary:
      'Demo view remains neutral due to premium quality offset by market-level and asset-flow sensitivity.',
    investmentView: 'neutral',
    timeHorizon: 'long-term',
    updateType: 'valuation-check',
    publishedAt: '2026-01-17T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'thesis-crm-risk-review',
    companyId: 'company-crm',
    companyTicker: 'CRM',
    title: 'Demo risk review: execution matters for AI monetization',
    summary:
      'Demo note tracks whether AI and data products can improve growth without weakening margin discipline.',
    investmentView: 'neutral',
    timeHorizon: 'medium-term',
    updateType: 'risk-review',
    publishedAt: '2026-01-18T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'thesis-bkng-quarterly-review',
    companyId: 'company-bkng',
    companyTicker: 'BKNG',
    title: 'Demo review: lodging scale remains the anchor',
    summary:
      'Demo view stays constructive while monitoring travel demand, marketing efficiency, and connected trip attachment.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    updateType: 'quarterly-review',
    publishedAt: '2026-01-19T00:00:00.000Z',
    isDemo: true
  }
]
