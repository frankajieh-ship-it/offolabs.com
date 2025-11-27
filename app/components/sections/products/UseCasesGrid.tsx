'use client'

import { useEffect } from 'react'
import { Wrench, Truck, Zap, Power } from 'lucide-react'
import { analytics } from '@/utils/analytics'

interface UseCase {
  icon: React.ReactNode
  title: string
  description: string
  benefits: string[]
  color: string
}

interface UseCasesGridProps {
  product: string
  useCases: UseCase[]
  analyticsEventName?: string
}

export default function UseCasesGrid({
  product,
  useCases,
  analyticsEventName = 'use_cases_viewed',
}: UseCasesGridProps) {
  useEffect(() => {
    // Track when Use Cases section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track(analyticsEventName, {
            product,
            section: 'use_cases',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [product, analyticsEventName])

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900/50 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Use Cases Across Industries
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Proven acoustic diagnostics for rotating equipment in diverse sectors
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group relative rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 hover:shadow-lg transition-all duration-300"
            >
              {/* Top Accent Bar */}
              <div className={`h-1 w-full bg-gradient-to-r ${useCase.color}`} />

              {/* Content */}
              <div className="p-8 space-y-6">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${useCase.color} flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-300`}
                >
                  {useCase.icon}
                </div>

                {/* Title & Description */}
                <div className="space-y-3">
                  <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                    {useCase.description}
                  </p>
                </div>

                {/* Benefits List */}
                <div className="space-y-2 pt-2 border-t border-gray-200 dark:border-gray-700">
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">
                    Key Benefits:
                  </p>
                  <ul className="space-y-1">
                    {useCase.benefits.map((benefit, idx) => (
                      <li
                        key={idx}
                        className="text-sm text-gray-600 dark:text-gray-400 flex items-start space-x-2"
                      >
                        <span className="text-green-600 dark:text-green-400 font-bold mt-0.5">
                          •
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
