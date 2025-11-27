import { Database, Zap, Shield, TrendingUp } from 'lucide-react'

export default function DatasetsAndCapabilities() {
  const capabilities = [
    {
      icon: <Database className="w-8 h-8" />,
      title: 'Largest Non-OEM Acoustic Dataset',
      description: 'Trained on 500K+ hours of acoustic recordings from real-world rotating systems, vehicles, and generator sets. Our dataset represents the broadest spectrum of mechanical failures in industry.',
      stats: '500K+ hours of acoustic data',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Real-Time Anomaly Detection',
      description: 'Harmonic mapping, frequency-domain analysis, and deep learning models detect deviations from normal operation in milliseconds.',
      stats: '8-second diagnosis',
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Actionable Diagnostics',
      description: 'Not just anomaly detection—pinpoint the likely root cause: belt slip, bearing failure, pulley misalignment, engine knock, and more.',
      stats: '20+ failure modes identified',
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Predictive Health Scoring',
      description: 'Trend analysis shows degradation over time, enabling true preventive maintenance before catastrophic failure.',
      stats: 'Months of warning',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            World-Class Acoustic Intelligence
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Built on the largest non-OEM acoustic dataset in the world. Trained on 500K+ hours of real mechanical failures.
          </p>
        </div>

        {/* Capabilities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {capabilities.map((capability, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-xl border border-orange-200 dark:border-orange-900/30 bg-white dark:bg-gray-900/50 hover:shadow-lg hover:border-orange-400 dark:hover:border-orange-700 transition-all duration-300"
            >
              {/* Icon Container */}
              <div className="w-14 h-14 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4 group-hover:scale-110 transition-transform">
                {capability.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {capability.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                {capability.description}
              </p>

              {/* Stats Highlight */}
              <div className="pt-4 border-t border-orange-100 dark:border-orange-900/20">
                <p className="text-sm font-semibold text-orange-600 dark:text-orange-400">
                  {capability.stats}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Key Insight Box */}
        <div className="mt-16 p-8 rounded-xl bg-gradient-to-br from-orange-50 to-orange-100/50 dark:from-orange-900/20 dark:to-orange-800/10 border border-orange-200 dark:border-orange-900/30">
          <h3 className="text-xl font-bold text-orange-900 dark:text-orange-100 mb-3">
            Why Acoustic Data Matters
          </h3>
          <p className="text-orange-800 dark:text-orange-200 leading-relaxed">
            Sound and vibration patterns reveal mechanical health before other diagnostic methods. A failing bearing, belt slip, or engine misfire each produce unique acoustic signatures. Our AI learned these patterns from half a million hours of real-world data—making Engine Acoustic AI the most accurate non-OEM predictive diagnostic tool available.
          </p>
        </div>
      </div>
    </section>
  )
}
