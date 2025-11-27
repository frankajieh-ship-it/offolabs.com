import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

const statusColors = {
  'Available': 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 border-green-300 dark:border-green-700',
  'In Development': 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 border-blue-300 dark:border-blue-700',
  'Coming Soon': 'bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 border-amber-300 dark:border-amber-700'
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={product.href}>
      <div className="group h-full cursor-pointer rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/50 p-8 transition-all duration-300 hover:shadow-offo-lg hover:border-primary-300 dark:hover:border-primary-700 relative overflow-hidden">
        {/* OFFO Brand Gradient Background (Hover) */}
        <div className="absolute inset-0 bg-gradient-offo-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
        {/* Header */}
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
              {product.title}
            </h3>
          </div>
          <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-all transform group-hover:translate-x-1" />
        </div>

        {/* Description */}
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6 line-clamp-2">
          {product.description}
        </p>

        {/* Status Badge */}
        <div className="mb-6">
          <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[product.status]}`}>
            {product.status}
          </span>
        </div>

        {/* Features (if available) */}
        {product.features && product.features.length > 0 && (
          <ul className="space-y-2 mb-6">
            {product.features.slice(0, 3).map((feature, idx) => (
              <li key={idx} className="flex items-start space-x-2 text-xs text-gray-600 dark:text-gray-400">
                <span className="mt-1 block w-1.5 h-1.5 rounded-full bg-primary-600 dark:bg-primary-400 flex-shrink-0" />
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        {/* CTA */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-800 text-sm font-semibold text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300 transition-colors">
          Explore Product →
        </div>
      </div>
    </Link>
  )
}
