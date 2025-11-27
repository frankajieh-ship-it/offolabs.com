'use client'

import { useEffect } from 'react'
import { Upload, Sparkles, Eye, Download } from 'lucide-react'
import { analytics } from '@/utils/analytics'

export default function HowItWorks() {
  useEffect(() => {
    // Track when How It Works section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('renov_ai_how_it_works_viewed', {
            product: 'renov-ai',
            section: 'how_it_works',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      number: '01',
      title: 'Upload Your Space',
      description: 'Take a photo of your room or upload an existing image. Our AI analyzes the current layout and design.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      number: '02',
      title: 'AI Generates Designs',
      description: 'Choose your preferred style and let our AI generate multiple design options instantly.',
    },
    {
      icon: <Eye className="w-8 h-8" />,
      number: '03',
      title: 'Visualize & Customize',
      description: 'Preview realistic 3D renderings and customize colors, furniture, and decorations to your taste.',
    },
    {
      icon: <Download className="w-8 h-8" />,
      number: '04',
      title: 'Export & Share',
      description: 'Download high-resolution designs, shopping lists, and share with family or contractors.',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            How Renov.AI Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your space in just 4 simple steps
          </p>
        </div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-[calc(100%+2rem)] h-0.5 bg-gradient-to-r from-purple-600 to-transparent" />
              )}

              {/* Card */}
              <div className="relative p-6 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:shadow-lg transition-shadow">
                {/* Step Number */}
                <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-lg">
                  {step.number}
                </div>

                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400 mb-4">
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
      </div>
    </section>
  )
}
