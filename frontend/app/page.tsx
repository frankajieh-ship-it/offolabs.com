// app/page.tsx
'use client'

import { useState } from "react";
import Link from "next/link";
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  ClipboardDocumentCheckIcon,
  UserGroupIcon,
  LockClosedIcon,
  DocumentCheckIcon
} from '@heroicons/react/24/outline';
import DemoModal from '@/components/DemoModal';

export default function Page() {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-surface">
      <DemoModal isOpen={isDemoModalOpen} onClose={() => setIsDemoModalOpen(false)} />
      {/* Hero - Premium Pattern */}
      <section className="relative overflow-hidden bg-gradient-to-br from-offo-blue-900 via-offo-blue-700 to-offo-navy">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.3)_0,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.2)_0,transparent_55%)]" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge */}
            <span className="inline-flex items-center rounded-full bg-offo-success/90 px-4 py-1.5 text-xs font-bold tracking-wide text-white shadow-lg">
              NOW IN PILOT
            </span>

            {/* H1 - Outcome focused */}
            <h1 className="mt-8 text-h1-mobile md:text-h1 text-white">
              Launch Your Restaurant or Medical Facility with Complete Compliance Confidence
            </h1>

            {/* One-sentence value prop */}
            <p className="mt-6 text-body-xl text-blue-100 max-w-3xl mx-auto">
              OFFO Launch™ eliminates permit chaos and inspection delays so operators can open on time, every time.
            </p>

            {/* 3 Concrete Capabilities */}
            <div className="mt-10 grid gap-4 text-left md:grid-cols-3 max-w-4xl mx-auto">
              <div className="flex gap-3 items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircleIcon className="w-6 h-6 text-offo-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">Real-time Permit Tracking</div>
                  <div className="text-sm text-blue-100 mt-1">Health, fire, ADA, liquor—all in one timeline</div>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircleIcon className="w-6 h-6 text-offo-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">Launch Readiness Dashboard</div>
                  <div className="text-sm text-blue-100 mt-1">Know exactly what's blocking your opening</div>
                </div>
              </div>
              <div className="flex gap-3 items-start bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <CheckCircleIcon className="w-6 h-6 text-offo-success flex-shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-white text-sm">Inspection Coordination</div>
                  <div className="text-sm text-blue-100 mt-1">Automated scheduling with inspector notes</div>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-offo-blue-900 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-200"
              >
                Experience OFFO Launch
              </button>
              <Link
                href="/pilot"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-white/60 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Join Pilot Program
              </Link>
            </div>

            {/* Trust Row */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100">
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-offo-success" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-offo-success" />
                <span>SOC 2 Type II in progress</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircleIcon className="w-5 h-5 text-offo-success" />
                <span>Used by operators nationwide</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Band - Enterprise Decision Architecture */}
      <section className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink">Built for Operators, Trusted by Compliance</h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-2xl mx-auto">
              Enterprise-grade launch management backed by regulatory intelligence
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {/* Pilot Program Card */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <UserGroupIcon className="w-6 h-6 text-offo-blue-700" />
                </div>
                <h3 className="text-h3 text-ink">Pilot Program</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Join early operators getting white-glove onboarding, dedicated support, and priority feature access.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Custom workflow setup for your jurisdiction</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Direct access to compliance advisors</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Locked-in early adopter pricing</span>
                </li>
              </ul>
              <Link
                href="/pilot"
                className="inline-flex items-center text-offo-blue-700 font-semibold hover:text-offo-blue-900 transition-colors"
              >
                Learn about pilot →
              </Link>
            </div>

            {/* Security & Privacy Card */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <ShieldCheckIcon className="w-6 h-6 text-offo-blue-700" />
                </div>
                <h3 className="text-h3 text-ink">Security & Privacy</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Enterprise-grade security controls protecting your launch data and compliance documentation.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <LockClosedIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">SOC 2 Type II certification (Q2 2025)</span>
                </li>
                <li className="flex items-start gap-2">
                  <LockClosedIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">End-to-end encryption for documents</span>
                </li>
                <li className="flex items-start gap-2">
                  <LockClosedIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">HIPAA-ready infrastructure for medical facilities</span>
                </li>
              </ul>
              <Link
                href="/security"
                className="inline-flex items-center text-offo-blue-700 font-semibold hover:text-offo-blue-900 transition-colors"
              >
                View security details →
              </Link>
            </div>

            {/* Compliance Alignment Card */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border md:col-span-2 lg:col-span-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <ClipboardDocumentCheckIcon className="w-6 h-6 text-offo-blue-700" />
                </div>
                <h3 className="text-h3 text-ink">Compliance Ready</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Built-in workflows for FDA, health departments, fire marshals, and ADA requirements.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-2">
                  <DocumentCheckIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Health department permit checklists</span>
                </li>
                <li className="flex items-start gap-2">
                  <DocumentCheckIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Fire safety inspection coordination</span>
                </li>
                <li className="flex items-start gap-2">
                  <DocumentCheckIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">ADA compliance documentation</span>
                </li>
              </ul>
              <Link
                href="/compliance"
                className="inline-flex items-center text-offo-blue-700 font-semibold hover:text-offo-blue-900 transition-colors"
              >
                Explore compliance features →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-blue-100 text-offo-blue-700 text-sm font-semibold rounded-full mb-4">
              FROM PILOT OPERATORS
            </span>
            <h2 className="text-h2 text-ink">Operators Are Launching Faster</h2>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-surface-muted rounded-2xl p-8 border border-border-subtle">
              <div className="flex items-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-body-lg text-ink mb-6 leading-relaxed">
                "We opened our second location 3 weeks ahead of schedule. OFFO Launch kept our permit process organized and caught a fire inspection issue before it became a delay."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-offo-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  MR
                </div>
                <div>
                  <div className="font-semibold text-ink">Maria Rodriguez</div>
                  <div className="text-sm text-ink-muted">Owner, Sabor Kitchen (Dallas, TX)</div>
                  <div className="text-xs text-offo-blue-700 font-medium mt-1">Pilot Operator</div>
                </div>
              </div>
            </div>

            <div className="bg-surface-muted rounded-2xl p-8 border border-border-subtle">
              <div className="flex items-start gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>
              <p className="text-body-lg text-ink mb-6 leading-relaxed">
                "The compliance checklist for medical clinics is a game-changer. We avoided $12K in re-inspection fees by catching missing documentation early."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-offo-blue-700 rounded-full flex items-center justify-center text-white font-bold">
                  DK
                </div>
                <div>
                  <div className="font-semibold text-ink">Dr. David Kim</div>
                  <div className="text-sm text-ink-muted">Medical Director, Summit Urgent Care</div>
                  <div className="text-xs text-offo-blue-700 font-medium mt-1">Pilot Operator</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Blocks - Tightened */}
      <section className="bg-surface-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink">Everything You Need to Launch</h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-2xl mx-auto">
              Purpose-built workflows for restaurant and medical facility openings
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <div className="bg-white rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="text-sm font-semibold text-offo-blue-700 mb-2">Pre-flight Checklist</div>
              <h3 className="text-xl font-bold text-ink mb-3">Permits & Inspections</h3>
              <p className="text-body text-ink-muted">
                Track health, fire, ADA, liquor licenses, and inspector notes in a unified timeline with automated reminders.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="text-sm font-semibold text-offo-blue-700 mb-2">Departure Board</div>
              <h3 className="text-xl font-bold text-ink mb-3">Timeline & Delays</h3>
              <p className="text-body text-ink-muted">
                See what's on-time, what's blocked, and what threatens your opening date—with smart rescheduling suggestions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-card border border-border hover:shadow-card-hover transition-shadow">
              <div className="text-sm font-semibold text-offo-blue-700 mb-2">Control Tower</div>
              <h3 className="text-xl font-bold text-ink mb-3">Launch Readiness View</h3>
              <p className="text-body text-ink-muted">
                A single dashboard to align owners, managers, contractors, and compliance teams on exactly what's needed to open.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA - Tightened */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="bg-gradient-to-br from-offo-blue-900 to-offo-blue-700 rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-h1-mobile md:text-h2 text-white mb-4">
              Ready to Launch with Confidence?
            </h2>
            <p className="text-body-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Join operators using OFFO Launch to open on time with complete compliance.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/pilot"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-offo-blue-900 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-200"
              >
                Join Pilot Program
              </Link>
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border-2 border-white/60 px-8 py-4 text-base font-semibold text-white hover:bg-white/10 hover:border-white transition-all duration-200"
              >
                Experience the Platform
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-surface border-t border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <p className="text-sm text-ink-muted">
              OFFO Launch™ — Site Launch Compliance → Launch Intelligence
            </p>
            <p className="text-xs text-ink-muted mt-2">
              © 2025 OFFO Lab Consulting. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
