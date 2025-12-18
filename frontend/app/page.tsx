import Link from "next/link";

export default function HomePage(): JSX.Element {
  return (
    <main className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-950 text-white py-16 md:py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none">
          <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white" />
          <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-white" />
        </div>

        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-2 bg-green-500 text-white text-xs md:text-sm px-4 py-1.5 rounded-full font-bold">
              NEW LAUNCH
            </span>

            <h1 className="mt-6 text-5xl md:text-6xl font-extrabold tracking-tight">
              OFFO Launch™
            </h1>

            <p className="mt-4 text-xl md:text-2xl font-semibold text-white">
              A "control tower" for opening restaurants and medical facilities — on time.
            </p>

            <p className="mt-4 text-base md:text-lg max-w-3xl mx-auto text-blue-100 leading-relaxed">
              Track permits, inspections, training, and approvals in one place, with a readiness signal that
              highlights what's most likely to delay your opening.
            </p>

            {/* 3 bullets */}
            <div className="max-w-3xl mx-auto mt-10 space-y-3 text-left">
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/15">
                <span className="text-green-300 text-xl font-bold leading-none">✓</span>
                <p className="text-white">
                  <span className="font-bold">Permits & licenses</span> — deadlines, owners, and status in one view
                </p>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/15">
                <span className="text-green-300 text-xl font-bold leading-none">✓</span>
                <p className="text-white">
                  <span className="font-bold">Inspection readiness</span> — checklists + notes so teams don't guess
                </p>
              </div>
              <div className="flex items-start gap-3 bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/15">
                <span className="text-green-300 text-xl font-bold leading-none">✓</span>
                <p className="text-white">
                  <span className="font-bold">Launch readiness signal</span> — see risk early, before the date slips
                </p>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/demo"
                className="bg-white text-blue-950 px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Live Demo
              </Link>
              <Link
                href="/pilot"
                className="bg-transparent border-2 border-white/80 text-white px-10 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Pilot Program
              </Link>
            </div>

            <p className="mt-5 text-sm text-blue-100">
              Takes 2 minutes • No credit card • Built for operators
            </p>

            <p className="mt-6 text-sm md:text-base text-blue-100 italic border-t border-white/20 pt-6 max-w-2xl mx-auto">
              Designed for multi-location openings where delays cost real money.
            </p>
          </div>
        </div>
      </section>

      {/* WHO IT'S FOR */}
      <section className="py-14 md:py-18 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Built for Restaurants + Medical Facilities
            </h2>
            <p className="mt-3 text-lg text-gray-600 max-w-3xl mx-auto">
              Different industries — same launch reality: permits, inspections, training, documentation, and deadlines.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Restaurants</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Health department & food safety readiness</li>
                <li>• Fire marshal and occupancy coordination</li>
                <li>• Staff training acknowledgements and documentation</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Medical Facilities</h3>
              <ul className="text-gray-700 space-y-2">
                <li>• Licensing, inspections, and compliance readiness</li>
                <li>• Documentation & staff onboarding requirements</li>
                <li>• Opening coordination across vendors + build-out</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* DEMO PREVIEW */}
      <section className="py-16 md:py-24 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-5">
                See OFFO Launch™ in action
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Walk through a realistic opening workflow: permit tracking, inspection readiness, training matrix,
                and an audit binder generator — in one place.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-green-600 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Permit & Inspection Tracker</h4>
                    <p className="text-gray-600">Deadlines, owners, status, and inspector notes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-green-600 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Training Matrix</h4>
                    <p className="text-gray-600">Role-based requirements with acknowledgements + uploads</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="text-green-600 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Audit Binder Generator</h4>
                    <p className="text-gray-600">One-click binder output for inspections and internal reviews</p>
                  </div>
                </div>
              </div>

              <Link
                href="/demo"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Try Interactive Demo →
              </Link>
            </div>

            {/* Preview Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-950 text-white p-6">
                  <h3 className="text-xl font-bold mb-1">Flight REST001 — Ember & Oak</h3>
                  <p className="text-blue-200">Target takeoff (open): 1/31/2026 • Status: Delayed risk</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-950">45</div>
                      <div className="text-sm text-gray-600">Days to Open</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-950">2 / 6</div>
                      <div className="text-sm text-gray-600">Critical Checks</div>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Blockers
                    </h4>
                    <p className="text-sm text-red-800">
                      Health inspection • Fire sign-off • Final occupancy documentation
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg text-sm text-gray-700">
                    <p>
                      <strong>Demo mode:</strong> Example data only. Production uses your real tasks, owners, and uploads.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-blue-950 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Make "opening day" a certainty, not a gamble.
          </h2>
          <p className="text-xl md:text-2xl mb-8 text-blue-100">
            Start with the workflow that causes most delays: permits + inspections + training + binder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/demo"
              className="bg-white text-blue-950 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Start Demo
            </Link>
            <Link
              href="/schedule-demo"
              className="bg-transparent border-2 border-white/80 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Schedule a Call
            </Link>
          </div>

          <p className="mt-8 text-sm md:text-base text-blue-100">
            No credit card required • Pilot-ready • Operator-first
          </p>
        </div>
      </section>

      {/* FOOTER NOTE */}
      <section className="py-10 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
          OFFO Launch™ — Site Launch Compliance → Launch Intelligence
        </div>
      </section>
    </main>
  );
}
