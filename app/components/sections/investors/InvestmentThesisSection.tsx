import { TrendingUp, Users, Zap } from 'lucide-react'

export default function InvestmentThesisSection() {
  const theses = [
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: 'Multi-Product, Multi-Vertical Platform',
      description:
        'OFFO Labs is building a portfolio of AI products, each addressing specific needs across different industries. This diversification creates multiple revenue streams and reduces dependency on any single product or market.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Real Customers, Real Revenue',
      description:
        'Unlike many AI startups, OFFO Labs products are production-ready and solving problems for real customers. Our initial traction validates market demand and demonstrates product-market fit.',
      color: 'from-green-600 to-green-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Operational Excellence',
      description:
        'Our engineering team is committed to code quality, scalability, and zero technical debt. This operational rigor ensures our products can scale efficiently as we grow and take on larger customers.',
      color: 'from-purple-600 to-purple-500',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-gray-50 dark:bg-gray-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            The Investment Thesis
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            Why OFFO Labs represents a compelling investment opportunity in the AI market.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {theses.map((thesis, index) => (
            <div
              key={index}
              className="group relative rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 hover:shadow-lg transition-all duration-300"
            >
              <div
                className={`w-14 h-14 rounded-lg bg-gradient-to-br ${thesis.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform`}
              >
                {thesis.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                {thesis.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                {thesis.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
