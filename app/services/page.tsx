import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import { HeroSection } from '@/components/sections/services/HeroSection'
import ServiceIntroSection from '@/components/sections/services/ServiceIntroSection'
import ServiceModules from '@/components/sections/services/ServiceModules'
import CaseStudiesSection from '@/components/sections/services/CaseStudiesSection'
import ServiceIntakeCTA from '@/components/sections/services/ServiceIntakeCTA'
import FinalCTASection from '@/components/sections/services/FinalCTASection'

export const metadata: Metadata = {
  title: 'Services - AI Product Development & Consultation | OFFO Labs',
  description:
    'OFFO Labs offers AI-accelerated product development, AI strategy consultation, and full-cycle project execution. Turn your ideas into production-ready products faster.',
  keywords: [
    'AI development',
    'product development',
    'AI consultation',
    'MVP development',
    'AI strategy',
    'full-stack development',
  ],
  openGraph: {
    title: 'Services - AI-Powered Product Development | OFFO Labs',
    description:
      'Build production-ready applications in weeks, not months. AI-accelerated development, consultation, and full-cycle execution.',
    type: 'website',
    images: [
      {
        url: '/images/services-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function ServicesPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <HeroSection />

        {/* Service Intro Section */}
        <ServiceIntroSection />

        {/* Service Modules Section */}
        <ServiceModules />

        {/* Case Studies Section */}
        <CaseStudiesSection />

        {/* Services Intake CTA Section */}
        <ServiceIntakeCTA id="intake" />

        {/* Final CTA Section */}
        <FinalCTASection />
      </div>
    </MainLayout>
  )
}