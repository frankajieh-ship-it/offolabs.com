import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
import OffoAiHeroWrapper from '@/components/products/offo-ai/OffoAiHeroWrapper'
import OffoAiFeaturesSection from '@/components/products/offo-ai/OffoAiFeaturesSection'
import OffoAiUseCasesSection from '@/components/products/OffoAiUseCasesSection'
import OffoAiTargetUsersSection from '@/components/sections/products/OffoAiTargetUsersSection'

export const metadata: Metadata = {
  title: 'OFFO AI - Applied AI Agents | OFFO Labs',
  description: 'Applied AI agents for business and engineering. Create agents that streamline operations, optimize processes, and advise teams with real-time intelligence.',
  keywords: [
    'AI agents',
    'business automation',
    'engineering AI',
    'operational intelligence',
    'AI copilot',
    'workflow automation',
  ],
  openGraph: {
    title: 'OFFO AI - Applied AI Agents for Business and Engineering',
    description: 'Create agents that streamline operations, optimize processes, and advise teams with real-time intelligence.',
    type: 'website',
    images: [
      {
        url: '/images/offo-ai-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function OffoAiPage() {
  return (
    <MainLayout>
      <ProductPageLayout productName="OFFO AI" productSlug="offo-ai">
        <OffoAiHeroWrapper />
        <OffoAiUseCasesSection />
        <OffoAiTargetUsersSection />
        <OffoAiFeaturesSection />
      </ProductPageLayout>
    </MainLayout>
  )
}
