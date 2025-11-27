import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface PageHeroProps {
  title: string
  subtitle: string
  description?: string
  badge?: {
    text: string
    color?: 'primary' | 'amber' | 'green'
  }
  ctaButtons?: Array<{
    label: string
    href: string
    variant: 'primary' | 'secondary'
  }>
  backgroundVariant?: 'gradient' | 'dots' | 'none'
}

const badgeColorMap = {
  primary: 'bg-primary-50 dark:bg-primary-900/30 border-primary-200 dark:border-primary-800 text-primary-600 dark:text-primary-400',
  amber: 'bg-amber-50 dark:bg-amber-900/30 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400',
  green: 'bg-green-50 dark:bg-green-900/30 border-green-200 dark:border-green-800 text-green-600 dark:text-green-400',
}

export default function PageHero({
  title,
  subtitle,
  description,
  badge,
  ctaButtons,
  backgroundVariant = 'gradient'
}: PageHeroProps) {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background Gradient (optional) */}
      {backgroundVariant === 'gradient' && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary-100 dark:bg-primary-900/20 rounded-full blur-3xl opacity-30" />
        </div>
      )}

      <div className="space-y-8">
        {/* Badge (optional) */}
        {badge && (
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full border ${badgeColorMap[badge.color || 'primary']}`}>
            <span className="w-2 h-2 rounded-full bg-current" />
            <span className="text-sm font-medium">
              {badge.text}
            </span>
          </div>
        )}

        {/* Main Content */}
        <div className="space-y-4">
          {/* Title */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
            {title}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl">
            {subtitle}
          </p>

          {/* Description (optional) */}
          {description && (
            <p className="text-base text-gray-600 dark:text-gray-400 max-w-3xl pt-2">
              {description}
            </p>
          )}
        </div>

        {/* CTA Buttons (optional) */}
        {ctaButtons && ctaButtons.length > 0 && (
          <div className="flex flex-col sm:flex-row items-start gap-4 pt-4">
            {ctaButtons.map((button, index) => (
              <Link key={index} href={button.href}>
                <button
                  className={`px-8 py-3 rounded-lg font-semibold transition-all flex items-center space-x-2 group ${
                    button.variant === 'primary'
                      ? 'bg-gradient-offo text-white hover:shadow-offo-lg'
                      : 'border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                >
                  <span>{button.label}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
