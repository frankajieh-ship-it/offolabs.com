'use client'

export default function CompanyStorySection() {
  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-8">
          {/* Section Header */}
          <div className="space-y-4">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
              Our Story
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
              How OFFO Labs came to build practical AI tools for real problems.
            </p>
          </div>

          {/* Story Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              OFFO Labs was founded on a simple observation: the best AI applications solve specific, real-world problems that people face every day. The founder&apos;s journey began by working directly with businesses on their operational challenges—from small commerce shops struggling with inventory and customer insights, to mechanical engineers diagnosing rotating equipment failures, to founders trying to optimize their business processes without hiring entire teams.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              What became clear was that AI works best when it&apos;s deeply integrated into existing workflows, solving problems that matter immediately. It&apos;s not about building flashy prototypes or academic demos. It&apos;s about understanding a craft—whether that&apos;s mechanical diagnostics, design, or business operations—and applying AI where it genuinely accelerates results.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              This philosophy shaped the founding of OFFO Labs. We wanted to build a team and culture around practical impact: products that work in production, across real use cases, solving problems for real users who depend on them. Not demos. Not research. Not prototypes that live in sandboxes. Products that ship, work at scale, and improve with every user interaction.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              Today, OFFO Labs is building a unified ecosystem of practical AI applications—each focused on a specific domain where AI can unlock real value. From acoustic diagnostics for rotating systems and generators, to AI agents for business automation, to design tools that save time and unlock creativity. Each product starts with deep domain expertise, rigorous engineering, and an obsessive focus on what actually works for users.
            </p>
          </div>

          {/* Call-out Box */}
          <div className="mt-12 p-8 rounded-lg border-2 border-blue-300 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20">
            <p className="text-xl font-semibold text-blue-900 dark:text-blue-100">
              We don&apos;t build AI for AI&apos;s sake. We build AI because it solves problems that matter.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
