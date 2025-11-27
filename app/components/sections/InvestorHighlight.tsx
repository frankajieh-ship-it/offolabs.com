import Link from 'next/link'
import { Briefcase, ArrowRight, TrendingUp, Users, Target, Zap } from 'lucide-react'
import { INVESTOR_INFO } from '@/lib/constants'

export default function InvestorHighlight() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-gray-900 via-primary-900/30 to-gray-900 dark:from-gray-950 dark:via-primary-950/30 dark:to-gray-950">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Main Card */}
          <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-8 sm:p-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 border border-primary-300 dark:border-primary-700 mb-8">
            <Briefcase className="w-4 h-4 text-primary-600 dark:text-primary-400" />
            <span className="text-sm font-medium text-primary-700 dark:text-primary-300">
              Investment Opportunity
            </span>
          </div>

          {/* Seed Round Status */}
          <div className="space-y-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-2">
                Seed Round Status
              </h3>
              <p className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                {INVESTOR_INFO.seedRound}
              </p>
            </div>

            {/* Summary */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
                {INVESTOR_INFO.summary}
              </p>
            </div>

            {/* Key Points */}
            <div className="space-y-3">
              {[
                'AI-powered products across entertainment, design, industrial & enterprise',
                'Experienced founding team with successful track record',
                'Multi-billion dollar TAM with proven product-market fit',
                'Clear path to profitability and scalable business model'
              ].map((point, i) => (
                <div key={i} className="flex items-start space-x-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 mt-2 flex-shrink-0" />
                  <p className="text-gray-700 dark:text-gray-300">
                    {point}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="pt-6 border-t border-gray-200 dark:border-gray-700">
              <Link href={INVESTOR_INFO.ctaHref}>
                <button className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors group">
                  <span>{INVESTOR_INFO.ctaText}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </div>
          </div>
          </div>

          {/* Right Column - Investment Stats & Highlights */}
          <div className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Round Size
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      TBD
                    </p>
                  </div>
                  <TrendingUp className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Target Close
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Q1 2026
                    </p>
                  </div>
                  <Briefcase className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Products
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      4 Domains
                    </p>
                  </div>
                  <Zap className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-1">
                      Team
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      Proven
                    </p>
                  </div>
                  <Users className="w-5 h-5 text-primary-600 dark:text-primary-400" />
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-900/20 dark:to-primary-900/10 border border-primary-200 dark:border-primary-700/50 rounded-lg p-6">
              <div className="flex items-start space-x-3">
                <Target className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Why Invest in OFFO Labs
                  </h3>
                  <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">✓</span>
                      <span>Multi-product AI ecosystem with proven traction</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">✓</span>
                      <span>Experienced team with track record of exits</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <span className="text-primary-600 dark:text-primary-400 font-bold">✓</span>
                      <span>Clear path to profitability and scale</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}