import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Check } from 'lucide-react'
import { PRODUCTS } from '@/lib/constants'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = PRODUCTS.find(p => p.id === params.slug)

  if (!product) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Header */}
      <div className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Link href="/#ecosystem" className="inline-flex items-center space-x-2 text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 mb-6">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Products</span>
          </Link>
        </div>
      </div>

      {/* Hero */}
      <div className="bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Status Badge */}
            <div className="mb-6">
              <span className={`inline-block px-4 py-2 rounded-full text-sm font-semibold border
                ${product.status === 'Available' ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700' :
                product.status === 'In Development' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700' :
                'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700'}`}>
                {product.status}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              {product.title}
            </h1>

            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
              {product.description}
            </p>

            {product.status === 'Available' ? (
              <button className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
                Get Started Now
              </button>
            ) : (
              <button className="px-8 py-3 rounded-lg border-2 border-primary-600 text-primary-600 dark:text-primary-400 font-semibold hover:bg-primary-50 dark:hover:bg-primary-900/20 transition-colors">
                Join Waitlist
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Features Section */}
      {product.features && product.features.length > 0 && (
        <div className="py-16 sm:py-24 lg:py-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-12">
                Key Features
              </h2>

              <div className="space-y-6">
                {product.features.map((feature, idx) => (
                  <div key={idx} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary-100 dark:bg-primary-900/30">
                        <Check className="h-5 w-5 text-primary-600 dark:text-primary-400" />
                      </div>
                    </div>
                    <div>
                      <p className="text-lg text-gray-900 dark:text-white font-medium">
                        {feature}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Description Section */}
      <div className="bg-gray-50 dark:bg-gray-900/50 py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              About {product.title}
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed mb-8">
              {product.fullDescription || `${product.title} is one of OFFO Labs' innovative AI-powered solutions, designed to address critical challenges in the market. Built on cutting-edge machine learning and years of industry expertise, this product delivers measurable value to organizations seeking to improve their operations and unlock new opportunities.`}
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                Why Choose {product.title}?
              </h3>

              <ul className="space-y-4">
                {[
                  'Industry-leading AI and machine learning capabilities',
                  'Proven results and case studies from real-world deployments',
                  'Seamless integration with existing systems and workflows',
                  'Dedicated support and continuous product improvements'
                ].map((item, idx) => (
                  <li key={idx} className="flex items-start space-x-3">
                    <Check className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 dark:text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-8">
              Ready to get started?
            </h2>

            <p className="text-lg text-gray-600 dark:text-gray-400 mb-8">
              Join forward-thinking organizations using {product.title} to transform their operations and drive innovation.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {product.status === 'Available' ? (
                <>
                  <button className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
                    Request Demo
                  </button>
                  <button className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    View Pricing
                  </button>
                </>
              ) : (
                <>
                  <button className="px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors">
                    Join Waitlist
                  </button>
                  <button className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white font-semibold hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    Contact Sales
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.id,
  }))
}
