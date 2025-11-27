import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import ProductCard from '@/components/common/ProductCard'
import { PRODUCTS } from '@/lib/constants'

export const metadata = {
  title: 'Products - OFFO Labs',
  description: 'Explore our portfolio of AI-powered solutions designed to transform industries',
}

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Our Products
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400">
              Powerful AI-driven solutions designed to transform industries and unlock innovation. From gaming and design to industrial maintenance and enterprise automation.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {PRODUCTS.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
            Can&apos;t find what you&apos;re looking for?
          </h2>

          <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
            Get in touch with our team to learn more about how OFFO Labs can help your organization innovate and grow.
          </p>

          <button className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
            Contact Sales
          </button>
        </div>
      </div>
    </div>
  )
}
