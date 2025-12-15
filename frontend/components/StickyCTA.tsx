'use client'

import { useState, useEffect } from 'react'
import { MessageSquare, X, Calendar, Mail } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StickyCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    // Check if dismissed in last 24 hours
    const dismissedTime = localStorage.getItem('stickyCTA-dismissed')
    if (dismissedTime) {
      const hoursSinceDismissed = (Date.now() - parseInt(dismissedTime)) / (1000 * 60 * 60)
      if (hoursSinceDismissed < 24) {
        setIsDismissed(true)
        return
      }
    }

    const handleScroll = () => {
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true)
      } else if (window.scrollY <= 500) {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isDismissed])

  const handleDismiss = () => {
    setIsDismissed(true)
    setIsVisible(false)
    // Store dismissal timestamp for 24 hours
    localStorage.setItem('stickyCTA-dismissed', Date.now().toString())
  }

  return (
    <AnimatePresence>
      {isVisible && !isDismissed && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <div className="bg-white rounded-xl shadow-2xl border-2 border-gray-200 p-5 max-w-sm">
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-sm">
                  <MessageSquare className="h-5 w-5 text-white" />
                </div>
                <div className="ml-3">
                  <h4 className="font-semibold text-gray-900">Questions?</h4>
                  <p className="text-sm text-gray-600">Talk to our team</p>
                </div>
              </div>
              <button
                onClick={handleDismiss}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 hover:bg-gray-100 rounded"
                aria-label="Dismiss"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2">
              {/* Primary - Schedule Call */}
              <a
                href="https://calendly.com/offolabs/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center w-full rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 px-4 py-3 text-sm font-semibold text-white hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg"
              >
                <Calendar className="h-4 w-4 mr-2" />
                Schedule 15-min Chat
              </a>

              {/* Secondary - Email */}
              <a
                href="mailto:pilot@offolabs.com?subject=Harmony%20Engine%20Pilot%20Inquiry"
                className="flex items-center justify-center w-full rounded-lg border-2 border-gray-300 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-all"
              >
                <Mail className="h-4 w-4 mr-2" />
                Email Our Team
              </a>
            </div>

            {/* Footer */}
            <div className="mt-4 pt-3 border-t border-gray-100">
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                <span>Average response time: 2 hours</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
