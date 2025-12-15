'use client'

import { motion } from 'framer-motion'
import AnimatedKpiCard from './AnimatedKpiCard'

export default function AnimatedProofPanel() {
  return (
    <div className="max-w-6xl mx-auto px-6">
      <motion.h2
        className="text-3xl md:text-4xl font-bold text-center mb-12 text-offo-navy"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        Proven Results
      </motion.h2>

      {/* First row - Proof points */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <AnimatedKpiCard
          icon="📄"
          title="White Paper"
          subtitle="Download Now"
          href="#whitepaper"
          delay={0}
        />
        <AnimatedKpiCard
          icon="🚀"
          title="Pilot Interest"
          subtitle="12 Enterprise Teams"
          delay={0.1}
        />
        <AnimatedKpiCard
          icon="📉"
          title="Demo Results"
          subtitle="Risk Reduction: -34%"
          delay={0.2}
        />
      </div>

      {/* Second row - KPI metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <AnimatedKpiCard
          icon="✅"
          title="Task Adherence"
          value="96%"
          delay={0.3}
        />
        <AnimatedKpiCard
          icon="🧠"
          title="Training Completion"
          value="99%"
          delay={0.4}
        />
        <AnimatedKpiCard
          icon="📋"
          title="Documentation Accuracy"
          value="92%"
          delay={0.5}
        />
      </div>
    </div>
  )
}
