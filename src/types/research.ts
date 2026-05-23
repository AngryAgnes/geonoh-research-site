export type InvestmentView = 'constructive' | 'neutral' | 'cautious'

export type DocumentType =
  | 'annual-report'
  | 'investor-presentation'
  | 'earnings-transcript'
  | 'research-model'
  | 'industry-background'
  | 'filing'

export type TimeHorizon = 'near-term' | 'medium-term' | 'long-term'

export interface Company {
  id: string
  name: string
  ticker: string
  slug: string
  exchange: string
  sector: string
  industry: string
  description: string
  researchSummary: string
  investmentView: InvestmentView
  timeHorizon: TimeHorizon
  isDemo: true
  createdAt: string
  updatedAt: string
}

export interface AnalysisPost {
  id: string
  companyId: string
  companyTicker: string
  slug: string
  title: string
  summary: string
  thesis: string
  investmentView: InvestmentView
  timeHorizon: TimeHorizon
  status: 'draft' | 'published'
  publishedAt: string | null
  updatedAt: string
  tags: readonly string[]
  isDemo: true
}

export interface ResearchDocument {
  id: string
  companyId: string
  companyTicker: string
  title: string
  documentType: DocumentType
  description: string
  fileName: string
  isPublic: boolean
  publishedAt: string
  isDemo: true
}

export interface ThesisUpdate {
  id: string
  companyId: string
  companyTicker: string
  title: string
  summary: string
  investmentView: InvestmentView
  timeHorizon: TimeHorizon
  updateType: 'initiation' | 'quarterly-review' | 'valuation-check' | 'risk-review'
  publishedAt: string
  isDemo: true
}

export interface StockSnapshot {
  id: string
  companyId: string
  companyTicker: string
  companyName: string
  price: number
  currency: 'USD'
  marketCapBillions: number
  peRatio: number
  dividendYieldPercent: number | null
  fiftyTwoWeekHigh: number
  fiftyTwoWeekLow: number
  asOf: string
  source: 'demo'
  isDemo: true
}
