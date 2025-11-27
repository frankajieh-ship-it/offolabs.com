import React from 'react'
import type { ReactNode } from 'react'

export interface FeatureBlockProps {
  title: string
  description: string
  tag?: string
  icon?: ReactNode
}

export default function FeatureBlock({
  title,
  description,
  tag,
  icon
}: FeatureBlockProps) {
  return (
    <div className="group relative rounded-lg border border-gray-200 dark:border-gray-800
      bg-white dark:bg-gray-900/50 p-8 transition-all duration-300
      hover:shadow-offo-lg hover:border-primary-300 dark:hover:border-primary-700
      overflow-hidden">

      {/* OFFO Brand Gradient Background (Hover) */}
      <div className="absolute inset-0 bg-gradient-offo-accent
        opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />

      {/* Icon (if provided) */}
      {icon && (
        <div className="mb-4 text-primary-600 dark:text-primary-400
          group-hover:scale-110 transition-transform">
          {icon}
        </div>
      )}

      {/* Tag (if provided) */}
      {tag && (
        <div className="mb-3">
          <span className="inline-block px-3 py-1 rounded-full text-xs
            font-semibold bg-primary-100 dark:bg-primary-900/30
            text-primary-700 dark:text-primary-300
            border border-primary-300 dark:border-primary-700">
            {tag}
          </span>
        </div>
      )}

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-900 dark:text-white
        mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400
        transition-colors">
        {title}
      </h3>

      {/* Description */}
      <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
        {description}
      </p>
    </div>
  )
}
