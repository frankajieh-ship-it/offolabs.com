'use client'

import { useEffect } from 'react'
import { Briefcase } from 'lucide-react'

interface Role {
  id: string
  title: string
  location: string
  department: string
  url?: string
}

interface OpenRolesSectionProps {
  roles?: Role[]
}

export default function OpenRolesSection({ roles = [] }: OpenRolesSectionProps) {
  useEffect(() => {
    // Track when Open Roles section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'careers_open_roles_viewed', {
              section: 'open_roles',
              roleCount: roles.length,
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section[data-section="open-roles"]')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [roles.length])

  return (
    <section data-section="open-roles" className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
              <Briefcase className="w-6 h-6" />
            </div>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Open Roles
          </h2>
        </div>

        {/* Roles or Empty State */}
        {roles.length === 0 ? (
          <div className="text-center space-y-6">
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              There are no open roles right now.
            </p>
            <p className="text-base text-gray-500 dark:text-gray-500">
              We&apos;re always interested in exceptional talent. Join our talent network below to be notified when opportunities arise.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {roles.map((role) => (
              <a
                key={role.id}
                href={role.url || '#'}
                className="block p-6 rounded-lg border border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 hover:border-gray-400 dark:hover:border-gray-600 hover:shadow-md transition-all duration-300"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {role.title}
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                        {role.location}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                        {role.department}
                      </span>
                    </div>
                  </div>
                  <div className="text-blue-600 dark:text-blue-400 font-semibold">
                    View Role →
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}