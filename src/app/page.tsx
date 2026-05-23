import CompanyPreviewGrid from '@/components/home/CompanyPreviewGrid'
import DocumentPreview from '@/components/home/DocumentPreview'
import FeaturedAnalysis from '@/components/home/FeaturedAnalysis'
import HeroSection from '@/components/home/HeroSection'
import ResearchPhilosophy from '@/components/home/ResearchPhilosophy'
import {
  companies,
  getCompanyByTicker,
  getPublishedAnalysisPosts,
  researchDocuments
} from '@/lib/demo-data'

export default function Home() {
  const featuredAnalysis = getPublishedAnalysisPosts()
    .slice(0, 3)
    .map((post) => ({
      post,
      companyName: getCompanyByTicker(post.companyTicker)?.name ?? post.companyTicker
    }))

  return (
    <div>
      <HeroSection />
      <ResearchPhilosophy />
      <FeaturedAnalysis items={featuredAnalysis} />
      <CompanyPreviewGrid companies={companies} />
      <DocumentPreview documents={researchDocuments} />
    </div>
  )
}
