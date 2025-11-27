'use client'

import { useEffect } from 'react'
import { analytics } from '@/utils/analytics'

export default function BeforeAfterGallery() {
  useEffect(() => {
    // Track when Before/After Gallery section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          analytics.track('renov_ai_before_after_viewed', {
            product: 'renov-ai',
            section: 'before_after_gallery',
          })
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])
  const transformations = [
    {
      id: 1,
      name: 'Modern Living Room',
      style: 'Contemporary',
    },
    {
      id: 2,
      name: 'Minimalist Bedroom',
      style: 'Minimalist',
    },
    {
      id: 3,
      name: 'Cozy Kitchen',
      style: 'Scandinavian',
    },
    {
      id: 4,
      name: 'Luxury Bathroom',
      style: 'Luxury',
    },
  ]

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            See the Transformation
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Real before and after examples powered by AI design suggestions
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {transformations.map((transformation) => (
            <div
              key={transformation.id}
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-gray-800 hover:shadow-lg transition-shadow"
            >
              {/* Before/After Container */}
              <div className="grid grid-cols-2">
                {/* Before */}
                <div className="bg-gradient-to-br from-gray-400 to-gray-500 aspect-square flex items-center justify-center text-white relative">
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/30 text-xs font-semibold">
                    Before
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <p className="text-sm">Original Space</p>
                  </div>
                </div>

                {/* After */}
                <div className="bg-gradient-to-br from-purple-600 to-pink-600 aspect-square flex items-center justify-center text-white relative">
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-black/30 text-xs font-semibold">
                    After
                  </div>
                  <div className="text-center">
                    <div className="text-4xl mb-2">✨</div>
                    <p className="text-sm">AI Designed</p>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 bg-white dark:bg-gray-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {transformation.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {transformation.style} Style
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Info Box */}
        <div className="mt-12 p-6 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800">
          <p className="text-center text-gray-900 dark:text-gray-100">
            <strong>AI-Powered Transformations:</strong> These examples showcase real interior design transformations powered by our advanced AI algorithms. Upload your own space to see personalized design suggestions.
          </p>
        </div>
      </div>
    </section>
  )
}
