import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
import CodeCrackHero from '@/components/sections/products/CodeCrackHero'
import GameDescription from '@/components/sections/products/GameDescription'
import FeatureBlocks from '@/components/sections/products/FeatureBlocks'
import ScreenshotsSection from '@/components/sections/products/ScreenshotsSection'
import MonetizationSection from '@/components/sections/products/MonetizationSection'
import StoreCTASection from '@/components/sections/products/StoreCTASection'

export const metadata: Metadata = {
  title: 'CodeCrack - Educational Coding Game | OFFO Labs',
  description: 'Master coding through fun challenges. CodeCrack is an interactive game that teaches programming concepts. Available on iOS, Android, and Web.',
  keywords: ['coding game', 'learn programming', 'educational game', 'coding challenges', 'development'],
  openGraph: {
    title: 'CodeCrack - Learn to Code Through Gaming',
    description: 'Master programming with fun challenges and earn rewards. Join 500K+ developers.',
    type: 'website',
    images: [
      {
        url: '/images/codecrack-og.png',
        width: 1200,
        height: 630,
      }
    ]
  }
}

export default function CodeCrackPage() {
  return (
    <MainLayout>
      <ProductPageLayout productName="CodeCrack" productSlug="codecrack">
        <CodeCrackHero />
        <GameDescription />
        <FeatureBlocks />
        <ScreenshotsSection />
        <MonetizationSection />
        <StoreCTASection />
      </ProductPageLayout>
    </MainLayout>
  )
}
