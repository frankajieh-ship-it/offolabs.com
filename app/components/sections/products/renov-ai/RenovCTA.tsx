'use client'

import React from 'react'
import { analytics } from '@/utils/analytics'

export default function RenovCTA() {
  const handleScrollToWaitlist = () => {
    analytics.track('renov_ai_cta_clicked', {
      product: 'renov-ai',
      source: 'bottom_cta',
    })

    const newsletter = document.getElementById('newsletter')
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#newsletter'
    }
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          Ready to Transform Your Space?
        </h2>
        <p className="text-lg text-purple-100 mb-8 max-w-2xl mx-auto">
          Join thousands of users who are redesigning their homes with AI.
        </p>
        <button
          onClick={handleScrollToWaitlist}
          className="px-8 py-3 rounded-lg bg-white text-purple-600 font-semibold hover:bg-purple-50 transition-colors inline-flex items-center space-x-2"
        >
          <span>Join the Waitlist</span>
        </button>
      </div>
    </section>
  )
}
