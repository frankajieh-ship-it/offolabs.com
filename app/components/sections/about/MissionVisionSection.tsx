'use client'

import { Target, Lightbulb } from 'lucide-react'

export default function MissionVisionSection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
          {/* Mission */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Our Mission
              </h2>
            </div>
            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-8 border border-blue-200 dark:border-blue-800">
              <blockquote className="text-xl sm:text-2xl font-semibold text-blue-900 dark:text-blue-100 leading-relaxed">
                &quot;AI tools for daily life, commerce, and engineering diagnostics.&quot;
              </blockquote>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We&apos;re committed to creating AI applications that are immediately useful, deeply integrated into real workflows, and genuinely improve how people work and make decisions.
            </p>
          </div>

          {/* Vision */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white">
                Our Vision
              </h2>
            </div>
            <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-8 border border-purple-200 dark:border-purple-800">
              <blockquote className="text-xl sm:text-2xl font-semibold text-purple-900 dark:text-purple-100 leading-relaxed">
                &quot;A unified ecosystem of practical AI apps — not prototypes or demos — built to solve real problems for real users.&quot;
              </blockquote>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 leading-relaxed">
              We envision a world where AI is synonymous with practical utility. Our products are production-ready, battle-tested, and designed to scale across industries and use cases.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
