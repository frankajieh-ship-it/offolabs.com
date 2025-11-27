'use client'

import { useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { analytics } from '@/lib/utils/analytics'

interface ProductNewsletterProps {
  productName: string
  productSlug: string
  headline?: string
  subtitle?: string
  ctaText?: string
  placeholderText?: string
}

export default function ProductNewsletter({
  productName,
  productSlug,
  headline = `Join the ${productName} Waitlist`,
  subtitle = `Be among the first to experience ${productName}. Early access, exclusive features, and community perks await.`,
  ctaText = 'Get Early Access',
  placeholderText = 'your@email.com'
}: ProductNewsletterProps) {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      // Track the signup event
      analytics.waitlistSignup(productSlug, email)

      // Send to API
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          product: productSlug,
          source: 'product_page'
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to subscribe')
      }

      setIsSubmitted(true)
      setEmail('')

      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false)
      }, 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      analytics.error('newsletter_signup_failed', err instanceof Error ? err.message : 'Unknown error', {
        product: productSlug
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-offo dark:bg-gradient-offo-dark">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-1/2 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-2xl mx-auto text-center space-y-8">
        {/* Heading */}
        <div className="space-y-3">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
            {headline}
          </h2>
          <p className="text-lg text-blue-100">
            {subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={placeholderText}
              required
              className="flex-1 px-4 py-3 rounded-lg bg-white/90 dark:bg-gray-900/50 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 border border-white/20 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-white/30 transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || isSubmitted}
              className="px-8 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-blue-50 disabled:opacity-75 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 group whitespace-nowrap"
            >
              <span>{isSubmitted ? '✓ Subscribed' : ctaText}</span>
              {!isSubmitted && (
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <p className="text-sm text-red-200">
              {error}
            </p>
          )}

          {/* Success Message */}
          {isSubmitted && (
            <p className="text-sm text-green-200">
              Thanks for signing up! Check your email for exclusive content.
            </p>
          )}

          {/* Privacy Notice */}
          <p className="text-xs text-blue-100/70">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  )
}
