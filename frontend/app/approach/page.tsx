import PageHeader from '@/components/shared/PageHeader'
import ContentIntro from '@/components/approach/ContentIntro'
import MethodologyGrid from '@/components/approach/MethodologyGrid'
import RiskInputDiagram from '@/components/approach/RiskInputDiagram'
import ResearchSection from '@/components/approach/ResearchSection'
import SectionSeparator from '@/components/shared/SectionSeparator'
import CTASection from '@/components/shared/CTASection'

export const metadata = {
  title: 'How OFFO Works | Enterprise Risk Intelligence Methodology',
  description: 'OFFO synthesizes behavioral and operational signals into a unified risk score using research-backed methodology.',
}

export default function ApproachPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <PageHeader
        title="How OFFO Works"
        subtitle="Enterprise-grade risk intelligence methodology"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Approach' }]}
      />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Section 1: Content Intro */}
        <section className="mb-16">
          <ContentIntro />
          <SectionSeparator />
        </section>

        {/* Section 2: OFFO Methodology */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
            Core Methodology Pillars
          </h2>
          <MethodologyGrid />
          <SectionSeparator />
        </section>

        {/* Section 3: Risk Input Diagram */}
        <section className="mb-16">
          <RiskInputDiagram />
          <SectionSeparator />
        </section>

        {/* Section 4: Research & Validation */}
        <section className="mb-16">
          <ResearchSection />
        </section>

        {/* CTA Section */}
        <CTASection
          title="Ready to apply our methodology?"
          description="Join our Phase 1 pilot to implement OFFO's risk intelligence system."
          primaryAction={{
            label: 'Request Pilot Access',
            href: '/pilot',
          }}
          secondaryAction={{
            label: 'Read Technical Paper',
            href: '/insights/offorisk-whitepaper',
          }}
        />
      </main>
    </div>
  )
}
