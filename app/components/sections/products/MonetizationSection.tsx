import { Shield, Award } from 'lucide-react'

interface FairPlayPromise {
  icon: React.ReactNode
  title: string
  description: string
}

export default function MonetizationSection() {
  const promises: FairPlayPromise[] = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Free to Play',
      description: 'Full access to all gameplay features without spending a dime.'
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: 'Cosmetic-Only Purchases',
      description: 'No pay-to-win. Spend only on cosmetics — skins, themes, and effects have zero gameplay impact.'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Skill Determines Your Rank',
      description: 'Your position on the leaderboard depends purely on coding ability, not spending.'
    }
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Monetization & Fair Play
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Play fair. Progress through skill.
          </p>
        </div>

        {/* Fair Play Promises */}
        <div className="space-y-6">
          {promises.map((promise) => (
            <div
              key={promise.title}
              className="flex gap-4 p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50 hover:bg-white dark:hover:bg-gray-800 transition-colors"
            >
              {/* Icon */}
              <div className="flex-shrink-0 text-primary-600 dark:text-primary-400">
                {promise.icon}
              </div>

              {/* Content */}
              <div className="flex-grow space-y-1">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {promise.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {promise.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 rounded-lg bg-primary-50 dark:bg-primary-900/20 border border-primary-200 dark:border-primary-800">
          <p className="text-center text-gray-900 dark:text-gray-100">
            <strong>Our Promise:</strong> We&apos;re committed to keeping CodeCrack fair and balanced. Monetization may evolve, but these principles will never change.
          </p>
        </div>
      </div>
    </section>
  )
}
