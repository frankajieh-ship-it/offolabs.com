'use client'

import { useEffect } from 'react'
import { Rocket, Lightbulb, Target, Layers, Wrench } from 'lucide-react'

interface Pillar {
  icon: React.ReactNode
  title: string
  description: string
}

export default function CulturePillarsSection() {
  useEffect(() => {
    // Track when Culture section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'careers_culture_viewed', {
              section: 'culture_pillars',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section[data-section="culture"]')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const pillars: Pillar[] = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Bias to Action',
      description: 'We ship fast, learn faster, and iterate continuously. Speed and learning matter more than perfection on day one.',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Experimentation Over Perfection',
      description: 'Progress beats polish. We build rapid prototypes, run fast learning cycles, and refine based on real feedback.',
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: 'Ownership',
      description: 'Small teams, big accountability. Everyone owns outcomes end-to-end and drives results from conception to deployment.',
    },
    {
      icon: <Layers className="w-8 h-8" />,
      title: 'Multi-Product Thinking',
      description: 'Every engineer contributes across apps, systems, and AI agents. We think in terms of the entire ecosystem.',
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Practicality First',
      description: 'We build real-world solutions that solve actual problems, not research demos or nice-to-haves.',
    },
  ]

  return (
    <section data-section="culture" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our Culture
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The principles that guide how we work and build at OFFO Labs.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className="group rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 p-8 transition-all duration-300 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:bg-blue-200 dark:group-hover:bg-blue-800/50 transition-colors">
                {pillar.icon}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
