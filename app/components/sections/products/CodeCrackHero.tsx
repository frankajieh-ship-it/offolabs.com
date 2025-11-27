'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { analytics } from '@/utils/analytics'

export default function CodeCrackHero() {
  const [isLoading, setIsLoading] = useState(false)

  const handleWaitlistClick = async () => {
    setIsLoading(true)
    try {
      analytics.track('codecrack_hero_waitlist_clicked', {
        product: 'codecrack',
        source: 'hero_cta',
      })

      const newsletterSection = document.getElementById('newsletter')
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = '#newsletter'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative overflow-hidden pt-20 pb-20 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-600 to-blue-500 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-full blur-3xl opacity-20 dark:opacity-10" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800">
            <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
            <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
              Master coding through gaming
            </span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              CodeCrack — The Educational Coding Game
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Learn to code through fun challenges, interactive puzzles, and real-world scenarios. Earn rewards and compete with developers worldwide.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleWaitlistClick}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Join CodeCrack Waitlist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              Learn More
            </a>
          </div>

          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">500K+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Developers Learning</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">10M+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Challenges Completed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">4.8★</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">App Store Rating</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
