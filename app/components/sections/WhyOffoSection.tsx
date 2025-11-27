import {
  Zap,
  ShoppingCart,
  Wrench,
  Bot
} from 'lucide-react'
import { OFFO_PILLARS } from '@/lib/constants'

const iconMap = {
  'Zap': <Zap className="w-8 h-8" />,
  'ShoppingCart': <ShoppingCart className="w-8 h-8" />,
  'Wrench': <Wrench className="w-8 h-8" />,
  'Bot': <Bot className="w-8 h-8" />
}

export default function WhyOffoSection() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Why OFFO?
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Our ecosystem spans four core pillars of AI innovation
          </p>
        </div>

        {/* Pillars Grid - 4 columns on desktop, 2 on tablet, 1 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {OFFO_PILLARS.map((pillar) => (
            <div
              key={pillar.id}
              className="group relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-primary-600 dark:text-primary-400 mb-4 group-hover:scale-110 transition-transform">
                {iconMap[pillar.icon as keyof typeof iconMap]}
              </div>

              {/* Title */}
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3">
                {pillar.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {pillar.description}
              </p>

              {/* Hover accent */}
              <div className="absolute inset-0 rounded-lg bg-gradient-to-br from-primary-500/0 to-primary-500/0 group-hover:from-primary-500/5 group-hover:to-primary-500/5 pointer-events-none transition-all" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}