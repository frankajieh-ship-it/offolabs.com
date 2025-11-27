'use client'

import { BarChart3, Target, Globe } from 'lucide-react'

export default function MarketOpportunitySection() {
  const opportunities = [
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Predictive Maintenance Market',
      size: '$15B+ TAM',
      description:
        'Engine Acoustic AI operates in the rapidly growing predictive maintenance and industrial diagnostics market. Rising costs of equipment downtime drive demand for preventive solutions.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'AI Automation & Operations',
      size: '$50B+ TAM',
      description:
        'OFFO AI addresses the enterprise automation and AI agents market. As businesses automate workflows and seek operational intelligence, demand for applied AI solutions continues to accelerate.',
      color: 'from-green-600 to-green-500',
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Global Expansion',
      size: 'Unlimited Upside',
      description:
        'Both product families serve global markets. Initial focus on domestic markets provides clear runway for international expansion as products mature.',
      color: 'from-purple-600 to-purple-500',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Market Opportunity
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            OFFO Labs operates at the intersection of multiple large and growing markets.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {opportunities.map((opp, index) => (
            <div
              key={index}
              className="group relative rounded-lg border-2 border-gray-200 dark:border-gray-800 bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 p-8 hover:shadow-lg transition-all duration-300"
            >
              <div className="mb-4">
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${opp.color} flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform`}
                >
                  {opp.icon}
                </div>
                <p className={`text-sm font-bold bg-gradient-to-r ${opp.color} bg-clip-text text-transparent`}>
                  {opp.size}
                </p>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {opp.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {opp.description}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-16 p-8 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">
          <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-4">
            Competitive Position
          </h3>
          <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
            OFFO Labs enters these markets with proven technology, operational excellence, and a track record of shipping production-ready products. Unlike many AI companies still in the prototype phase, we have real customers and real traction.
          </p>
          <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
            Our multi-product strategy creates cross-selling opportunities and builds a defensible platform that becomes more valuable as it grows.
          </p>
        </div>
      </div>
    </section>
  )
}
