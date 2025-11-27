import React from 'react'
import { Eye, Zap, Palette, Lock } from 'lucide-react'

export default function RenovFeatures() {
  const features = [
    {
      title: 'AR Preview',
      description: 'See designs in augmented reality before you buy anything.',
      icon: <Eye className="w-8 h-8" />,
      color: 'from-purple-600 to-purple-500',
    },
    {
      title: 'Budget-Friendly Options',
      description: 'AI suggests items at multiple price points to fit your budget.',
      icon: <Zap className="w-8 h-8" />,
      color: 'from-pink-600 to-pink-500',
    },
    {
      title: 'Style Recommendations',
      description: 'Choose from minimalist, modern, cozy, luxury, and more styles.',
      icon: <Palette className="w-8 h-8" />,
      color: 'from-blue-600 to-blue-500',
    },
    {
      title: 'Secure & Private',
      description: 'Your photos and designs are encrypted and never shared.',
      icon: <Lock className="w-8 h-8" />,
      color: 'from-green-600 to-green-500',
    },
  ]

  return (
    <section id="features" className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Everything you need to redesign your space
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl p-8 border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
            >
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

              <div className="relative z-10">
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
