'use client'

import { useEffect } from 'react'
import { Zap, TrendingDown, AlertCircle, Radio } from 'lucide-react'
import { analytics } from '@/utils/analytics'

interface DiagnosticPattern {
  icon: React.ReactNode
  title: string
  description: string
  technicalDetails: string[]
  severity: 'critical' | 'warning' | 'info'
}

interface EngineHealthDiagnosticsProps {
  product: string
  patterns?: DiagnosticPattern[]
}

export default function EngineHealthDiagnostics({
  product,
  patterns = defaultPatterns,
}: EngineHealthDiagnosticsProps) {
  useEffect(() => {
    // Track when Engine Health section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('engine_health_diagnostics_viewed', {
            product,
            section: 'engine_health',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [product])

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'border-l-4 border-red-500 bg-red-50 dark:bg-red-900/20'
      case 'warning':
        return 'border-l-4 border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20'
      default:
        return 'border-l-4 border-blue-500 bg-blue-50 dark:bg-blue-900/20'
    }
  }

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
      default:
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
    }
  }

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Engine Health Diagnostics
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Advanced acoustic pattern recognition for comprehensive engine analysis
          </p>
        </div>

        {/* Diagnostic Patterns - 2 Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {patterns.map((pattern, index) => (
            <div
              key={index}
              className={`rounded-lg p-8 ${getSeverityColor(pattern.severity)}`}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-start space-x-4">
                  <div className="text-2xl mt-1">{pattern.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {pattern.title}
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300 mt-1">
                      {pattern.description}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${getSeverityBadgeColor(
                    pattern.severity
                  )}`}
                >
                  {pattern.severity.charAt(0).toUpperCase() +
                    pattern.severity.slice(1)}
                </span>
              </div>

              {/* Technical Details */}
              <div className="mt-6 bg-white/40 dark:bg-black/20 rounded-lg p-4">
                <p className="text-xs font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                  Technical Analysis
                </p>
                <ul className="space-y-2">
                  {pattern.technicalDetails.map((detail, idx) => (
                    <li key={idx} className="text-sm text-gray-700 dark:text-gray-300 flex items-start space-x-2">
                      <span className="text-orange-600 dark:text-orange-400 font-bold mt-0.5">
                        ▸
                      </span>
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
        {/* End Grid */}

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-2">
                Real-Time Acoustic Analysis
              </h3>
              <p className="text-sm text-blue-800 dark:text-blue-300">
                All diagnostic patterns are detected in real-time using advanced signal processing and machine learning models trained on the world&apos;s largest non-OEM acoustic dataset. Results are available immediately for instant diagnostics and preventive action.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

const defaultPatterns: DiagnosticPattern[] = [
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Misfire Pattern Analysis',
    description: 'Detects cylinders experiencing misfires through characteristic combustion timing variations',
    technicalDetails: [
      'Frequency signature: 0.5-2 kHz band with irregular periodicity',
      'Acoustic amplitude deviation > 15% from baseline',
      'Cross-cylinder phase analysis identifies affected cylinders',
      'Real-time detection with < 100ms latency',
    ],
    severity: 'critical',
  },
  {
    icon: <Radio className="w-6 h-6" />,
    title: 'Knock Detection',
    description: 'Identifies pre-ignition and detonation events before engine damage',
    technicalDetails: [
      'High-frequency broadband noise (5-10 kHz) from rapid pressure waves',
      'Peak pressure rises detected in < 1ms windows',
      'Knock intensity scoring (0-100) for severity assessment',
      'Prevents timing advance errors and fuel quality issues',
    ],
    severity: 'critical',
  },
  {
    icon: <TrendingDown className="w-6 h-6" />,
    title: 'Idle Instability Pattern Recognition',
    description: 'Monitors combustion consistency during idle operation',
    technicalDetails: [
      'RPM variation ±50 from target indicates instability',
      'Acoustic irregularity coefficient tracks combustion smoothness',
      'Idle quality score (0-100) reflects engine smoothness',
      'Identifies fuel injector, ignition, or vacuum system issues',
    ],
    severity: 'warning',
  },
  {
    icon: <Zap className="w-6 h-6" />,
    title: 'Cylinder Imbalance Acoustics',
    description: 'Detects power delivery variations between cylinders',
    technicalDetails: [
      'Acoustic power spectrum per cylinder analyzed independently',
      'Imbalance threshold: > 20% power deviation from average',
      'Identifies compression loss, valve issues, or fuel distribution problems',
      'Trend analysis predicts failures 100-500 operating hours ahead',
    ],
    severity: 'warning',
  },
  {
    icon: <Radio className="w-6 h-6" />,
    title: 'Exhaust Flow Anomaly Acoustics',
    description: 'Analyzes exhaust system integrity and flow characteristics',
    technicalDetails: [
      'Exhaust resonance signature: 300-800 Hz fundamental frequency',
      'Backpressure variations detected through acoustic impedance changes',
      'Identifies: restricted filters, pipe leaks, catalyst degradation',
      'Prevents efficiency loss and emissions violations',
    ],
    severity: 'info',
  },
]
