'use client'

import { useEffect } from 'react'
import { Globe, Zap, Users, Rocket } from 'lucide-react'

interface Benefit {
  icon: React.ReactNode
  title: string
  description: string
}

export default function WorkWithUsSection() {
  useEffect(() => {
    // Track when Work With Us section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'careers_work_with_us_viewed', {
              section: 'work_with_us',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section[data-section="work-with-us"]')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const benefits: Benefit[] = [
    {
      icon: <Globe className="w-8 h-8" />,
      title: 'Fully Remote',
      description: 'Work from anywhere in the world. We embrace global talent and asynchronous collaboration.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Builder Mindset',
      description: 'Small teams, high autonomy. You own your work from conception to shipping and beyond.',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Move Fast, Experiment Constantly',
      description: 'We ship quickly, learn from users, and iterate. Speed and learning beat perfection every time.',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Direct Product Ownership',
      description: 'Your decisions impact real users. You see the direct results of your work across our products.',
    },
  ]

  return (
    <section data-section="work-with-us" className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            What It&apos;s Like to Work at OFFO
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Culture centered on impact, autonomy, and serious engineering.
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 p-8 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                {benefit.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {benefit.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}