'use client'

import { useScrollTo } from '@/lib/hooks/useScrollTo'

export default function FinalCTASection() {
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Heading */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready to build with OFFO Labs?
          </h2>

          {/* Description */}
          <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Whether you want a fast MVP, a long-term AI strategy, or full-cycle product execution, we can plug in as your AI-first product team.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <button
              onClick={() => handleCtaClick('project')}
              className="inline-block px-8 py-4 rounded-lg bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
            >
              Start a Project
            </button>
            <button
              onClick={() => handleCtaClick('consultation')}
              className="inline-block px-8 py-4 rounded-lg border border-white text-white font-semibold hover:bg-white/10 transition-colors cursor-pointer"
            >
              Request Consultation
            </button>
          </div>

          {/* Subtext */}
          <p className="text-gray-400 text-sm">
            We respond to inquiries within 24 hours.
          </p>
        </div>
      </div>
    </section>
  )
}