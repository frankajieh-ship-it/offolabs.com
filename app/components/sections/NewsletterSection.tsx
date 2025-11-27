'use client'

import { useState } from 'react'
import { Mail, Check } from 'lucide-react'

interface NewsletterFormState {
  email: string
  isSubmitted: boolean
  isLoading: boolean
  error: string | null
}

export default function NewsletterSection() {
  const [formState, setFormState] = useState<NewsletterFormState>({
    email: '',
    isSubmitted: false,
    isLoading: false,
    error: null
  })

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    // Client-side validation
    if (!formState.email.trim()) {
      setFormState(prev => ({ ...prev, error: 'Email is required' }))
      return
    }

    if (!validateEmail(formState.email)) {
      setFormState(prev => ({ ...prev, error: 'Please enter a valid email address' }))
      return
    }

    setFormState(prev => ({ ...prev, isLoading: true, error: null }))

    try {
      // TODO: Connect to backend API endpoint
      // const response = await fetch('/api/newsletter', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email: formState.email })
      // })

      // if (!response.ok) {
      //   throw new Error('Failed to subscribe')
      // }

      // Simulate API call for now
      await new Promise(resolve => setTimeout(resolve, 600))

      setFormState(prev => ({
        ...prev,
        isSubmitted: true,
        isLoading: false,
        email: ''
      }))

      // TODO: Add confetti or bounce animation here
      // Example: import confetti from 'canvas-confetti'
      // confetti()

      // Reset after 3 seconds
      setTimeout(() => {
        setFormState(prev => ({
          ...prev,
          isSubmitted: false
        }))
      }, 3000)
    } catch (err) {
      setFormState(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to subscribe. Please try again.'
      }))
    }
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState(prev => ({
      ...prev,
      email: e.target.value,
      isSubmitted: false
    }))
  }

  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-r from-primary-600 to-primary-800 dark:from-primary-900 dark:to-primary-950" id="newsletter">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden -z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-400/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8 text-center">
          {/* Header */}
          <div className="space-y-4">
            <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
              <Mail className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">
                Stay Updated
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
              Get Early Access to OFFO Tools
            </h2>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Get early access to OFFO tools, launch updates, and founder notes.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                value={formState.email}
                onChange={handleEmailChange}
                disabled={formState.isLoading}
                className={`flex-1 px-6 py-3 rounded-lg bg-white/10 border text-white placeholder-white/50 focus:outline-none focus:ring-2 transition-all disabled:opacity-50 ${
                  formState.error
                    ? 'border-red-400 focus:ring-red-400/40'
                    : 'border-white/20 focus:ring-white/40'
                }`}
                required
              />
              <button
                type="submit"
                disabled={formState.isLoading || formState.isSubmitted}
                className="px-8 py-3 rounded-lg bg-white text-primary-600 font-semibold hover:bg-white/90 transition-all disabled:opacity-50 flex items-center justify-center space-x-2 group whitespace-nowrap"
              >
                {formState.isSubmitted ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Subscribed!</span>
                  </>
                ) : (
                  <>
                    <span>{formState.isLoading ? 'Subscribing...' : 'Subscribe'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Error Message */}
            {formState.error && (
              <p className="text-sm text-red-200">
                {formState.error}
              </p>
            )}
          </form>

          {/* Social Proof */}
          <div className="pt-8 border-t border-white/20">
            <p className="text-sm text-white/70 mb-4">
              Join 50,000+ professionals receiving weekly insights
            </p>
            <div className="flex items-center justify-center space-x-2">
              <div className="flex -space-x-2">
                {[...Array(4)].map((_, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/30 border border-white/50"
                  />
                ))}
              </div>
              <span className="text-xs text-white/70">
                +1000 new members this month
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}