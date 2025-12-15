'use client'

import KpiCard from './KpiCard'

export default function ProofPanel() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-offo-navy">
        Proven Results
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <KpiCard
          icon="📄"
          title="White Paper"
          subtitle="Download Now"
          href="#whitepaper"
        />
        <KpiCard
          icon="🚀"
          title="Pilot Interest"
          subtitle="12 Enterprise Teams"
        />
        <KpiCard
          icon="📉"
          title="Demo Results"
          subtitle="Risk Reduction: -34%"
        />
      </div>

      {/* Additional proof points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
        <KpiCard
          icon="✅"
          title="Task Adherence"
          value="96%"
        />
        <KpiCard
          icon="🧠"
          title="Training Completion"
          value="99%"
        />
        <KpiCard
          icon="📋"
          title="Documentation Accuracy"
          value="92%"
        />
      </div>
    </div>
  )
}
