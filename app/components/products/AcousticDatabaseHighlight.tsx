import { Database, TrendingUp, AlertCircle } from 'lucide-react'

interface DatabaseCategory {
  name: string
  description: string
  icon: React.ReactNode
}

export default function AcousticDatabaseHighlight() {
  const categories: DatabaseCategory[] = [
    {
      name: 'Passenger Vehicles',
      description: 'Sedan, SUV, hatchback, and crossover acoustic signatures',
      icon: <AlertCircle className="w-6 h-6" />
    },
    {
      name: 'Heavy-Duty Trucks',
      description: 'Commercial vehicle engine and drivetrain diagnostics',
      icon: <TrendingUp className="w-6 h-6" />
    },
    {
      name: 'Motorcycles',
      description: 'High-RPM engine acoustic patterns and anomalies',
      icon: <AlertCircle className="w-6 h-6" />
    },
    {
      name: 'Machinery & Equipment',
      description: 'Industrial machines, compressors, and rotating systems',
      icon: <Database className="w-6 h-6" />
    },
    {
      name: 'Generator Sets',
      description: 'Stationary and portable generator acoustic baselines',
      icon: <TrendingUp className="w-6 h-6" />
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-950/20 dark:to-orange-900/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full
            bg-orange-100 dark:bg-orange-900/40 border border-orange-300 dark:border-orange-700">
            <Database className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span className="text-sm font-semibold text-orange-700 dark:text-orange-300">
              Industry Advantage
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
            text-gray-900 dark:text-white">
            World&apos;s Largest Non-OEM Acoustic Database
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Engine Acoustic AI is actively building the world&apos;s largest non-OEM acoustic dataset.
            This comprehensive foundation powers more accurate diagnostics than OEM tools that only
            cover manufacturer-specific ranges.
          </p>
        </div>

        {/* Database Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-12">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group p-6 rounded-lg border border-orange-200 dark:border-orange-800
                bg-white dark:bg-gray-900/50 hover:shadow-lg transition-all duration-300
                hover:border-orange-400 dark:hover:border-orange-600"
            >
              {/* Icon */}
              <div className="w-10 h-10 rounded-lg bg-orange-100 dark:bg-orange-900/30
                flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4
                group-hover:scale-110 transition-transform">
                {category.icon}
              </div>

              {/* Content */}
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2 text-sm lg:text-base">
                {category.name}
              </h3>
              <p className="text-xs lg:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {category.description}
              </p>
            </div>
          ))}
        </div>

        {/* Key Advantage Box */}
        <div className="p-8 rounded-lg border border-orange-300 dark:border-orange-700
          bg-orange-100/50 dark:bg-orange-900/20 backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                stat: '5+ Categories',
                detail: 'Passenger vehicles, trucks, motorcycles, machinery, generators'
              },
              {
                stat: 'Continuous Growth',
                detail: 'Adding thousands of new acoustic signatures monthly'
              },
              {
                stat: 'Beyond OEM Coverage',
                detail: 'Covers aftermarket, modified, and non-standard configurations'
              }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-orange-700 dark:text-orange-300 mb-2">
                  {item.stat}
                </div>
                <p className="text-sm text-orange-600 dark:text-orange-400">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-12 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            <span className="font-semibold text-gray-900 dark:text-white">Why This Matters:</span> OEM
            diagnostic tools are limited to vehicles and equipment they designed and sold. Engine Acoustic AI&apos;s
            independent dataset captures real-world acoustic patterns across all makes, models, and configurations,
            delivering diagnostics that work in the real world.
          </p>
        </div>
      </div>
    </section>
  )
}
