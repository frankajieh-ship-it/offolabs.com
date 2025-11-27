import { CheckCircle2, XCircle } from 'lucide-react'

interface ComparisonFeature {
  feature: string
  oem: boolean
  engineAcousticAI: boolean
}

export default function DiagnosticComparison() {
  const features: ComparisonFeature[] = [
    {
      feature: 'Covers All Makes & Models',
      oem: false,
      engineAcousticAI: true
    },
    {
      feature: 'Works With Aftermarket Modifications',
      oem: false,
      engineAcousticAI: true
    },
    {
      feature: 'Real-Time Acoustic Analysis',
      oem: false,
      engineAcousticAI: true
    },
    {
      feature: 'Predictive Failure Detection',
      oem: true,
      engineAcousticAI: true
    },
    {
      feature: 'Non-Invasive Diagnostics',
      oem: true,
      engineAcousticAI: true
    },
    {
      feature: 'Continuous Learning & Updates',
      oem: false,
      engineAcousticAI: true
    },
    {
      feature: 'Works Offline',
      oem: true,
      engineAcousticAI: true
    },
    {
      feature: 'Detailed Root Cause Analysis',
      oem: false,
      engineAcousticAI: true
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
            text-gray-900 dark:text-white">
            Engine Acoustic AI vs. Traditional OEM Tools
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            How Engine Acoustic AI outperforms conventional diagnostic methods
          </p>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-gray-200 dark:border-gray-800">
                <th className="text-left py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  Feature
                </th>
                <th className="text-center py-4 px-6 font-semibold text-gray-900 dark:text-white">
                  <div className="text-sm lg:text-base">
                    Traditional OEM Tools
                  </div>
                </th>
                <th className="text-center py-4 px-6 font-semibold bg-orange-50 dark:bg-orange-900/20 text-orange-700 dark:text-orange-300">
                  <div className="text-sm lg:text-base">
                    Engine Acoustic AI
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {features.map((item, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                >
                  <td className="py-4 px-6 text-gray-900 dark:text-white font-medium">
                    {item.feature}
                  </td>
                  <td className="py-4 px-6 text-center">
                    {item.oem ? (
                      <div className="flex justify-center">
                        <CheckCircle2 className="w-5 h-5 text-green-600 dark:text-green-400" />
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <XCircle className="w-5 h-5 text-gray-400 dark:text-gray-600" />
                      </div>
                    )}
                  </td>
                  <td className="py-4 px-6 text-center bg-orange-50 dark:bg-orange-900/10">
                    <div className="flex justify-center">
                      <CheckCircle2 className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Summary Box */}
        <div className="mt-12 p-8 rounded-lg border border-orange-300 dark:border-orange-700
          bg-orange-50 dark:bg-orange-900/20">
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
            The Engine Acoustic AI Advantage
          </h3>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            While OEM diagnostic tools are excellent for manufacturer-specific systems, they&apos;re limited to
            vehicles and equipment they were designed for. Engine Acoustic AI operates independently, learning
            from the world&apos;s largest non-OEM acoustic database. This means it works across makes, models,
            aftermarket modifications, and industrial equipment—providing diagnostics where OEM tools cannot.
          </p>
        </div>
      </div>
    </section>
  )
}
