import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import CompanyStorySection from '@/components/sections/about/CompanyStorySection'
import MissionVisionSection from '@/components/sections/about/MissionVisionSection'
import TeamCultureSection from '@/components/sections/TeamCultureSection'

export const metadata: Metadata = {
  title: 'About OFFO Labs - Our Mission & Vision | OFFO Labs',
  description: 'Learn about OFFO Labs mission to build practical AI applications for daily life, commerce, and engineering. Discover our vision for a unified ecosystem of real AI solutions.',
  keywords: ['OFFO Labs', 'about us', 'AI mission', 'engineering', 'technology', 'startup'],
  openGraph: {
    title: 'About OFFO Labs - Practical AI for Real Problems',
    description: 'A unified ecosystem of practical AI apps built to solve real problems for real users.',
    type: 'website',
    images: [
      {
        url: '/images/about-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function AboutPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                About OFFO Labs
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                We build practical AI applications that solve real problems for real users.
              </p>
            </div>
          </div>
        </section>

        {/* Company Story Section */}
        <CompanyStorySection />

        {/* Mission & Vision Section */}
        <MissionVisionSection />

        {/* Team & Culture Section */}
        <TeamCultureSection />

        {/* Values Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Core Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Practical Impact
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Every product we build is designed to solve real problems. We focus on practical solutions that deliver measurable value to our users.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Technical Excellence
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  We believe in building products right. High code quality, rigorous testing, and continuous improvement are non-negotiable.
                </p>
              </div>

              <div className="p-8 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  User-Centric Design
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  Our users&apos; needs drive every decision. We listen, iterate, and refine until our products truly serve their workflows.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              Our Product Ecosystem
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto text-center mb-12 leading-relaxed">
              OFFO Labs is building a unified ecosystem of AI-powered products, each addressing specific needs across different industries and use cases.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="p-8 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20">
                <h3 className="text-2xl font-bold text-blue-900 dark:text-blue-100 mb-3">
                  Engine Acoustic AI
                </h3>
                <p className="text-blue-800 dark:text-blue-200 leading-relaxed mb-4">
                  Preventive diagnostics for rotating systems using the world&apos;s largest non-OEM acoustic dataset. Serves automotive, fleet, industrial, and power generation sectors.
                </p>
                <a
                  href="/products/engine-acoustic-ai"
                  className="inline-block text-blue-700 dark:text-blue-300 font-semibold hover:text-blue-900 dark:hover:text-blue-100"
                >
                  Learn more →
                </a>
              </div>

              <div className="p-8 rounded-lg border border-purple-200 dark:border-purple-900 bg-purple-50 dark:bg-purple-900/20">
                <h3 className="text-2xl font-bold text-purple-900 dark:text-purple-100 mb-3">
                  OFFO AI
                </h3>
                <p className="text-purple-800 dark:text-purple-200 leading-relaxed mb-4">
                  Applied AI agents for business automation and engineering assistance. Helps founders, SMEs, and engineering teams streamline workflows and unlock operational insights.
                </p>
                <a
                  href="/products/offo-ai"
                  className="inline-block text-purple-700 dark:text-purple-300 font-semibold hover:text-purple-900 dark:hover:text-purple-100"
                >
                  Learn more →
                </a>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
