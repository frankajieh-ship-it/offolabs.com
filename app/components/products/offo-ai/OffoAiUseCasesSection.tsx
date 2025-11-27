'use client'

import { useEffect } from 'react'
import { Wrench, Truck, Zap, Power } from 'lucide-react'
import { analytics } from '@/utils/analytics'

interface UseCase {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function OffoAiUseCasesSection() {
  const useCases: UseCase[] = [
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Automotive Workshops',
      description:
        'Diagnose belt slip, pulley misalignment, bearing wear, tension issues. Rapid pre-inspection tool for mechanics.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Truck className="w-8 h-8" />,
      title: 'Fleet Maintenance',
      description:
        'Continuous monitoring for delivery fleets, buses, trucks, heavy-duty vehicles. Prevent failures, reduce downtime.',
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Industrial Rotating Equipment',
      description:
        'Rotors, compressors, pumps, HVAC blowers, conveyor rollers. Detect wobble, imbalance, wear.',
      color: 'from-orange-600 to-orange-500',
    },
    {
      icon: <Power className="w-8 h-8" />,
      title: 'Generator Sets',
      description:
        'Diesel & petrol gensets: home, telecom, industrial, hospital. Detect abnormal harmonics, belt noise, bearing wear, load anomalies.',
      color: 'from-red-600 to-red-500',
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('offo_ai_use_cases_viewed', {
            product: 'offo-ai',
            section: 'use_cases',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section[data-use-cases]')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      data-use-cases
      className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-gray-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Use Cases
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            OFFO AI serves businesses across industries and operational domains
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
