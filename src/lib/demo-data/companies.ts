import type { Company } from '../../types/research'

export const companies: readonly Company[] = [
  {
    id: 'company-spgi',
    name: 'S&P Global',
    ticker: 'SPGI',
    slug: 'sp-global',
    exchange: 'NYSE',
    sector: 'Financial Services',
    industry: 'Financial Data and Analytics',
    description:
      'S&P Global provides credit ratings, benchmarks, market intelligence, commodity insights, and mobility data.',
    researchSummary:
      'Demo thesis focus: durable pricing power, subscription revenue, benchmark scale, and long runway for data products.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    isDemo: true,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'company-ma',
    name: 'Mastercard',
    ticker: 'MA',
    slug: 'mastercard',
    exchange: 'NYSE',
    sector: 'Financial Services',
    industry: 'Payments Network',
    description:
      'Mastercard operates a global payments network and provides value-added services across fraud, analytics, and loyalty.',
    researchSummary:
      'Demo thesis focus: secular cash-to-card conversion, cross-border recovery, and expanding services attachment.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    isDemo: true,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'company-msci',
    name: 'MSCI',
    ticker: 'MSCI',
    slug: 'msci',
    exchange: 'NYSE',
    sector: 'Financial Services',
    industry: 'Index and Portfolio Analytics',
    description:
      'MSCI provides indexes, portfolio analytics, risk tools, and ESG and climate data to asset managers and asset owners.',
    researchSummary:
      'Demo thesis focus: index franchise quality, asset-based fee sensitivity, and portfolio analytics cross-sell.',
    investmentView: 'neutral',
    timeHorizon: 'long-term',
    isDemo: true,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'company-crm',
    name: 'Salesforce',
    ticker: 'CRM',
    slug: 'salesforce',
    exchange: 'NYSE',
    sector: 'Technology',
    industry: 'Enterprise Software',
    description:
      'Salesforce provides customer relationship management software, data cloud products, and enterprise workflow tools.',
    researchSummary:
      'Demo thesis focus: margin discipline, durable CRM category leadership, and monetization of data and AI features.',
    investmentView: 'neutral',
    timeHorizon: 'medium-term',
    isDemo: true,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  },
  {
    id: 'company-bkng',
    name: 'Booking Holdings',
    ticker: 'BKNG',
    slug: 'booking-holdings',
    exchange: 'NASDAQ',
    sector: 'Consumer Cyclical',
    industry: 'Online Travel',
    description:
      'Booking Holdings operates online travel brands for lodging, flights, rental cars, restaurant reservations, and connected trip services.',
    researchSummary:
      'Demo thesis focus: global lodging scale, direct traffic advantages, and resilience of travel demand through cycles.',
    investmentView: 'constructive',
    timeHorizon: 'long-term',
    isDemo: true,
    createdAt: '2026-01-10T00:00:00.000Z',
    updatedAt: '2026-01-10T00:00:00.000Z'
  }
]
