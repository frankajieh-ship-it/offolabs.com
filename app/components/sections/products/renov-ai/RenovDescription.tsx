'use client'

import React, { useEffect } from 'react'
import { Upload, Wand2, ShoppingBag, Sparkles } from 'lucide-react'
import { analytics } from '@/utils/analytics'

export default function RenovDescription() {
  useEffect(() => {
    // Track when How It Works section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('renov_ai_how_it_works_viewed', {
            product: 'renov-ai',
            section: 'description',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.getElementById('how-it-works')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])
  const steps = [
    {
      icon: <Upload className="w-8 h-8" />,
      title: 'Upload Your Photo',
      description: 'Snap a photo of your room or upload from your gallery.',
    },
    {
      icon: <Wand2 className="w-8 h-8" />,
      title: 'AI Designs Your Space',
      description: 'Our AI generates multiple design options in seconds.',
    },
    {
      icon: <ShoppingBag className="w-8 h-8" />,
      title: 'Shop the Look',
      description: 'Find and purchase exact or similar items shown in the design.',
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: 'Transform Your Room',
      description: 'See your room transform with real products you can buy.',
    },
  ]

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How Renov.AI Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            Transform your space in 4 simple steps. From photo to purchase, we handle the design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection line (hidden on mobile) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-16 left-[calc(100%_+_12px)] w-[calc(100%_-_24px)] h-1 bg-gradient-to-r from-purple-600 to-transparent" />
              )}

              <div className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-500 dark:hover:border-purple-600 hover:shadow-lg transition-all relative z-10">
                <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 text-purple-600 dark:text-purple-400">
                  {step.icon}
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
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
