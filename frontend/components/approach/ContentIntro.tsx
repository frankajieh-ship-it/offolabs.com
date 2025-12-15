'use client'

export default function ContentIntro() {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-800">
          Research-Focused Approach
        </span>
      </div>

      <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl mb-8">
        From Documentation to Measurement
      </h1>

      <div className="prose prose-lg mx-auto">
        <p className="text-xl text-gray-600 leading-relaxed">
          Most risk systems document what <em>should</em> happen.
          OFFO measures what <em>is</em> happening — in real time — by
          synthesizing behavioral and operational signals into a unified risk score.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="text-center">
            <div className="mb-4 text-3xl font-bold text-blue-600">→</div>
            <h3 className="font-semibold text-gray-900">Signal-Based</h3>
            <p className="mt-2 text-gray-600">
              Analyzes actual behavior patterns, not just policy compliance
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 text-3xl font-bold text-blue-600">⟳</div>
            <h3 className="font-semibold text-gray-900">Real-Time</h3>
            <p className="mt-2 text-gray-600">
              Continuously updates as new operational signals arrive
            </p>
          </div>

          <div className="text-center">
            <div className="mb-4 text-3xl font-bold text-blue-600">⚖️</div>
            <h3 className="font-semibold text-gray-900">Unified Scoring</h3>
            <p className="mt-2 text-gray-600">
              Correlates disparate data sources into a single intelligence layer
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
