import {
  Calendar,
  Zap,
  Trophy,
  Palette
} from 'lucide-react'
import FeatureBlock from '@/components/products/FeatureBlock'

interface Feature {
  title: string
  description: string
  tag?: string
  icon: React.ReactNode
}

const CODECRACK_FEATURES: Feature[] = [
  {
    title: 'Daily Duel',
    tag: 'Coming Soon',
    description: 'One puzzle per day. Same secret code for everyone. Compare how efficiently you solved it vs the community and the AI.',
    icon: <Calendar className="w-8 h-8" />
  },
  {
    title: 'AI Duel',
    description: 'Head-to-head vs an adaptive AI opponent. Same puzzle, alternating guesses, see who cracks it first.',
    icon: <Zap className="w-8 h-8" />
  },
  {
    title: 'Ranked Ladder & Seasons',
    description: 'Climb through divisions in seasonal ladders. Your rating reflects your logic efficiency: fewer guesses, smarter deductions.',
    icon: <Trophy className="w-8 h-8" />
  },
  {
    title: 'Cosmetics & Themes',
    description: 'Unlock board themes, animations, and sound packs that make each crack feel satisfying — without pay-to-win.',
    icon: <Palette className="w-8 h-8" />
  }
]

export default function FeatureBlocks() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold
            text-gray-900 dark:text-white">
            Core Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to become a master code-breaker
          </p>
        </div>

        {/* Feature Grid - 2x2 on desktop, stacked on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {CODECRACK_FEATURES.map((feature, index) => (
            <FeatureBlock
              key={index}
              title={feature.title}
              description={feature.description}
              tag={feature.tag}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
