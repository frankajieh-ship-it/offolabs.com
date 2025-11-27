import { TrendingUp, Zap, Target, Clock } from 'lucide-react'

interface Metric {
  icon: React.ReactNode
  value: string
  label: string
  description: string
  color: 'blue' | 'green' | 'orange' | 'purple'
}

export default function AccuracyMetrics() {
  const metrics: Metric[] = [
    {
      icon: <Target className="w-8 h-8" />,
      value: '98%+',
      label: 'Diagnostic Accuracy',
      description: 'Across all vehicle makes, models, and conditions',
      color: 'blue'
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      value: '6+ Months',
      label: 'Early Warning Window',
      description: 'Detect issues before they become failures',
      color: 'green'
    },
    {
      icon: <Clock className="w-8 h-8" />,
      value: '< 2 Seconds',
      label: 'Analysis Time',
      description: 'Real-time acoustic analysis and diagnostics',
      color: 'orange'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      value: '60%+ Savings',
      label: 'Potential Cost Reduction',
      description: 'From preventive vs. reactive maintenance',
      color: 'purple'
    }
  ]

  const colorMap = {
    blue: {
      bg: 'bg-blue-50 dark:bg-blue-900/20',
      icon: 'text-blue-600 dark:text-blue-400',
      border: 'border-blue-200 dark:border-blue-800',
      value: 'text-blue-700 dark:text-blue-300',
      accent: 'from-blue-600 to-blue-500'
    },
    green: {
      bg: 'bg-green-50 dark:bg-green-900/20',
      icon: 'text-green-600 dark:text-green-400',
      border: 'border-green-200 dark:border-green-800',
      value: 'text-green-700 dark:text-green-300',
      accent: 'from-green-600 to-green-500'
    },
    orange: {
      bg: 'bg-orange-50 dark:bg-orange-900/20',
      icon: 'text-orange-600 dark:text-orange-400',
      border: 'border-orange-200 dark:border-orange-800',
      value: 'text-orange-700 dark:text-orange-300',
      accent: 'from-orange-600 to-orange-500'
    },
    purple: {
      bg: 'bg-purple-50 dark:bg-purple-900/20',
      icon: 'text-purple-600 dark:text-purple-400',
      border: 'border-purple-200 dark:border-purple-800',
      value: 'text-purple-700 dark:text-purple-300',
      accent: 'from-purple-600 to-purple-500'
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
            text-gray-900 dark:text-white">
            Performance That Speaks for Itself
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Engine Acoustic AI delivers industry-leading accuracy and speed in predictive diagnostics
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {metrics.map((metric, index) => {
            const colors = colorMap[metric.color]
            return (
              <div
                key={index}
                className={`p-8 rounded-lg border ${colors.border} ${colors.bg}
                  hover:shadow-lg transition-all duration-300 group relative overflow-hidden`}
              >
                {/* Background Gradient */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${colors.accent}
                  opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${colors.bg} flex items-center justify-center
                    ${colors.icon} mb-4 group-hover:scale-110 transition-transform`}>
                    {metric.icon}
                  </div>

                  {/* Value */}
                  <div className={`text-4xl font-bold ${colors.value} mb-2`}>
                    {metric.value}
                  </div>

                  {/* Label */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                    {metric.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Key Insight Box */}
        <div className="mt-16 p-8 rounded-lg border border-gray-200 dark:border-gray-800
          bg-white dark:bg-gray-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Reliability You Can Depend On
              </h3>
              <ul className="space-y-3">
                {[
                  'Works 24/7 without fatigue',
                  'Consistent accuracy across conditions',
                  'Improves with more data',
                  'Zero false negatives guarantee'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30
                      flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-orange-600 dark:text-orange-400"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Real-World Impact
              </h3>
              <p className="text-gray-700 dark:text-gray-300 mb-4 leading-relaxed">
                Fleet operators using Engine Acoustic AI report:
              </p>
              <ul className="space-y-3">
                {[
                  'Average 60% reduction in maintenance costs',
                  '90% fewer emergency breakdowns',
                  'Extended vehicle lifespan by 3-5 years',
                  'Improved safety compliance scores'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center space-x-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30
                      flex items-center justify-center flex-shrink-0">
                      <svg className="w-3 h-3 text-orange-600 dark:text-orange-400"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
