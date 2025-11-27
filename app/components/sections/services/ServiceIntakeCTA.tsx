'use client'

import { useEffect } from 'react'
import ServicesIntakeForm from './ServicesIntakeForm'

interface ServiceIntakeCTAProps {
  id?: string
}

export default function ServiceIntakeCTA({ id = 'services-intake' }: ServiceIntakeCTAProps) {
  useEffect(() => {
    // Track when intake section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'services_intake_viewed', {
              section: 'services_intake',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.getElementById(id)
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [id])

  return (
    <section
      id={id}
      className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900"
    >
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Ready to Start?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
            Fill out the form below and our team will review your request within 24 hours. We'll discuss your project goals, timeline, and scope to create the perfect plan.
          </p>
        </div>

        {/* Form */}
        <ServicesIntakeForm />

        {/* Additional Info */}
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Prefer to talk first?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Email us directly at{' '}
                <a
                  href="mailto:support@offodlabs.com"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  support@offodlabs.com
                </a>
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                Have questions?
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                Check out our{' '}
                <a
                  href="/services"
                  className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                >
                  Services page
                </a>{' '}
                for more details about each offering.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
