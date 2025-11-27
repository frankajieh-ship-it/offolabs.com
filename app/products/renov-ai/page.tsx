import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
import RenovAiHero from '@/components/sections/products/RenovAiHero'
import BeforeAfterGallery from '@/components/sections/products/BeforeAfterGallery'
import HowItWorks from '@/components/sections/products/HowItWorks'
import FeaturesSection from '@/components/sections/products/FeaturesSection'
import TargetUsersSection from '@/components/sections/products/TargetUsersSection'

export const metadata: Metadata = {
  title: 'Renov.AI - AI-Powered Interior Design | OFFO Labs',
  description: 'Transform your space with AI-powered interior design. Get professional design suggestions powered by advanced AI technology. Visualize renovations before you build.',
  keywords: ['interior design', 'AI design', 'home renovation', 'design tool', 'architecture'],
  openGraph: {
    title: 'Renov.AI - Transform Your Space with AI',
    description: 'Professional interior design powered by artificial intelligence.',
    type: 'website',
    images: [
      {
        url: '/images/renov-ai-og.png',
        width: 1200,
        height: 630,
      }
    ]
  }
}

export default function RenovAiPage() {
  return (
    <MainLayout>
      <ProductPageLayout productName="Renov.AI" productSlug="renov-ai">
        <RenovAiHero />
        <BeforeAfterGallery />
        <HowItWorks />
        <FeaturesSection />
        <TargetUsersSection />
      </ProductPageLayout>
    </MainLayout>
  )
}
