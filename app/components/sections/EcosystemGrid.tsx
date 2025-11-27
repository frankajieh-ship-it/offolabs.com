import ProductCard from '@/components/common/ProductCard'
import { PRODUCTS } from '@/lib/constants'

export default function EcosystemGrid() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50" id="ecosystem">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Our Product Ecosystem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Powerful AI-driven solutions designed to transform industries and unlock innovation
          </p>
        </div>

        {/* Product Grid - 2x2 on desktop, 1 column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Want to stay updated on our latest product releases?
          </p>
          <button className="inline-block px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Subscribe to Updates
          </button>
        </div>
      </div>
    </section>
  )
}