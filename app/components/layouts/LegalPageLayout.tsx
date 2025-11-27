'use client'

import React, { useEffect } from 'react'

interface LegalPageLayoutProps {
  title: string
  lastUpdated?: string
  children: React.ReactNode
  analyticsEvent: string
}

export default function LegalPageLayout({
  title,
  lastUpdated,
  children,
  analyticsEvent,
}: LegalPageLayoutProps) {
  useEffect(() => {
    // Track when legal page is viewed
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', analyticsEvent, {
        page_title: title,
      })
    }
  }, [title, analyticsEvent])

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 bg-gradient-to-br from-gray-900 to-gray-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              {title}
            </h1>
            {lastUpdated && (
              <p className="text-gray-400 text-sm">
                Last updated: {lastUpdated}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-16 sm:py-24 lg:py-32">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="prose prose-lg dark:prose-invert max-w-none">
            {children}
          </div>
        </div>
      </section>
    </div>
  )
}