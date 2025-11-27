import { Palette, Zap, ShoppingCart, Lightbulb } from 'lucide-react'

export default function FeaturesSection() {
  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Multi-Room Detection',
      description: 'Analyze living rooms, bedrooms, kitchens, and more from a single interface. Get AI-powered design suggestions tailored to each room.',
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Style Presets',
      description: 'Choose from presets like modern, minimalist, Scandinavian, boho, and more. Instant design transformation at your fingertips.',
      color: 'from-pink-600 to-pink-500',
    },
    {
      icon: <ShoppingCart className="w-8 h-8" />,
      title: 'Export to Shopping List',
      description: 'Turn your design into a structured shopping list with prices, links, and item categories. Ready to buy what you designed.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Lightbulb className="w-8 h-8" />,
      title: 'Smart Recommendations',
      description: 'Get suggestions that respect your existing furniture, space constraints, and budget. AI that understands your limitations.',
      color: 'from-green-600 to-green-500',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Smart AI tools designed for professional and personal interior design projects
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-xl p-8 border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300"
            >
              {/* Gradient Background */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-br ${feature.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Text */}
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
