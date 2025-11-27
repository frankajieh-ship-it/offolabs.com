'use client'

import React, { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { analytics } from '@/utils/analytics'

export default function RenovAiHero() {
  const [isLoading, setIsLoading] = useState(false)

  const handleWaitlistClick = async () => {
    setIsLoading(true)
    try {
      analytics.track('renov_ai_waitlist_clicked', {
        product: 'renov-ai',
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
      {/* Background with room silhouette effect */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-600 to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-600 to-purple-500 rounded-full blur-3xl opacity-20 dark:opacity-10" />
        
        {/* Room silhouette SVG overlay */}
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96 opacity-5 dark:opacity-10 pointer-events-none"
          viewBox="0 0 200 200"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20 50 L20 180 L180 180 L180 50 Z" fill="currentColor" />
          <rect x="40" y="70" width="30" height="40" fill="white" opacity="0.3" />
          <rect x="130" y="70" width="30" height="40" fill="white" opacity="0.3" />
          <circle cx="100" cy="120" r="20" fill="white" opacity="0.2" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          {/* Tagline */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-purple-50 dark:bg-purple-900/30 border border-purple-200 dark:border-purple-800">
            <span className="w-2 h-2 rounded-full bg-purple-600 dark:bg-purple-400" />
            <span className="text-sm font-medium text-purple-600 dark:text-purple-400">
              AI-powered interior redesign
            </span>
          </div>

          {/* Main Headline */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Renov.AI — Design Your Space with AI
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              Upload a room photo, let AI redesign it, then shop the look in a few clicks.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={handleWaitlistClick}
              disabled={isLoading}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-purple-500 text-white font-semibold hover:shadow-lg transition-all duration-200 flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <span>Join Renov.AI Waitlist</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <a
              href="#features"
              className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              See Examples
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 pt-12 border-t border-gray-200 dark:border-gray-800">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">10K+</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Rooms Designed</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">95%</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">User Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">30min</div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">Average Time</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
