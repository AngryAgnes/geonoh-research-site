import type {
  AnalysisPost,
  Company,
  ResearchDocument,
  StockSnapshot,
  ThesisUpdate
} from '../../types/research'
import { analysisPosts } from './analysis-posts'
import { companies } from './companies'
import { researchDocuments } from './documents'
import { stockSnapshots } from './stock-snapshots'
import { thesisUpdates } from './thesis-updates'

const normalizeTicker = (ticker: string): string => ticker.trim().toUpperCase()

const sortByPublishedAtDesc = <T extends { publishedAt: string | null }>(items: readonly T[]): T[] =>
  [...items].sort((first, second) => {
    const firstPublishedAt = first.publishedAt ?? ''
    const secondPublishedAt = second.publishedAt ?? ''

    return secondPublishedAt.localeCompare(firstPublishedAt)
  })

export { analysisPosts, companies, researchDocuments, stockSnapshots, thesisUpdates }

export const getCompanyByTicker = (ticker: string): Company | undefined => {
  const normalizedTicker = normalizeTicker(ticker)

  return companies.find((company) => company.ticker === normalizedTicker)
}

export const getPublishedAnalysisPosts = (): AnalysisPost[] =>
  sortByPublishedAtDesc(analysisPosts.filter((post) => post.status === 'published'))

export const getAnalysisPostBySlug = (slug: string): AnalysisPost | undefined =>
  analysisPosts.find((post) => post.slug === slug)

export const getDocumentsByCompanyTicker = (ticker: string): ResearchDocument[] => {
  const normalizedTicker = normalizeTicker(ticker)

  return researchDocuments.filter((document) => document.companyTicker === normalizedTicker)
}

export const getThesisUpdatesByCompanyTicker = (ticker: string): ThesisUpdate[] => {
  const normalizedTicker = normalizeTicker(ticker)

  return sortByPublishedAtDesc(
    thesisUpdates.filter((update) => update.companyTicker === normalizedTicker)
  )
}

export const getStockSnapshotByTicker = (ticker: string): StockSnapshot | undefined => {
  const normalizedTicker = normalizeTicker(ticker)

  return stockSnapshots.find((snapshot) => snapshot.companyTicker === normalizedTicker)
}
