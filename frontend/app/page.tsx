// app/page.tsx
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-screen bg-white">
      {/* Top Nav */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <div className="grid h-9 w-9 place-items-center rounded-lg bg-blue-900 text-white font-bold">
              O
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold text-gray-900">OFFO LAB</div>
              <div className="text-[11px] text-gray-500">CONSULTING</div>
            </div>
          </div>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/harmony" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Harmony Engine
            </Link>
            <Link href="/how-it-works" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              How It Works
            </Link>
            <Link href="/resources" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Resources
            </Link>
            <Link href="/pilot" className="text-sm font-medium text-gray-700 hover:text-gray-900">
              Pilot Program
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href="/apply"
              className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-800"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-700 via-blue-800 to-blue-950 text-white">
        <div className="absolute inset-0 opacity-15">
          {/* simple geometric pattern */}
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.25)_0,transparent_45%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.18)_0,transparent_50%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 py-20 md:py-28">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center rounded-full bg-emerald-500/90 px-4 py-1.5 text-xs font-bold tracking-wide">
              NEW LAUNCH
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight md:text-6xl">
              OFFO Launch™
            </h1>

            <p className="mt-4 text-lg text-blue-100 md:text-xl">
              Streamline your restaurant or medical facility opening with confidence.
            </p>

            <p className="mt-4 text-base text-blue-100 md:text-lg">
              Track permits, inspections, training, and critical milestones in one place — and get a
              clear Launch Readiness view before you “take off.”
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link
                href="/demo"
                className="w-full rounded-xl bg-white px-7 py-3 text-center text-sm font-semibold text-blue-900 shadow-sm hover:bg-blue-50 sm:w-auto"
              >
                Try Live Demo
              </Link>
              <Link
                href="/learn"
                className="w-full rounded-xl border border-white/60 px-7 py-3 text-center text-sm font-semibold text-white hover:bg-white/10 sm:w-auto"
              >
                Learn More
              </Link>
            </div>

            <p className="mt-6 text-xs text-blue-200">
              No credit card • Pilot-ready • Built for operators
            </p>
          </div>
        </div>
      </section>

      {/* Value Blocks */}
      <section className="mx-auto max-w-7xl px-4 py-14 md:py-18">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-blue-800">Pre-flight Checklist</div>
            <div className="mt-2 text-lg font-bold text-gray-900">Permits & Inspections</div>
            <p className="mt-2 text-sm text-gray-600">
              Keep health, fire, ADA, licensing, and inspector notes in one tracked timeline.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-blue-800">Departure Board</div>
            <div className="mt-2 text-lg font-bold text-gray-900">Timeline & Delays</div>
            <p className="mt-2 text-sm text-gray-600">
              See what’s on-time, what’s blocked, and what threatens your opening date.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="text-sm font-semibold text-blue-800">Control Tower</div>
            <div className="mt-2 text-lg font-bold text-gray-900">Launch Readiness View</div>
            <p className="mt-2 text-sm text-gray-600">
              A single readiness snapshot to align owners, managers, contractors, and compliance.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-gray-200 bg-gray-50">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-12 md:flex-row">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ready to run a pilot?</h2>
            <p className="mt-1 text-sm text-gray-600">
              Get the dashboard, binder generator, and launch tracking workflow.
            </p>
          </div>
          <div className="flex w-full gap-3 md:w-auto">
            <Link
              href="/pilot"
              className="w-full rounded-xl bg-blue-700 px-6 py-3 text-center text-sm font-semibold text-white hover:bg-blue-800 md:w-auto"
            >
              Pilot Program
            </Link>
            <Link
              href="/apply"
              className="w-full rounded-xl border border-gray-300 bg-white px-6 py-3 text-center text-sm font-semibold text-gray-900 hover:bg-gray-100 md:w-auto"
            >
              Apply Now
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 text-center text-xs text-gray-500">
          OFFO Launch™ — Site Launch Compliance → Launch Intelligence
        </div>
      </footer>
    </main>
  );
}
