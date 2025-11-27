import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function FoundersStoryPreview() {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-primary-50 to-primary-100/50 dark:from-primary-950/20 dark:to-primary-900/10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-8">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            The OFFO Story
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            How a vision to transform innovation became reality
          </p>
        </div>

        {/* Founder Story */}
        <div className="space-y-6 text-lg leading-relaxed text-gray-700 dark:text-gray-300 mb-8">
          <p>
            OFFO Labs was founded on a simple but powerful belief: technology should empower human potential, not replace it. Our founder, Jaye Ajieh, envisioned a future where artificial intelligence and human creativity work in perfect harmony—where complex problems become elegant solutions.
          </p>

          <p>
            With decades of experience in software engineering, machine learning, and entrepreneurship, Jaye assembled a team of visionary technologists united by a singular mission: to build AI-powered products that solve real-world challenges across multiple industries. From gaming and interior design to industrial maintenance and enterprise automation, OFFO Labs is creating the next generation of intelligent solutions.
          </p>

          <p>
            Today, OFFO Labs stands at the intersection of innovation and impact—building products that are not just technically impressive, but genuinely useful. We believe the future belongs to teams that blend cutting-edge AI with deep industry expertise, and that&apos;s exactly what we&apos;re doing.
          </p>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/about">
            <button className="inline-flex items-center space-x-2 px-8 py-3 rounded-lg bg-primary-600 text-white font-semibold hover:bg-primary-700 transition-colors group">
              <span>Learn More About OFFO Labs</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  )
}