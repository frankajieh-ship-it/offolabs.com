'use client'

import { useEffect } from 'react'
import { Zap, Users, Lock, BarChart3, Code, Settings } from 'lucide-react'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  color: string
  badge?: string
}

export default function OffoAiFeaturesSection() {
  useEffect(() => {
    // Track when Features section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'offo_ai_features_viewed', {
              product: 'offo-ai',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section[data-section="features"]')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const features: Feature[] = [
    {
      icon: <Code className="w-8 h-8" />,
      title: 'Agent Templates',
      description: 'Pre-built agent templates for business strategy, operations, engineering, and support.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Custom Agent Builder',
      description: 'Drag-and-drop or prompt-based configuration (future), enabling tailored workflows.',
      color: 'from-purple-600 to-purple-500',
      badge: 'Soon',
    },
    {
      icon: <Settings className="w-8 h-8" />,
      title: 'Integrations (Future)',
      description: 'Slack, Email, Google Workspace, Cloud storage, Inventory & CRM systems.',
      color: 'from-orange-600 to-orange-500',
      badge: 'Coming',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Role-Based Access (Future)',
      description: 'Control access for teams and departments.',
      color: 'from-green-600 to-green-500',
      badge: 'Coming',
    },
    {
      icon: <Lock className="w-8 h-8" />,
      title: 'Secure Private Mode',
      description: 'Ensures business data never trains models unless explicitly permitted.',
      color: 'from-red-600 to-red-500',
    },
    {
      icon: <BarChart3 className="w-8 h-8" />,
      title: 'Analytics Dashboards',
      description: 'View agent performance & business impact in real time.',
      color: 'from-pink-600 to-pink-500',
    },
  ]

  return (
    <section data-section="features" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Key Features of OFFO AI
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            OFFO AI is built to help businesses deploy practical, real-world automation—not experimental AI.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800/50 p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700"
            >
              {/* Badge */}
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-300 dark:border-blue-700">
                    {feature.badge}
                  </span>
                </div>
              )}

              {/* Icon */}
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {feature.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
