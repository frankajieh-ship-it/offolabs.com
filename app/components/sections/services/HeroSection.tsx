'use client'

import { useScrollTo } from '@/lib/hooks/useScrollTo'

export function HeroSection() {
  const scrollTo = useScrollTo()

  const handleCtaClick = (action: 'project' | 'consultation') => {
    // Track which type of CTA was clicked
    if (action === 'consultation') {
      // Store in sessionStorage so the form can access it
      sessionStorage.setItem('consultationRequested', 'true')
    } else {
      sessionStorage.removeItem('consultationRequested')
    }
    scrollTo('intake')
  }

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-6">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            AI-Powered Development,
            <br />
            Consultation & Product Acceleration
          </h1>

          <p className="text-xl sm:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            We help founders, businesses, and creators turn ideas into production-ready products
            — faster than any traditional dev team.
          </p>

          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => handleCtaClick('project')}
              className="inline-block px-8 py-3 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Start a Project
            </button>

            <button
              onClick={() => handleCtaClick('consultation')}
              className="inline-block px-8 py-3 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Request Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
