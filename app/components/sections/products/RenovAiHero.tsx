'use client'

import { Sparkles } from 'lucide-react'
import { analytics } from '@/utils/analytics'

export default function RenovAiHero() {
  const handleWaitlistClick = () => {
    // Track CTA click with product flag
    analytics.track('renov_ai_waitlist_clicked', {
      product: 'renov-ai',
      source: 'hero_cta',
    })

    // Scroll to newsletter section
    const newsletter = document.getElementById('newsletter')
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#newsletter'
    }
  }

  const handleDemoClick = () => {
    analytics.track('renov_ai_demo_clicked', {
      product: 'renov-ai',
      source: 'hero_demo',
    })
  }
  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
              <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
                AI-Powered Design
              </span>
            </div>

            {/* Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white">
                Transform Your Space with <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600">AI Design</span>
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400">
                Get professional interior design suggestions instantly. Visualize your renovations before you build, powered by advanced artificial intelligence.
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-gray-200 dark:border-gray-800">
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">10K+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Spaces Transformed</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">4.9★</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">User Rating</div>
              </div>
              <div className="space-y-1">
                <div className="text-3xl font-bold text-gray-900 dark:text-white">50+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Design Styles</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={handleWaitlistClick}
                className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:shadow-lg transition-shadow"
              >
                Try Free Demo
              </button>
              <button
                onClick={handleDemoClick}
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Watch Demo
              </button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-pink-600/20 rounded-2xl blur-3xl" />
            <div className="relative bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl aspect-square flex items-center justify-center text-white overflow-hidden">
              <div className="text-center space-y-4">
                <div className="text-6xl">🏠</div>
                <p className="text-xl font-semibold">AI Interior Design</p>
                <p className="text-sm text-white/80">Before & After Preview</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
