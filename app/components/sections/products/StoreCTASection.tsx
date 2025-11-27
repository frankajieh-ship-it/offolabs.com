'use client'

import React, { useEffect } from 'react'
import { analytics } from '@/utils/analytics'

export default function StoreCTASection() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('codecrack_store_section_viewed', {
            product: 'codecrack',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.getElementById('store-cta')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const handleNotifyClick = () => {
    analytics.track('codecrack_store_notify_clicked', {
      product: 'codecrack',
      source: 'store_section',
    })

    const newsletter = document.getElementById('newsletter')
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#newsletter'
    }
  }

  return (
    <section
      id="store-cta"
      className="py-20 lg:py-28 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Get CodeCrack
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Coming soon to your favorite app stores.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="group cursor-not-allowed">
              <div className="px-6 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 inline-flex items-center space-x-3 opacity-50 hover:opacity-60 transition-opacity">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.3-3.14-2.53C4.25 17 2.94 12.46 4.7 9.12c.9-1.56 2.64-2.55 4.48-2.58 1.3-.02 2.54.87 3.33.87.79 0 2.33-1.08 3.92-.92 1.69.07 3.32 1.12 4.27 2.79-.2.16-2.64 1.52-2.62 4.53.02 3.62 2.96 4.86 3.01 4.97-.15.04-.74.47-1.97 1.48z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Download on the</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">App Store</div>
                </div>
              </div>
            </div>

            <div className="group cursor-not-allowed">
              <div className="px-6 py-4 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 inline-flex items-center space-x-3 opacity-50 hover:opacity-60 transition-opacity">
                <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.609 1.814L13.792 12 3.609 22.186a1.5 1.5 0 0 1-1.318-2.689l8.668-7.497L2.291 4.503a1.5 1.5 0 0 1 1.318-2.689zm16.288 5.098l-4.147 3.588L20.5 12l-4.75 1.5 4.147 3.588a1.5 1.5 0 0 1-2.496 1.8L10 12l7.309-6.388a1.5 1.5 0 1 1 2.496 1.8z" />
                </svg>
                <div className="text-left">
                  <div className="text-xs text-gray-600 dark:text-gray-400">Get it on</div>
                  <div className="text-sm font-semibold text-gray-900 dark:text-white">Google Play</div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-4">
            <p className="text-gray-600 dark:text-gray-400 text-sm">Both versions coming Q1 2025</p>
            <div>
              <p className="text-gray-700 dark:text-gray-300 mb-3">
                Join the waitlist to be notified at launch.
              </p>
              <button
                onClick={handleNotifyClick}
                className="inline-flex items-center space-x-2 px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
              >
                <span>Notify Me</span>
              </button>
            </div>
          </div>

          <div className="max-w-2xl mx-auto p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
              Early Access Available
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Sign up for our beta program to get exclusive early access to CodeCrack before the official launch. Help us shape the future of the game with your feedback.
            </p>
            <button
              onClick={handleNotifyClick}
              className="mt-4 w-full sm:w-auto px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 font-medium transition-colors text-sm"
            >
              Join Beta Program
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
