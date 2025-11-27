import MainLayout from '@/components/layouts/MainLayout'
import HeroSection from '@/components/sections/HeroSection'
import EcosystemGrid from '@/components/sections/EcosystemGrid'
import FoundersStoryPreview from '@/components/sections/FoundersStoryPreview'
import WhyOffoSection from '@/components/sections/WhyOffoSection'
import NewsletterSection from '@/components/sections/NewsletterSection'
import InvestorHighlight from '@/components/sections/InvestorHighlight'

export default function Home() {
  return (
    <MainLayout>
      <HeroSection />
      <EcosystemGrid />
      <WhyOffoSection />
      <FoundersStoryPreview />
      <InvestorHighlight />
      <NewsletterSection />
    </MainLayout>
  )
}