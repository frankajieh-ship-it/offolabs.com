'use client'

import { useEffect } from 'react'
import { Mic2, Zap, CheckCircle } from 'lucide-react'

export default function HowItWorksAcoustic() {
  useEffect(() => {
    // Track when How It Works section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'engine_ai_how_it_works_viewed', {
              product: 'engine-acoustic-ai',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section#how-it-works')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])
  const steps = [
    {
      icon: <Mic2 className="w-8 h-8" />,
      number: '01',
      title: 'Record Sound or Vibration',
      description: 'Use a phone microphone or external sensor to capture 3–8 seconds of audio from your engine, rotating system, or generator set. No special equipment needed.',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      number: '02',
      title: 'Upload and Analyze',
      description: 'Our AI transforms the acoustic waveform into a diagnostic profile using harmonic mapping, frequency-domain analysis, and advanced anomaly detection algorithms.',
    },
    {
      icon: <CheckCircle className="w-8 h-8" />,
      number: '03',
      title: 'Get Actionable Suggestions',
      description: 'Engine Acoustic AI identifies the highest-likelihood issue and provides a confidence score. From belt slip to bearing failure, pulley misalignment to engine knock.',
    },
  ]

  const diagnosticModes = [
    'Belt slip detection',
    'Tension imbalance identification',
    'Pulley wobble & misalignment',
    'Failing tensioner diagnosis',
    'Worn bearing detection',
    'Engine misfire patterns',
    'Knock event analysis',
    'Genset load instability',
  ]

  return (
    <section id="how-it-works" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            How It Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            From sound clip to actionable diagnosis in seconds
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-12 left-[60%] w-[calc(100%+2rem)] h-0.5 bg-gradient-to-r from-orange-500 to-transparent" />
              )}

              {/* Card */}
              <div className="relative p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 mb-4">
                  {step.icon}
                </div>

                {/* Content */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Diagnostic Capabilities */}
        <div className="bg-white dark:bg-gray-800/50 rounded-xl border border-gray-200 dark:border-gray-800 p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Diagnostic Capabilities
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Engine Acoustic AI can identify and diagnose:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {diagnosticModes.map((mode, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="w-5 h-5 rounded-full bg-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 dark:text-gray-300">{mode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
