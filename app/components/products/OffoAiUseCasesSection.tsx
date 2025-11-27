import { Zap, Lightbulb, Headphones, BarChart3 } from 'lucide-react'

interface UseCase {
  title: string
  description: string
  icon: React.ReactNode
  benefits: string[]
  color: string
}

export default function OffoAiUseCasesSection() {
  const useCases: UseCase[] = [
    {
      title: 'SME Workflow Automation',
      description: 'Replace 5–10 manual admin tasks with a single AI agent.',
      icon: <Zap className="w-8 h-8" />,
      benefits: [
        'Eliminate repetitive data entry',
        'Automate invoice processing',
        'Real-time task routing',
        'Reduce manual work by 80%'
      ],
      color: 'from-blue-600 to-blue-500'
    },
    {
      title: 'AI-Driven Product Advisory',
      description: 'Guidance for founders launching tech products, apps, or platforms.',
      icon: <Lightbulb className="w-8 h-8" />,
      benefits: [
        'Market analysis and insights',
        'Feature prioritization',
        'GTM strategy recommendations',
        'Competitive landscape analysis'
      ],
      color: 'from-amber-600 to-amber-500'
    },
    {
      title: 'Technical Documentation',
      description: 'Helps technical teams streamline documentation.',
      icon: <Zap className="w-8 h-8" />,
      benefits: [
        'Auto-generate API docs',
        'Create knowledge bases',
        'Real-time code documentation',
        'Multi-language support'
      ],
      color: 'from-purple-600 to-purple-500'
    },
    {
      title: 'Customer Support & CRM',
      description: 'Smart triage, routing, automated responses, ticket summaries.',
      icon: <Headphones className="w-8 h-8" />,
      benefits: [
        'Intelligent ticket triage',
        'Automated response generation',
        'Smart ticket routing',
        '60% faster resolution'
      ],
      color: 'from-green-600 to-green-500'
    },
    {
      title: 'Data Insights & Reporting',
      description: 'Automatic weekly reports across KPIs, sales, operations.',
      icon: <BarChart3 className="w-8 h-8" />,
      benefits: [
        'Auto-generated KPI reports',
        'Real-time sales analytics',
        'Predictive insights',
        'Executive dashboards'
      ],
      color: 'from-red-600 to-red-500'
    }
  ]

  const colorMap: { [key: string]: string } = {
    'from-blue-600 to-blue-500': 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-600 dark:text-blue-400',
    'from-amber-600 to-amber-500': 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
    'from-purple-600 to-purple-500': 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400',
    'from-green-600 to-green-500': 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
    'from-red-600 to-red-500': 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Real-World Use Cases
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how OFFO AI transforms workflows across different business functions and team sizes.
          </p>
        </div>

        {/* Use Cases Grid - 4 columns on desktop, responsive on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {useCases.map((useCase, index) => {
            const colors = colorMap[useCase.color]
            return (
              <div
                key={index}
                className={`p-6 rounded-lg border ${colors} hover:shadow-lg transition-all duration-300 group overflow-hidden relative`}
              >
                {/* Background Gradient Accent */}
                <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${useCase.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-lg ${colors} flex items-center justify-center ${colors.split(' ')[2]} mb-4 group-hover:scale-110 transition-transform`}>
                    {useCase.icon}
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                    {useCase.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
                    {useCase.description}
                  </p>

                  {/* Benefits List */}
                  <ul className="space-y-2">
                    {useCase.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-4 h-4 rounded-full bg-current opacity-60 flex-shrink-0 mt-1" />
                        <span className="text-xs text-gray-700 dark:text-gray-300">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        {/* Key Insight Box */}
        <div className="p-8 rounded-lg border border-primary-200 dark:border-primary-800 bg-primary-50 dark:bg-primary-900/10">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
            Why OFFO AI for Your Team
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Plug & Play Integration
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Deploy agents in minutes, not weeks. Connect to your existing tools and workflows seamlessly.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Works Across Industries
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                From SaaS startups to enterprise operations. Adapts to your unique business needs and scale.
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                Built for Developers
              </h4>
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Comprehensive APIs, webhooks, and extensible architecture. Control your agents completely.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
