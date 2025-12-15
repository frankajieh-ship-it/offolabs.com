'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

const riskInputs = [
  {
    category: 'Training & Compliance',
    sources: ['LMS Completion', 'Certification Status', 'Policy Acknowledgment'],
    weight: '25%',
    color: 'blue'
  },
  {
    category: 'Incident Data',
    sources: ['Safety Incidents', 'Near Miss Reports', 'Quality Defects'],
    weight: '30%',
    color: 'red'
  },
  {
    category: 'Operational Signals',
    sources: ['Throughput Metrics', 'Cycle Times', 'SLA Compliance'],
    weight: '25%',
    color: 'green'
  },
  {
    category: 'Behavioral Patterns',
    sources: ['Process Adherence', 'Checklist Compliance', 'Audit Results'],
    weight: '20%',
    color: 'purple'
  }
]

export default function RiskInputDiagram() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Risk Score Input Architecture
        </h3>
        <p className="text-gray-600">
          How disparate signals synthesize into unified risk intelligence
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
        {riskInputs.map((input, index) => (
          <motion.div
            key={input.category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onMouseEnter={() => setActiveCategory(input.category)}
            onMouseLeave={() => setActiveCategory(null)}
            className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
              activeCategory === input.category
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-900">{input.category}</h4>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                input.color === 'blue' ? 'bg-blue-100 text-blue-800' :
                input.color === 'red' ? 'bg-red-100 text-red-800' :
                input.color === 'green' ? 'bg-green-100 text-green-800' :
                'bg-purple-100 text-purple-800'
              }`}>
                {input.weight}
              </span>
            </div>

            <ul className="space-y-2">
              {input.sources.map((source, i) => (
                <li key={i} className="flex items-center text-sm text-gray-600">
                  <div className={`mr-2 h-2 w-2 rounded-full ${
                    input.color === 'blue' ? 'bg-blue-500' :
                    input.color === 'red' ? 'bg-red-500' :
                    input.color === 'green' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`}></div>
                  {source}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>

      {/* Diagram Visualization */}
      <div className="relative h-64 rounded-xl bg-gray-50 border border-gray-200 p-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="mb-4">
              <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-gradient-to-r from-blue-500 to-purple-500">
                <span className="text-2xl font-bold text-white">OFFO</span>
              </div>
            </div>
            <p className="text-gray-700 font-medium">Unified Risk Score</p>
            <p className="text-sm text-gray-500">Synthesized from all inputs</p>
          </div>

          {/* Connectors */}
          {riskInputs.map((input, index) => {
            const angle = (index / riskInputs.length) * 2 * Math.PI
            const x = Math.cos(angle) * 120
            const y = Math.sin(angle) * 120

            return (
              <motion.div
                key={input.category}
                className="absolute"
                style={{ left: `calc(50% + ${x}px)`, top: `calc(50% + ${y}px)` }}
                animate={{
                  scale: activeCategory === input.category ? 1.2 : 1,
                  opacity: activeCategory && activeCategory !== input.category ? 0.5 : 1
                }}
              >
                <div className={`h-3 w-3 rounded-full ${
                  input.color === 'blue' ? 'bg-blue-500' :
                  input.color === 'red' ? 'bg-red-500' :
                  input.color === 'green' ? 'bg-green-500' :
                  'bg-purple-500'
                }`}></div>
              </motion.div>
            )
          })}
        </div>
      </div>

      <p className="text-center text-gray-500 text-sm mt-6">
        Interactive diagram: Hover over input categories to see connections
      </p>
    </div>
  )
}
