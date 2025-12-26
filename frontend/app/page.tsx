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
      <section className="relative overflow-hidden bg-gradient-to-br from-offo-blue-900/95 via-offo-blue-700/90 to-offo-navy/95">
        {/* Background Pattern with subtle noise */}
        <div className="absolute inset-0 opacity-[0.15]">
          <div className="h-full w-full bg-[radial-gradient(circle_at_20%_30%,rgba(255,255,255,0.2)_0,transparent_50%),radial-gradient(circle_at_80%_70%,rgba(255,255,255,0.15)_0,transparent_55%)]" />
        </div>
        <div className="absolute inset-0 opacity-[0.03] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-16 pb-20 md:pt-24 md:pb-28">
          <div className="mx-auto max-w-4xl text-center">
            {/* Badge - Behavioral Risk Intelligence */}
            <span className="inline-flex items-center rounded-full bg-white/5 backdrop-blur-sm border border-white/10 px-3 py-1 text-xs font-semibold tracking-wide text-blue-200/90">
              BEHAVIORAL RISK INTELLIGENCE
            </span>

            {/* H1 - Risk-first positioning */}
            <h1 className="mt-10 text-h1-mobile md:text-h1 text-white font-extrabold tracking-tight leading-[1.08]">
              See Risk Before It Becomes Loss
            </h1>

            {/* Subhead - Early signals value prop */}
            <p className="mt-8 text-lg md:text-xl text-blue-100/90 max-w-3xl mx-auto leading-relaxed">
              OFFO Launch™ turns operational behavior patterns into real-time risk signals—so teams can act early, not react late.
            </p>

            {/* 3 Core Capabilities */}
            <div className="mt-10 flex flex-col items-center gap-3 text-left max-w-2xl mx-auto">
              <div className="flex gap-3 items-start w-full">
                <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                <div className="text-blue-50/95 text-base">
                  <span className="font-semibold">Predict behavioral drift before impact</span>
                </div>
              </div>
              <div className="flex gap-3 items-start w-full">
                <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                <div className="text-blue-50/95 text-base">
                  <span className="font-semibold">Real-time operational + safety alignment</span>
                </div>
              </div>
              <div className="flex gap-3 items-start w-full">
                <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                <div className="text-blue-50/95 text-base">
                  <span className="font-semibold">Explainable risk scoring for leaders & insurers</span>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-offo-blue-900 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-200"
              >
                Watch Demo
              </button>
            </div>

            {/* Trust Row - Updated positioning */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-blue-100/80">
              <span>Built for enterprise risk</span>
              <span className="text-blue-200/40">•</span>
              <span>Pilot-ready</span>
              <span className="text-blue-200/40">•</span>
              <span>Explainable</span>
              <span className="text-blue-200/40">•</span>
              <span>Secure by design</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Behavioral Risk Matters - Problem Statement */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-h2 text-ink">Why Behavioral Risk Matters</h2>
              <p className="mt-4 text-body-xl text-ink-muted">
                Risk forms in behavior long before loss forms in data
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3 mb-12">
              {/* Problem: Reactive Tools */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-offo-danger/10 flex items-center justify-center">
                  <span className="text-3xl">📊</span>
                </div>
                <h3 className="font-bold text-ink mb-2">Most Tools Are Reactive</h3>
                <p className="text-sm text-ink-muted">
                  Traditional systems track incidents after they happen—when it's too late to prevent loss.
                </p>
              </div>

              {/* Consequence: Hidden Drift */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-offo-warning/10 flex items-center justify-center">
                  <span className="text-3xl">⚠️</span>
                </div>
                <h3 className="font-bold text-ink mb-2">Risk Forms Before Impact</h3>
                <p className="text-sm text-ink-muted">
                  Behavioral drift—missed trainings, skipped checks, operational shortcuts—accumulates silently.
                </p>
              </div>

              {/* Solution: Early Signals */}
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-offo-success/10 flex items-center justify-center">
                  <span className="text-3xl">🎯</span>
                </div>
                <h3 className="font-bold text-ink mb-2">Behavior Is the Early Signal</h3>
                <p className="text-sm text-ink-muted">
                  Measure drift, not just incidents—and act before weak signals become costly losses.
                </p>
              </div>
            </div>

            {/* Risk Trajectory Visualization */}
            <div className="bg-gradient-to-r from-surface-muted to-white rounded-2xl p-8 border border-border-subtle">
              <div className="flex items-center justify-between mb-6">
                <div className="text-sm font-semibold text-ink-muted">RISK TRAJECTORY</div>
                <div className="text-xs text-ink-muted">Traditional vs. Behavioral Intelligence</div>
              </div>

              <div className="relative h-24">
                {/* Timeline */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-border" />

                {/* Weak Signals */}
                <div className="absolute left-[10%] bottom-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-offo-success mb-2" />
                    <div className="text-xs text-center">
                      <div className="font-semibold text-offo-success">Weak Signals</div>
                      <div className="text-ink-muted text-[10px]">OFFO detects</div>
                    </div>
                  </div>
                </div>

                {/* Drift */}
                <div className="absolute left-[35%] bottom-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-offo-warning mb-2" />
                    <div className="text-xs text-center">
                      <div className="font-semibold text-offo-warning">Drift</div>
                      <div className="text-ink-muted text-[10px]">Accumulates</div>
                    </div>
                  </div>
                </div>

                {/* Incident */}
                <div className="absolute left-[65%] bottom-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-offo-danger mb-2" />
                    <div className="text-xs text-center">
                      <div className="font-semibold text-offo-danger">Incident</div>
                      <div className="text-ink-muted text-[10px]">Traditional detects</div>
                    </div>
                  </div>
                </div>

                {/* Loss */}
                <div className="absolute left-[90%] bottom-0">
                  <div className="flex flex-col items-center">
                    <div className="w-3 h-3 rounded-full bg-ink mb-2" />
                    <div className="text-xs text-center">
                      <div className="font-semibold text-ink">Loss</div>
                      <div className="text-ink-muted text-[10px]">Lagging</div>
                    </div>
                  </div>
                </div>

                {/* Connecting line */}
                <div className="absolute left-[10%] right-[10%] bottom-[6px] h-0.5 bg-gradient-to-r from-offo-success via-offo-warning via-offo-danger to-ink opacity-30" />
              </div>

              <div className="mt-8 pt-6 border-t border-border-subtle">
                <p className="text-sm text-ink-muted text-center italic">
                  "Early signals, early action"—OFFO catches drift before it compounds into loss.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How OFFO Works - 3-Pillar System */}
      <section className="border-b border-border bg-surface-muted">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-blue-100 text-offo-blue-700 text-sm font-semibold rounded-full mb-4">
              HOW IT WORKS
            </span>
            <h2 className="text-h2 text-ink">How OFFO Works</h2>
            <p className="mt-4 text-body-lg text-ink-muted max-w-2xl mx-auto">
              Three pillars that turn operational behavior into predictive risk intelligence
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Pillar 1: Signal Ingestion */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-offo-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                <h3 className="text-h3 text-ink">Signal Ingestion</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Collect behavioral signals across permits, inspections, training, and operational activity—not just incident reports.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Multi-source data ingestion (permits, certs, inspections)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Real-time operational behavior tracking</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">API integrations for continuous monitoring</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Normalization & Drift Detection */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-offo-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-h3 text-ink">Drift Detection</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Normalize fragmented data sources and identify behavioral drift patterns before they compound into incidents.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Cross-source normalization engine</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Pattern recognition for weak signals</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Behavioral baseline + deviation alerts</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Risk Scoring + Guidance */}
            <div className="bg-white rounded-2xl p-8 shadow-card hover:shadow-card-hover transition-shadow border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-offo-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-offo-blue-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-h3 text-ink">Risk Scoring</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Generate explainable risk scores and actionable guidance—trusted by operators, insurers, and regulators alike.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Transparent, explainable risk algorithms</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Prioritized action recommendations</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-ink-muted">Stakeholder-ready reporting (ops, EHS, insurers)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* What OFFO Launch Does - Product Storytelling */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-blue-100 text-offo-blue-700 text-sm font-semibold rounded-full mb-4">
              THE PLATFORM
            </span>
            <h2 className="text-h2 text-ink">What OFFO Launch Does</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-3xl mx-auto">
              Track behavior signals across permits, training, and operations—so you see drift before it becomes risk
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Permits & Inspections Tracker */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border-subtle hover:border-offo-blue-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <ClipboardDocumentCheckIcon className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-offo-blue-700">01</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Permits & Inspections Tracker</h3>
              <p className="text-body text-ink-muted mb-6">
                Real-time status on every permit (health, fire, ADA, liquor) with inspector contact history and automated deadline tracking.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Track 15+ permit types per jurisdiction</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Inspection scheduling with inspector notes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Automated reminders 7/3/1 days before expiration</span>
                </li>
              </ul>
            </div>

            {/* Training & Certification Matrix */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border-subtle hover:border-offo-blue-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <UserGroupIcon className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-offo-blue-700">02</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Training & Certification Matrix</h3>
              <p className="text-body text-ink-muted mb-6">
                Staff-level tracking of food safety, fire codes, equipment operation certifications—with expiration alerts.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Per-employee certification tracking</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Bulk upload training records</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Opening-day readiness scorecard</span>
                </li>
              </ul>
            </div>

            {/* Launch Audit Binder */}
            <div className="group bg-surface-muted rounded-2xl p-8 border border-border-subtle hover:border-offo-blue-700 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="flex items-center justify-between mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <DocumentCheckIcon className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold text-offo-blue-700">03</span>
              </div>
              <h3 className="text-xl font-bold text-ink mb-3">Launch Audit Binder</h3>
              <p className="text-body text-ink-muted mb-6">
                Auto-generated PDF binder with all permits, inspections, training records—ready for final health department walk-through.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>One-click PDF export with cover page</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Custom branding with your logo</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ink-muted">
                  <div className="w-1.5 h-1.5 rounded-full bg-offo-blue-700 mt-2 flex-shrink-0" />
                  <span>Shareable link for inspectors/investors</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases & Outcomes - Tailored by Stakeholder */}
      <section className="bg-gradient-to-br from-surface-muted to-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-blue-100 text-offo-blue-700 text-sm font-semibold rounded-full mb-4">
              USE CASES & OUTCOMES
            </span>
            <h2 className="text-h2 text-ink">Built for Every Stakeholder</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-3xl mx-auto">
              From operators to insurers—behavioral risk intelligence that aligns incentives across the value chain
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Operators & GMs */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-subtle hover:border-offo-blue-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-ink">Operators & GMs</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Run sites with confidence—see risk forming before it impacts operations, inspections, or team safety.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-2">Key Outcomes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Prevent inspection failures with early drift alerts</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Reduce operational blind spots across locations</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Demonstrate readiness to investors/regulators</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-border-subtle">
                  <div className="text-xs font-semibold text-offo-blue-700 mb-1">Primary Value</div>
                  <div className="text-sm text-ink-muted italic">"See risk before it becomes loss"</div>
                </div>
              </div>
            </div>

            {/* EHS & Safety Leaders */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-subtle hover:border-offo-blue-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <ShieldCheckIcon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-bold text-ink">EHS & Safety</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Move from reactive incident reporting to proactive risk management—measure drift, not just outcomes.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-2">Key Outcomes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Track leading indicators (training, audits) not just lagging (incidents)</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Identify high-risk sites before regulatory action</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Align safety + compliance + operations data</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-border-subtle">
                  <div className="text-xs font-semibold text-offo-blue-700 mb-1">Primary Value</div>
                  <div className="text-sm text-ink-muted italic">"Measure drift, not just incidents"</div>
                </div>
              </div>
            </div>

            {/* Insurers & Investors */}
            <div className="bg-white rounded-2xl p-8 border-2 border-border-subtle hover:border-offo-blue-700 transition-all duration-300 hover:shadow-2xl">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-3 bg-offo-blue-700 rounded-xl">
                  <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-ink">Insurers & Investors</h3>
              </div>
              <p className="text-body text-ink-muted mb-6">
                Underwrite and monitor portfolio risk with explainable, behavior-based signals—not just claims history.
              </p>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-ink mb-2">Key Outcomes:</h4>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Price premiums based on behavioral risk, not just claims</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Monitor portfolio risk across locations in real-time</span>
                    </li>
                    <li className="flex items-start gap-2 text-sm text-ink-muted">
                      <CheckCircleIcon className="w-4 h-4 text-offo-success flex-shrink-0 mt-0.5" />
                      <span>Transparent, auditable risk scoring for underwriting</span>
                    </li>
                  </ul>
                </div>
                <div className="pt-4 border-t border-border-subtle">
                  <div className="text-xs font-semibold text-offo-blue-700 mb-1">Primary Value</div>
                  <div className="text-sm text-ink-muted italic">"Explainable risk that stakeholders trust"</div>
                </div>
              </div>
            </div>
          </div>

          {/* Value Alignment CTA */}
          <div className="mt-12 bg-white rounded-2xl p-8 border-2 border-offo-blue-700/20 max-w-3xl mx-auto text-center">
            <h3 className="text-xl font-bold text-ink mb-3">Aligned Incentives, Shared Language</h3>
            <p className="text-body text-ink-muted mb-6">
              When operators, safety teams, and capital providers all see the same behavioral risk signals, everyone wins—fewer incidents, lower costs, better outcomes.
            </p>
            <Link
              href="http://localhost:3001"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-offo-blue-700 text-white px-8 py-3.5 rounded-lg font-semibold hover:bg-offo-blue-900 transition-colors shadow-md hover:shadow-lg"
            >
              Explore OFFO Sim →
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works - 4-Step Workflow */}
      <section className="bg-gradient-to-br from-surface-muted to-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-16">
            <h2 className="text-h2 text-ink">How It Works</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-2xl mx-auto">
              From day one to opening day—in four simple steps
            </p>
          </div>

          <div className="relative">
            {/* Connection Line */}
            <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-offo-blue-100 via-offo-blue-700 to-offo-blue-100 hidden lg:block" />

            <div className="grid gap-8 lg:grid-cols-4">
              {/* Step 1 */}
              <div className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-offo-blue-700 rounded-full text-white font-bold text-xl mb-6 shadow-lg z-10">
                  1
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">Import Your Launch</h3>
                <p className="text-sm text-ink-muted">
                  Upload jurisdiction requirements or use our templates for restaurants and medical facilities. Setup takes 5 minutes.
                </p>
              </div>

              {/* Step 2 */}
              <div className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-offo-blue-700 rounded-full text-white font-bold text-xl mb-6 shadow-lg z-10">
                  2
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">Track in Real-Time</h3>
                <p className="text-sm text-ink-muted">
                  Update permit statuses, log inspector calls, upload training certificates. One dashboard for the whole team.
                </p>
              </div>

              {/* Step 3 */}
              <div className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-offo-blue-700 rounded-full text-white font-bold text-xl mb-6 shadow-lg z-10">
                  3
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">See What's Blocking</h3>
                <p className="text-sm text-ink-muted">
                  Launch Readiness Score shows exactly what's delaying your opening—permits, inspections, or training gaps.
                </p>
              </div>

              {/* Step 4 */}
              <div className="relative text-center">
                <div className="relative inline-flex items-center justify-center w-16 h-16 bg-offo-success rounded-full text-white font-bold text-xl mb-6 shadow-lg z-10">
                  ✓
                </div>
                <h3 className="text-lg font-bold text-ink mb-3">Open with Confidence</h3>
                <p className="text-sm text-ink-muted">
                  Export your audit binder, show inspectors complete compliance, and open on schedule—every time.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 14-Day Pilot Timeline */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-success/10 text-offo-success text-sm font-semibold rounded-full mb-4">
              PILOT PROGRAM
            </span>
            <h2 className="text-h2 text-ink">What You Get in 14 Days</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-3xl mx-auto">
              White-glove onboarding to launch intelligence in two weeks
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Days 1-3 */}
              <div className="flex gap-6 group hover:bg-surface-muted p-6 rounded-xl transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-20 text-center">
                    <div className="font-bold text-offo-blue-700 text-lg">Days 1-3</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink mb-2">Kickoff & Jurisdiction Setup</h3>
                  <p className="text-sm text-ink-muted mb-3">
                    Your compliance advisor configures OFFO for your city/county permit requirements, health department workflows, and fire marshal protocols.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Compliance call (30 min)</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Custom workflow</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Team invites</span>
                  </div>
                </div>
              </div>

              {/* Days 4-7 */}
              <div className="flex gap-6 group hover:bg-surface-muted p-6 rounded-xl transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-20 text-center">
                    <div className="font-bold text-offo-blue-700 text-lg">Days 4-7</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink mb-2">Data Import & Training</h3>
                  <p className="text-sm text-ink-muted mb-3">
                    Bulk upload existing permits, training records, contractor info. Your team gets trained on the dashboard in a 15-minute video walkthrough.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">CSV import</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Team training</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Mobile access</span>
                  </div>
                </div>
              </div>

              {/* Days 8-11 */}
              <div className="flex gap-6 group hover:bg-surface-muted p-6 rounded-xl transition-colors">
                <div className="flex-shrink-0">
                  <div className="w-20 text-center">
                    <div className="font-bold text-offo-blue-700 text-lg">Days 8-11</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink mb-2">Live Tracking & Alerts</h3>
                  <p className="text-sm text-ink-muted mb-3">
                    Start logging permit updates, inspection notes, and training completions. Automated alerts keep critical items on track.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Slack integration</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Email digests</span>
                    <span className="text-xs px-3 py-1 bg-offo-blue-100 text-offo-blue-700 rounded-full font-medium">Critical path view</span>
                  </div>
                </div>
              </div>

              {/* Days 12-14 */}
              <div className="flex gap-6 group hover:bg-surface-muted p-6 rounded-xl transition-colors border-2 border-offo-success/30">
                <div className="flex-shrink-0">
                  <div className="w-20 text-center">
                    <div className="font-bold text-offo-success text-lg">Days 12-14</div>
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-ink mb-2">First Launch Readiness Report</h3>
                  <p className="text-sm text-ink-muted mb-3">
                    Export your first audit binder, see your Launch Readiness Score, and get advisor recommendations for any gaps.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <span className="text-xs px-3 py-1 bg-offo-success/10 text-offo-success rounded-full font-medium">PDF export</span>
                    <span className="text-xs px-3 py-1 bg-offo-success/10 text-offo-success rounded-full font-medium">Readiness score</span>
                    <span className="text-xs px-3 py-1 bg-offo-success/10 text-offo-success rounded-full font-medium">Advisor review</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-10 text-center">
              <button
                onClick={() => setIsDemoModalOpen(true)}
                className="inline-flex items-center justify-center rounded-xl bg-offo-blue-700 px-8 py-4 text-base font-semibold text-white hover:bg-offo-blue-900 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                Start Your 14-Day Pilot
              </button>
              <p className="mt-4 text-sm text-ink-muted">No credit card • Cancel anytime • White-glove support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why It Wins - Differentiators */}
      <section className="bg-surface-muted border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink">Why OFFO Launch Wins</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-3xl mx-auto">
              What makes us different from spreadsheets, project management tools, and generic compliance software
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">⚡ Built for Launch, Not Generic PM</div>
              <p className="text-sm text-ink-muted">
                Not adapted from Asana or Monday. Purpose-built for permit/inspection workflows restaurants and medical facilities actually face.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">📍 Jurisdiction-Specific Intelligence</div>
              <p className="text-sm text-ink-muted">
                Pre-loaded requirements for 500+ cities. Knows Dallas health permits ≠ Austin health permits.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">🎯 Single Source of Truth</div>
              <p className="text-sm text-ink-muted">
                No more "where's the fire inspection report?" Permits, inspections, training—one dashboard, not 12 Google Drive folders.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">🔐 Audit-Ready from Day One</div>
              <p className="text-sm text-ink-muted">
                One-click PDF export for health departments, investors, landlords. Show complete compliance in seconds.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">👥 Real Compliance Advisors</div>
              <p className="text-sm text-ink-muted">
                Not just software. Pilot includes advisor access for "Should we expedite this permit?" questions.
              </p>
            </div>

            <div className="bg-white rounded-xl p-6 border border-border">
              <div className="font-bold text-ink mb-2">📊 Launch Readiness Score</div>
              <p className="text-sm text-ink-muted">
                One number that tells owners, investors, and contractors: "Are we ready to open or not?"
              </p>
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

      {/* FAQ */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <h2 className="text-h2 text-ink">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-6">
            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">Is OFFO Launch only for restaurants and medical facilities?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Currently, yes. We're purpose-built for the permit/inspection workflows restaurants and medical facilities face (health department, fire marshal, ADA, liquor licensing, etc.). We may expand to other regulated industries in the future, but right now our compliance advisors specialize in food service and healthcare.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">How is this different from using Asana or Monday.com?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Generic project management tools don't know that Dallas requires a separate grease trap permit or that medical facilities need FDA registration before state licensing. OFFO Launch has jurisdiction-specific checklists, inspector contact tracking, training matrix templates, and auto-generated audit binders. Plus, you get compliance advisor access—not just software.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">What happens after the 14-day pilot?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Pilot operators get locked-in early pricing and priority access to new features. If you decide not to continue, we'll export your data (permits, inspections, training records) as a PDF or CSV. No lock-in, no hostage data. Most pilots convert because they've already invested the setup time and see the value.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">Do you integrate with our existing systems?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Yes. We integrate with Slack (alerts), Google Drive (document storage), and Calendly (inspection scheduling). API access coming Q2 2025 for custom integrations. We also support CSV import/export for bulk data transfer.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">What if my jurisdiction isn't in your database?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                We have 500+ cities pre-loaded, but if yours isn't there, your compliance advisor will build a custom checklist during pilot onboarding (Days 1-3). Takes about 2 hours of research. Once built, it's saved for future operators in that jurisdiction.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">How much does it cost after the pilot?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Pilot pricing starts at $299/month for single-location operators, $799/month for 2-10 locations, and custom pricing for larger rollouts. Early pilot operators get 20% off for 12 months. Price includes compliance advisor access, unlimited users, and all features (no tiered plans).
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">Is my data secure?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Yes. SOC 2 Type II certification in progress (Q2 2025), end-to-end encryption for documents, HIPAA-ready infrastructure for medical facilities. Your permits, training records, and inspector notes are encrypted at rest and in transit. We don't sell data or share with third parties.
              </p>
            </details>

            <details className="group bg-surface-muted rounded-xl p-6 border border-border-subtle hover:border-offo-blue-700 transition-colors">
              <summary className="flex justify-between items-center cursor-pointer list-none">
                <span className="font-semibold text-ink">Can I use this for multiple locations simultaneously?</span>
                <span className="text-offo-blue-700 text-2xl group-open:rotate-45 transition-transform">+</span>
              </summary>
              <p className="mt-4 text-sm text-ink-muted leading-relaxed">
                Absolutely. Multi-location operators see a portfolio view showing Launch Readiness Scores across all sites. Great for franchise rollouts or medical groups opening multiple clinics. Each location gets its own dashboard, but leadership sees consolidated reporting.
              </p>
            </details>
          </div>
        </div>
      </section>

      {/* CTA - Tightened */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="bg-gradient-to-br from-offo-blue-900 to-offo-blue-700 rounded-3xl p-10 md:p-16 text-center shadow-xl">
            <h2 className="text-h1-mobile md:text-h2 text-white mb-4">
              See Risk Before It Becomes Loss
            </h2>
            <p className="text-body-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Experience behavioral drift visualization and turn operational behavior into predictive risk intelligence.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="http://localhost:3001"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-base font-semibold text-offo-blue-900 shadow-xl hover:shadow-2xl hover:bg-blue-50 transition-all duration-200"
              >
                Explore OFFO Sim
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
              OFFO Launch™ — Behavioral Risk Intelligence for Operations
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
