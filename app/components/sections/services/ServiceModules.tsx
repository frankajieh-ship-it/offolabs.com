'use client'

import { Zap, Lightbulb, Rocket } from 'lucide-react'
import { useScrollTo } from '@/lib/hooks/useScrollTo'

interface ServiceModule {
  icon: React.ReactNode
  title: string
  subtitle: string
  description: string
  features: string[]
  highlight: string
  cta: {
    label: string
    action: 'project' | 'consultation'
  }
}

export default function ServiceModules() {
  const scrollTo = useScrollTo()

  const handleCtaClick = (action: 'project' | 'consultation') => {
    // Track which type of CTA was clicked
    if (action === 'consultation') {
      // Store in sessionStorage so the form can access it
      sessionStorage.setItem('consultationRequested', 'true')
    } else {
      sessionStorage.removeItem('consultationRequested')
    }
    scrollTo('intake')
  }

  const services: ServiceModule[] = [
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'AI-Accelerated Product Development',
      subtitle: 'Build your MVP or full-scale application using our multi-agent system.',
      description:
        'We design, build, and ship products end-to-end with an AI-first pipeline that compresses timelines from months to weeks.',
      features: [
        'Mobile apps (iOS/Android, Expo, React Native)',
        'Web apps (Next.js, FastAPI, Supabase)',
        'AI-powered tools and workflows',
        'Internal automation dashboards',
        'Multi-agent systems',
        'Prototype → MVP → production-scale applications',
      ],
      highlight:
        'Our internal agent pipeline lets us produce in days what traditional teams deliver in months.',
      cta: {
        label: 'Start a Project',
        action: 'project',
      },
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'AI Strategy & Systems Consultation',
      subtitle: 'Design and deploy AI systems that drive real value — not just hype.',
      description:
        'Whether you\'re just starting with AI or trying to scale existing initiatives, we help you design architectures, workflows, and roadmaps that actually ship.',
      features: [
        'AI workflow integration',
        'Product and systems architecture planning',
        'Roadmaps & technical execution plans',
        'AI automation for operations and internal tools',
        'MVP scoping & technical validation',
        'AI agent deployment and orchestration',
      ],
      highlight:
        'We deliver enterprise-grade documentation and execution plans in under 72 hours.',
      cta: {
        label: 'Request Consultation',
        action: 'consultation',
      },
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Full Project Execution & Delivery',
      subtitle: 'You own the vision. We handle the execution — end-to-end.',
      description:
        'For founders and teams who want to ship, not babysit a dev shop, we run full-cycle delivery using our AI-accelerated pipeline.',
      features: [
        'Product concepting & requirement definition',
        'UI/UX design',
        'Architecture definition (backend, frontend, infra, agents)',
        'Engineering implementation',
        'Testing & QA',
        'Deployment & launch',
        'Ongoing iteration and optimization',
      ],
      highlight:
        'Clients benefit from the same high-speed development engine that built OFFO\'s multi-product ecosystem.',
      cta: {
        label: 'Start a Project',
        action: 'project',
      },
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our Services
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Three core services to accelerate your AI-powered product journey
          </p>
        </div>

        {/* Services Grid */}
        <div className="space-y-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-8 sm:p-10 hover:shadow-lg transition-shadow duration-300"
            >
              {/* Header */}
              <div className="flex gap-4 mb-6">
                <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 flex-shrink-0">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {service.title}
                  </h3>
                  <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">
                    {service.subtitle}
                  </p>
                </div>
              </div>

              {/* Description */}
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features Grid */}
              <div className="mb-6">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-4 uppercase tracking-wide">
                  What's Included
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex gap-3">
                      <span className="text-blue-600 dark:text-blue-400 font-bold flex-shrink-0">✓</span>
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Highlight Box */}
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded p-4 mb-6">
                <p className="text-blue-900 dark:text-blue-100 font-semibold">
                  {service.highlight}
                </p>
              </div>

              {/* CTA */}
              <button
                onClick={() => handleCtaClick(service.cta.action)}
                className="inline-block px-6 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors cursor-pointer"
              >
                {service.cta.label}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}