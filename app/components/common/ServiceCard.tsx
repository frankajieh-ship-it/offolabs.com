'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface ServiceCardProps {
  icon: ReactNode
  title: string
  description: string
  tag: string
  href: string
}

export default function ServiceCard({
  icon,
  title,
  description,
  tag,
  href,
}: ServiceCardProps) {
  return (
    <Link href={href}>
      <div className="group rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-8 hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all cursor-pointer">
        {/* Icon with background circle */}
        <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 mb-4">
          {icon}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
          {title}
        </h3>

        {/* Description */}
        <p className="text-gray-700 dark:text-gray-300 text-sm mb-4 line-clamp-2">
          {description}
        </p>

        {/* Tag Badge */}
        <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 mb-4">
          {tag}
        </div>

        {/* Link Arrow with hover animation */}
        <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
          Learn More
          <ArrowRight className="w-4 h-4" />
        </div>
      </div>
    </Link>
  )
}