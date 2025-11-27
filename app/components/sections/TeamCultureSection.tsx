'use client'

import { useEffect } from 'react'
import { Zap, Lightbulb, Users, Target } from 'lucide-react'
import { analytics } from '@/utils/analytics'

interface CultureValue {
  title: string
  description: string
  icon: React.ReactNode
}

export default function TeamCultureSection() {
  useEffect(() => {
    // Track when Team & Culture section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('about_team_viewed', {
            section: 'team_culture',
            page: 'about',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const cultureValues: CultureValue[] = [
    {
      title: 'Experimentation',
      description: 'We embrace bold ideas and iterative learning. Every experiment teaches us something valuable about building better AI products.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: 'Multi-Product Innovation',
      description: 'Our ecosystem approach allows us to innovate across different domains while leveraging shared AI infrastructure and insights.',
      icon: <Lightbulb className="w-8 h-8" />
    },
    {
      title: 'AI-First Engineering',
      description: 'We build with AI at the core, not as an afterthought. Our teams think about problems from an AI-native perspective first.',
      icon: <Zap className="w-8 h-8" />
    },
    {
      title: 'Speed + Quality',
      description: 'We move fast without sacrificing quality. Rapid iteration combined with rigorous testing ensures we ship products that matter.',
      icon: <Target className="w-8 h-8" />
    },
    {
      title: 'User Empathy',
      description: 'Every feature, every decision starts with understanding our users deeply. We build products people actually want to use.',
      icon: <Users className="w-8 h-8" />
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            How We Work
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            OFFO Labs is built on principles of experimentation, innovation, and user empathy. Our culture values speed, quality, and the power of AI-first thinking.
          </p>
        </div>

        {/* Culture Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {cultureValues.map((value, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-all duration-300 group"
            >
              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                {value.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                {value.title}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Future Growth Section */}
        <div className="p-8 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="max-w-3xl">
            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Growing Our Team
            </h3>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
              We&apos;re looking for builders, designers, and operators who share our vision of making AI accessible and impactful. If you&apos;re excited about shipping products that matter, working on a diverse product ecosystem, and growing alongside a talented team, we&apos;d love to hear from you.
            </p>
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              Join us in building the future of applied AI. We have openings across engineering, design, operations, and more.
            </p>
          </div>
        </div>

        {/* Optional: Team Grid Placeholder for Future */}
        <div className="mt-12 pt-12 border-t border-gray-200 dark:border-gray-800">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">
            Meet the Team
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {/* Placeholder cards for future implementation */}
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div
                key={item}
                className="rounded-lg bg-gray-100 dark:bg-gray-800 aspect-square flex items-center justify-center text-gray-400 dark:text-gray-600"
              >
                <div className="text-center">
                  <div className="text-sm font-medium">Team Member</div>
                  <div className="text-xs text-gray-500 dark:text-gray-500">Coming Soon</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
