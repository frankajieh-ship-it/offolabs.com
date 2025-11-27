import type { ReactNode } from 'react'
import { ChevronRight } from 'lucide-react'
import Link from 'next/link'

interface ProductPageLayoutProps {
  children: ReactNode
  productName: string
  productSlug: string
  breadcrumbs?: Array<{ label: string; href: string }>
}

export default function ProductPageLayout({
  children,
  productName,
  productSlug,
  breadcrumbs = []
}: ProductPageLayoutProps) {
  // Default breadcrumbs if not provided
  const defaultBreadcrumbs = [
    { label: 'Home', href: '/' },
    { label: 'Products', href: '/products' },
    { label: productName, href: `/products/${productSlug}` }
  ]

  const finalBreadcrumbs = breadcrumbs.length > 0 ? breadcrumbs : defaultBreadcrumbs

  return (
    <div className="w-full">
      {/* Breadcrumbs */}
      <div className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            {finalBreadcrumbs.map((breadcrumb, index) => (
              <div key={breadcrumb.href} className="flex items-center space-x-2">
                {index > 0 && (
                  <ChevronRight className="w-4 h-4 text-gray-400 dark:text-gray-600" />
                )}
                <Link
                  href={breadcrumb.href}
                  className={`transition-colors ${
                    index === finalBreadcrumbs.length - 1
                      ? 'text-gray-900 dark:text-white font-semibold'
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  {breadcrumb.label}
                </Link>
              </div>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </div>
  )
}