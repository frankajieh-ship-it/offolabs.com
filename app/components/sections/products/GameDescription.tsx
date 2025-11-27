import React from 'react'
import { Code2, Zap, Trophy, Users } from 'lucide-react'

export default function GameDescription() {
  const highlights = [
    {
      icon: <Code2 className="w-6 h-6" />,
      title: 'Learn Real Coding',
      description: 'Master Python, JavaScript, and more through interactive challenges that teach actual programming concepts.',
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: 'Instant Feedback',
      description: 'Get immediate feedback on your code with detailed explanations of errors and optimization tips.',
    },
    {
      icon: <Trophy className="w-6 h-6" />,
      title: 'Earn Rewards',
      description: 'Complete challenges to earn badges, coins, and unlock exclusive content and achievements.',
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: 'Compete & Collaborate',
      description: 'Join multiplayer duels, form teams, and climb the global leaderboard to prove your coding skills.',
    },
  ]

  return (
    <section id="description" className="py-20 lg:py-28 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            How CodeCrack Works
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl">
            CodeCrack combines game mechanics with real programming education. Start with simple challenges and progress to complex real-world problems. Learn by doing, get instant feedback, and have fun while becoming a better developer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {highlights.map((item, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-600 hover:shadow-lg transition-all"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mb-4 text-blue-600 dark:text-blue-400">
                {item.icon}
              </div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
