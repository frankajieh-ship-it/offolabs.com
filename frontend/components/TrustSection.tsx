'use client'

import TrustBlock from './TrustBlock'

export default function TrustSection() {
  return (
    <section id="trust" className="bg-gray-50 py-20">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-offo-navy">
          Trusted by Forward-Thinking Organizations
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          <TrustBlock
            icon="🧪"
            title="OFFO Labs"
            subtitle="Explore our white paper on behavioral risk intelligence"
            href="/insights/offorisk-whitepaper"
          />

          <TrustBlock
            icon="✅"
            title="Pilot Program Interest"
            subtitle="12 enterprise teams participating in early access"
          />

          <TrustBlock
            icon="💼"
            title="Backed by Advisors"
            subtitle="Industry experts guiding our product roadmap"
          />

          <TrustBlock
            icon="🔒"
            title="Enterprise"
            subtitle="Security and compliance built into our architecture"
            badges={['SOC 2 Planned', 'GDPR Aligned']}
          />
        </div>
      </div>
    </section>
  )
}
