'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  subtitle: string
  breadcrumb?: Breadcrumb[]
}

export default function PageHeader({ title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <div className="bg-gradient-to-r from-offo-navy to-offo-blue">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        {breadcrumb && breadcrumb.length > 0 && (
          <nav className="mb-6" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2 text-sm">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && (
                    <ChevronRight className="h-4 w-4 text-white/60 mx-2" />
                  )}
                  {item.href ? (
                    <Link
                      href={item.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-white">{item.label}</span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
        )}

        {/* Title and Subtitle */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl">
            {subtitle}
          </p>
        </motion.div>
      </div>
    </div>
  )
}
