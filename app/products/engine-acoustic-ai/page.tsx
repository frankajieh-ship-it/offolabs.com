import { Metadata } from 'next'
import { Wrench, Truck, Zap, Power } from 'lucide-react'
import MainLayout from '@/components/layouts/MainLayout'
import ProductPageLayout from '@/components/layouts/ProductPageLayout'
import EngineAcousticAiHeroWrapper from '@/components/products/EngineAcousticAiHeroWrapper'
import UseCasesGrid from '@/components/sections/products/UseCasesGrid'
import EngineHealthDiagnostics from '@/components/sections/products/EngineHealthDiagnostics'
import EngineAcousticAIFeatures from '@/components/sections/products/EngineAcousticAIFeatures'
import DatasetsAndCapabilities from '@/components/sections/products/DatasetsAndCapabilities'
import HowItWorksAcoustic from '@/components/sections/products/HowItWorksAcoustic'
import AcousticDatabaseHighlight from '@/components/products/AcousticDatabaseHighlight'
import AccuracyMetrics from '@/components/products/AccuracyMetrics'
import DiagnosticComparison from '@/components/products/DiagnosticComparison'
import UseCasesSection from '@/components/products/UseCasesSection'
import WorldsLargestDatasetBanner from '@/components/products/WorldsLargestDatasetBanner'

export const metadata: Metadata = {
  title: 'Engine Acoustic AI - Preventive Diagnostics | OFFO Labs',
  description: 'Preventive diagnostics for rotating systems. Powered by the world\'s largest non-OEM acoustic dataset for vehicles and generator sets.',
  keywords: ['predictive maintenance', 'acoustic diagnostics', 'engine diagnostics', 'IoT', 'industrial', 'generator sets'],
  openGraph: {
    title: 'Engine Acoustic AI - Preventive Diagnostics',
    description: 'Acoustic-powered diagnostics for rotating systems using advanced AI.',
    type: 'website',
    images: [
      {
        url: '/images/engine-acoustic-ai-og.png',
        width: 1200,
        height: 630,
      }
    ]
  }
}

export default function EngineAcousticAiPage() {
  const useCases = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Automotive Workshops',
      description: 'Rapid pre-inspection tool for mechanics to diagnose belt slip, pulley misalignment, bearing wear, and tension issues.',
      benefits: [
        'Diagnose 5+ critical issues in < 2 minutes',
        'Reduce diagnostic time by 60%',
        'Improve first-time repair accuracy',
        'Build customer trust with data-backed diagnostics',
      ],
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fleet Maintenance',
      description: 'Continuous monitoring for delivery fleets, buses, trucks, and construction vehicles to identify issues before component failure.',
      benefits: [
        'Prevent 40-60% of unplanned breakdowns',
        'Reduce fleet downtime by 50%',
        'Optimize maintenance schedules',
        'Track health of 100+ vehicles in real-time',
      ],
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Industrial Rotating Equipment',
      description: 'Monitor rotors, compressors, pumps, HVAC blowers, manufacturing line rollers, and other critical equipment.',
      benefits: [
        'Detect wear, wobble, and imbalance early',
        'Increase equipment lifespan by 30%',
        'Eliminate catastrophic failures',
        'Optimize maintenance ROI',
      ],
      color: 'from-orange-600 to-orange-500',
    },
    {
      icon: <Power className="w-8 h-8" />,
      title: 'Generator Sets',
      description: 'Acoustic-based health checks for diesel and petrol gensets across home, industrial, telecom, and hospital applications.',
      benefits: [
        'Detect abnormal harmonics and belt noise',
        'Identify bearing wear and load anomalies',
        'Ensure 99.99% power availability',
        'Prevent unplanned downtime in critical facilities',
      ],
      color: 'from-red-600 to-red-500',
    },
  ]

  return (
    <MainLayout>
      <ProductPageLayout productName="Engine Acoustic AI" productSlug="engine-acoustic-ai">
        <EngineAcousticAiHeroWrapper />
        <WorldsLargestDatasetBanner />
        <AcousticDatabaseHighlight />
        <AccuracyMetrics />
        <DatasetsAndCapabilities />
        <HowItWorksAcoustic />
        <EngineAcousticAIFeatures />
        <UseCasesSection />
        <UseCasesGrid
          product="engine-acoustic-ai"
          useCases={useCases}
          analyticsEventName="engine_ai_usecases_viewed"
        />
        <DiagnosticComparison />
        <EngineHealthDiagnostics product="engine-acoustic-ai" />
      </ProductPageLayout>
    </MainLayout>
  )
}