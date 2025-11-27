'use client'

import React from 'react'
import { ArrowRight } from 'lucide-react'

interface PageHeroProps {
  title: string
  subtitle: string
  primaryCta: {
    label: string
    action: () => void
    loading?: boolean
  }
  secondaryCta?: {
    label: string
    href?: string
    action?: () => void
  }
  accentColor?: 'blue' | 'purple' | 'green' | 'orange'
  tagline?: string
  backgroundVariant?: 'gradient' | 'dots' | 'grid'
}

export default function PageHero({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
  accentColor = 'blue',
  tagline,
  backgroundVariant = 'gradient',
}: PageHeroProps) {
  const accentClasses = {
    blue: {
      gradient: 'from-blue-600 to-blue-500',
      text: 'text-blue-600',
      button: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600',
    },
    purple: {
      gradient: 'from-purple-600 to-purple-500',
      text: 'text-purple-600',
      button: 'bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600',
    },
    green: {
      gradient: 'from-green-600 to-green-500',
      text: 'text-green-600',
      button: 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600',
    },
    orange: {
      gradient: 'from-orange-600 to-orange-500',
      text: 'text-orange-600',
      button: 'bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600',
    },
  }

  const accent = accentClasses[accentColor]

  return (
    <section className="relative overflow-hidden pt-20 pb-20 sm:pt-32 sm:pb-32 lg:pt-40 lg:pb-40">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        {backgroundVariant === 'gradient' && (
          <>
            <div className={`absolute top-0 right-0 w-96 h-96 bg-gradient-to-br ${accent.gradient} rounded-full blur-3xl opacity-20 dark:opacity-10`} />
            <div className={`absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr ${accent.gradient} rounded-full blur-3xl opacity-20 dark:opacity-10`} />
          </>
        )}
        {backgroundVariant === 'dots' && (
          <div className="absolute inset-0 opacity-5 dark:opacity-10" style={{
            backgroundImage: `radial-gradient(circle, currentColor 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
        )}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8">
          {/* Tagline/Badge */}
          {tagline && (
            <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-gradient-to-r ${accent.gradient} bg-opacity-10 dark:bg-opacity-5 border border-gray-300 dark:border-gray-700`}>
              <span className={`w-2 h-2 rounded-full ${accent.text}`} />
              <span className={`text-sm font-medium ${accent.text}`}>
                {tagline}
              </span>
            </div>
          )}

          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              {title}
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={primaryCta.action}
              disabled={primaryCta.loading}
              className={`px-8 py-3 rounded-lg ${accent.button} text-white font-semibold transition-all duration-200 flex items-center space-x-2 group disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg`}
            >
              <span>{primaryCta.label}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            {secondaryCta && (
              <a
                href={secondaryCta.href || '#'}
                onClick={(e) => {
                  if (secondaryCta.action) {
                    e.preventDefault()
                    secondaryCta.action()
                  }
                }}
                className="px-8 py-3 rounded-lg border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {secondaryCta.label}
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
