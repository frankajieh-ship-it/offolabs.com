import { Wrench, Users, BarChart3, Shield } from 'lucide-react'

interface UseCase {
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
}

export default function UseCasesSection() {
  const useCases: UseCase[] = [
    {
      title: 'Fleet Maintenance Managers',
      description: 'Prevent costly breakdowns and reduce unplanned downtime across vehicle fleets',
      icon: <BarChart3 className="w-8 h-8" />,
      benefits: [
        'Predictive maintenance schedules',
        'Reduce emergency repairs by 60%+',
        'Extend vehicle lifespan'
      ]
    },
    {
      title: 'Independent Repair Shops',
      description: 'Diagnose problems faster with AI-assisted acoustic analysis',
      icon: <Wrench className="w-8 h-8" />,
      benefits: [
        'Faster diagnostics than manual inspection',
        'Identify problems before customer complaints',
        'Build competitive advantage'
      ]
    },
    {
      title: 'Industrial Equipment Operators',
      description: 'Monitor machinery health in real-time to prevent catastrophic failures',
      icon: <Shield className="w-8 h-8" />,
      benefits: [
        'Continuous health monitoring',
        'Avoid production shutdowns',
        'Improve safety compliance'
      ]
    },
    {
      title: 'OEM Service Centers',
      description: 'Enhance warranty diagnostics and customer service with acoustic intelligence',
      icon: <Users className="w-8 h-8" />,
      benefits: [
        'Faster root cause analysis',
        'Reduce warranty fraud',
        'Improve customer satisfaction'
      ]
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
            text-gray-900 dark:text-white">
            Who Benefits From Engine Acoustic AI?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Engine Acoustic AI is built for professionals who need reliable, fast diagnostics
          </p>
        </div>

        {/* Use Cases Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {useCases.map((useCase, index) => (
            <div
              key={index}
              className="group p-8 rounded-lg border border-gray-200 dark:border-gray-800
                bg-white dark:bg-gray-900/50 hover:shadow-offo-lg transition-all duration-300
                hover:border-primary-300 dark:hover:border-primary-700 overflow-hidden relative"
            >
              {/* Gradient Accent */}
              <div className="absolute inset-0 bg-gradient-offo-accent opacity-0
                group-hover:opacity-100 transition-opacity duration-300 -z-10" />

              {/* Icon */}
              <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30
                flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4
                group-hover:scale-110 transition-transform">
                {useCase.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3
                group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                {useCase.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                {useCase.description}
              </p>

              {/* Benefits List */}
              <ul className="space-y-3">
                {useCase.benefits.map((benefit, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <div className="w-5 h-5 rounded-full bg-orange-100 dark:bg-orange-900/30
                      flex items-center justify-center flex-shrink-0 mt-0.5">
                      <svg className="w-3 h-3 text-orange-600 dark:text-orange-400"
                        fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                      {benefit}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
