import React, { ReactNode } from 'react'

interface SectionProps {
  children: ReactNode
  variant?: 'default' | 'alternate' | 'gradient'
  id?: string
  className?: string
}

export default function Section({
  children,
  variant = 'default',
  id,
  className = ''
}: SectionProps) {
  const baseClasses = 'py-12 sm:py-16 lg:py-20'

  const variantClasses = {
    default: 'bg-white dark:bg-gray-900',
    alternate: 'bg-gray-50 dark:bg-gray-900/50',
    gradient: 'bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10'
  }

  const sectionClass = `${baseClasses} ${variantClasses[variant]} ${className}`.trim()

  return (
    <section id={id} className={sectionClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  )
}
