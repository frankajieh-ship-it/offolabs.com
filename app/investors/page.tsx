import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import InvestmentThesisSection from '@/components/sections/investors/InvestmentThesisSection'
import MarketOpportunitySection from '@/components/sections/investors/MarketOpportunitySection'

export const metadata: Metadata = {
  title: 'For Investors - OFFO Labs | Investment Opportunity',
  description: 'Explore the OFFO Labs investment thesis, market opportunity, and growth potential. Multi-product AI platform serving diverse industries.',
  keywords: ['OFFO Labs', 'investors', 'investment', 'startup funding', 'AI market', 'market opportunity'],
  openGraph: {
    title: 'OFFO Labs - Investment Opportunity in Applied AI',
    description: 'Multi-product AI platform with diverse revenue streams and significant market opportunity.',
    type: 'website',
    images: [
      {
        url: '/images/investors-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function InvestorsPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-blue-900 to-blue-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Investment Opportunity
              </h1>
              <p className="text-xl sm:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
                OFFO Labs is building a multi-product AI platform serving diverse industries with proven technology and significant market opportunity.
              </p>
            </div>
          </div>
        </section>

        <InvestmentThesisSection />

        <MarketOpportunitySection />

        <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Why OFFO Labs
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                  2+
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Proven Products
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                  4+
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Industry Verticals
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  100%
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Production Ready
                </p>
              </div>

              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                  $0
                </div>
                <p className="text-gray-700 dark:text-gray-300 font-semibold">
                  Technical Debt
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              Interested in Learning More?
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              We are building the next generation of practical AI applications. If you are interested in exploring an investment opportunity with OFFO Labs, let us talk.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:investors@offo.ai"
                className="inline-block px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors"
              >
                Contact Our Team
              </a>
              <a
                href="/"
                className="inline-block px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Back to Home
              </a>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
