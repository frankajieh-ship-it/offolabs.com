import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import CareersIntroSection from '@/components/sections/careers/CareersIntroSection'
import WorkWithUsSection from '@/components/sections/careers/WorkWithUsSection'
import OpenRolesSection from '@/components/sections/careers/OpenRolesSection'
import CulturePillarsSection from '@/components/sections/careers/CulturePillarsSection'
import TalentNetworkForm from '@/components/sections/careers/TalentNetworkForm'

export const metadata: Metadata = {
  title: 'Careers - Join OFFO Labs | OFFO Labs',
  description: 'Join OFFO Labs and help build the next generation of practical AI solutions. We\'re looking for talented engineers, designers, and product thinkers.',
  keywords: ['careers', 'jobs', 'hiring', 'engineering', 'AI', 'startup', 'talent'],
  openGraph: {
    title: 'Careers at OFFO Labs - Build the Future of AI',
    description: 'Join a high-caliber AI studio building practical solutions for real-world problems.',
    type: 'website',
    images: [
      {
        url: '/images/careers-og.png',
        width: 1200,
        height: 630,
      },
    ],
  },
}

export default function CareersPage() {
  return (
    <MainLayout>
      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                Join OFFO Labs
              </h1>
              <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                Help us build the next generation of practical AI solutions. We&#39;re a high-caliber AI studio solving real problems for real users.
              </p>
              <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="#talent-network"
                  className="inline-block px-8 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors"
                >
                  Join Talent Network
                </a>
                <a
                  href="#culture"
                  className="inline-block px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition-colors"
                >
                  Learn About Our Culture
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Intro Section */}
        <CareersIntroSection />

        {/* Work With Us Section */}
        <WorkWithUsSection />

        {/* Open Roles Section */}
        <OpenRolesSection roles={[]} />

        {/* Culture Section */}
        <div id="culture">
          <CulturePillarsSection />
        </div>

        {/* Talent Network Section */}
        <section id="talent-network" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-6 mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
                Join Our Talent Network
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
                Even if we don&#39;t have open roles right now, we&#39;re always interested in exceptional talent. Join our talent network and stay updated on opportunities as they arise.
              </p>
            </div>
            <TalentNetworkForm />
          </div>
        </section>

        {/* What We're Looking For Section */}
        <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-12 text-center">
              What We&#39;re Looking For
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Skills & Experience
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Strong software engineering fundamentals (any language/stack)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Experience building production systems at scale</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Comfortable with AI/ML concepts (not necessarily an ML engineer)</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Experience with full-stack development or systems engineering</span>
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Mindset & Values
                </h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Bias toward action and shipping over perfect planning</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Ownership mindset—you care about end-to-end outcomes</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Passionate about practical, real-world solutions</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-blue-600 dark:text-blue-400 font-bold">✓</span>
                    <span className="text-gray-700 dark:text-gray-300">Comfortable with ambiguity and rapid iteration</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </MainLayout>
  )
}
