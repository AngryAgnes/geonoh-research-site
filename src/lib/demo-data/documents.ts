import type { ResearchDocument } from '../../types/research'

export const researchDocuments: readonly ResearchDocument[] = [
  {
    id: 'document-spgi-investor-day-notes',
    companyId: 'company-spgi',
    companyTicker: 'SPGI',
    title: 'S&P Global Investor Day Notes',
    documentType: 'investor-presentation',
    description: 'Demo document record for investor day notes and data segment questions.',
    fileName: 'demo-spgi-investor-day-notes.pdf',
    isPublic: true,
    publishedAt: '2026-01-20T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'document-ma-cross-border-review',
    companyId: 'company-ma',
    companyTicker: 'MA',
    title: 'Mastercard Cross-Border Revenue Review',
    documentType: 'research-model',
    description: 'Demo document record for tracking cross-border volume assumptions.',
    fileName: 'demo-ma-cross-border-review.xlsx',
    isPublic: true,
    publishedAt: '2026-01-20T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'document-msci-index-fee-background',
    companyId: 'company-msci',
    companyTicker: 'MSCI',
    title: 'MSCI Index Fee Background',
    documentType: 'industry-background',
    description: 'Demo document record for index licensing and asset-based fee notes.',
    fileName: 'demo-msci-index-fee-background.pdf',
    isPublic: true,
    publishedAt: '2026-01-21T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'document-crm-earnings-transcript-notes',
    companyId: 'company-crm',
    companyTicker: 'CRM',
    title: 'Salesforce Earnings Transcript Notes',
    documentType: 'earnings-transcript',
    description: 'Demo document record for retention, margin, and AI product commentary.',
    fileName: 'demo-crm-earnings-transcript-notes.pdf',
    isPublic: true,
    publishedAt: '2026-01-21T00:00:00.000Z',
    isDemo: true
  },
  {
    id: 'document-bkng-travel-demand-model',
    companyId: 'company-bkng',
    companyTicker: 'BKNG',
    title: 'Booking Holdings Travel Demand Model',
    documentType: 'research-model',
    description: 'Demo document record for lodging demand and take-rate scenario work.',
    fileName: 'demo-bkng-travel-demand-model.xlsx',
    isPublic: true,
    publishedAt: '2026-01-22T00:00:00.000Z',
    isDemo: true
  }
]
