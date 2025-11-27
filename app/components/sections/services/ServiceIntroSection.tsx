'use client'

import { ChevronRight } from 'lucide-react'

export default function ServiceIntroSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          {/* Section Header */}
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What OFFO Labs Offers
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-6">
              OFFO Labs isn't just building its own products — we help clients build theirs.
            </p>
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Main Copy */}
            <div className="space-y-6">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                Using the same internal AI-orchestrated development pipeline powering CodeCrack, Renov.AI, Engine Acoustic AI, and the OFFO AI ecosystem, we deliver real-world, production-ready applications at record speed.
              </p>
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900 dark:text-white">
                  Our pipeline delivers:
                </p>
                <ul className="space-y-2">
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Idea through production in weeks, not months</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">AI-first architecture from day one</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Production-ready code and systems</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">End-to-end ownership and delivery</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Pipeline Diagram */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 p-8 rounded-lg border border-gray-200 dark:border-gray-700">
              <div className="space-y-4">
                <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
                  Development Pipeline
                </p>
                <div className="flex flex-wrap items-center gap-2 lg:gap-1">
                  {[
                    { label: 'Idea', color: 'from-blue-500 to-blue-400' },
                    { label: 'Multi-Agent Pipeline', color: 'from-purple-500 to-purple-400' },
                    { label: 'Prototype', color: 'from-indigo-500 to-indigo-400' },
                    { label: 'MVP', color: 'from-green-500 to-green-400' },
                    { label: 'Production', color: 'from-emerald-500 to-emerald-400' },
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`bg-gradient-to-r ${stage.color} text-white px-3 py-2 rounded font-semibold text-xs sm:text-sm whitespace-nowrap`}>
                        {stage.label}
                      </div>
                      {index < 4 && (
                        <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-500 flex-shrink-0 hidden sm:block" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}