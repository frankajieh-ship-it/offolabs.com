'use client'

import { useEffect } from 'react'
import { Waves, TrendingUp, Zap, Smartphone, Plug, CheckCircle } from 'lucide-react'
import { motion } from 'framer-motion'

interface Feature {
  icon: React.ReactNode
  title: string
  description: string
  details?: string[]
  color: string
  badge?: string
}

export default function EngineAcousticAIFeatures() {
  useEffect(() => {
    // Track when Features section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'engine_ai_features_viewed', {
              product: 'engine-acoustic-ai',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])
  const mainFeatures: Feature[] = [
    {
      icon: <Waves className="w-8 h-8" />,
      title: 'Acoustic Signature Analysis',
      description: 'Map sound patterns to known mechanical issues using multi-layer frequency fingerprinting.',
      details: [
        'Multi-frequency analysis across 20-20kHz range',
        'Pattern matching against 500K+ acoustic signatures',
        'Real-time anomaly detection in milliseconds',
      ],
      color: 'from-blue-600 to-blue-500',
      badge: 'Core Technology',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Trend Tracking & Maintenance Alerts',
      description: 'Monitor wear progression over time — perfect for fleets & workshops.',
      details: [
        'Historical wear trend analysis',
        'Predictive maintenance scheduling',
        'Automated alert system for critical thresholds',
        'Fleet-wide health dashboards',
      ],
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Engine Behavior Intelligence',
      description: 'Advanced diagnostics for critical engine parameters.',
      details: [
        'Misfire recognition & severity scoring',
        'Knock intensity measurement',
        'Harmonic instability metrics',
        'Generator load fluctuation acoustics',
      ],
      color: 'from-orange-600 to-orange-500',
      badge: 'NEW',
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Cross-Platform Support',
      description: 'Mobile-first upload + dashboard analytics.',
      details: [
        'iOS & Android native apps',
        'Web dashboard for analytics',
        'Cloud synchronization',
        'Offline recording capability',
      ],
      color: 'from-green-600 to-green-500',
    },
  ]

  const futureIntegrations = [
    {
      icon: <Plug className="w-6 h-6" />,
      title: 'Workshop Management APIs',
      description: 'Integrate with workshop software',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'OEM Diagnostic Dashboards',
      description: 'Factory integration capabilities',
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'Fleet Monitoring Systems',
      description: 'Enterprise fleet management',
    },
    {
      icon: <CheckCircle className="w-6 h-6" />,
      title: 'Predictive Maintenance Pipelines',
      description: 'Automated maintenance workflows',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Acoustic Diagnostics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Advanced AI-powered features for comprehensive engine and rotating equipment diagnostics
          </p>
        </motion.div>

        {/* Main Features Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 transition-all duration-300 hover:shadow-lg hover:border-orange-300 dark:hover:border-orange-700"
            >
              {/* Gradient Background */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

              {/* Badge */}
              {feature.badge && (
                <div className="absolute top-4 right-4">
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border border-orange-300 dark:border-orange-700">
                    {feature.badge}
                  </span>
                </div>
              )}

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                  {feature.description}
                </p>

                {/* Details List */}
                {feature.details && (
                  <ul className="space-y-2">
                    {feature.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                        <CheckCircle className="w-4 h-4 text-orange-600 dark:text-orange-400 flex-shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Future Integrations Section */}
        <motion.div
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-3">
              Future Integrations
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Planned API connections for enterprise systems
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {futureIntegrations.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-6 hover:border-orange-300 dark:hover:border-orange-700 transition-colors duration-300"
              >
                <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                  {item.icon}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Info Banner */}
        <motion.div
          className="mt-16 p-6 rounded-lg bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-900 dark:text-gray-100">
            <strong>Powered by Data:</strong> Our system analyzes data from 500K+ vehicle acoustic signatures and rotating equipment patterns, continuously improving diagnostic accuracy with every analysis.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
