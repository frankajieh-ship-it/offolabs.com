'use client'

export default function CareersIntroSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              OFFO Labs is a Multi-Product AI Studio
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              We build practical tools for daily life, commerce, and engineering diagnostics.
            </p>
          </div>

          {/* Main Message */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              We move fast, ship constantly, and experiment fearlessly — with a team built around ownership and a true builder mindset.
            </p>
          </div>

          {/* Key Stats or Message */}
          <div className="mt-8 p-8 rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
            <p className="text-lg font-semibold text-blue-900 dark:text-blue-100">
              We don&apos;t hire for open roles alone. We build a talent network of exceptional people we want to work with.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}