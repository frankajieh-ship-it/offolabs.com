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

      {/* What OFFO Launch Does - Product Storytelling */}
      <section className="bg-white border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-1.5 bg-offo-blue-100 text-offo-blue-700 text-sm font-semibold rounded-full mb-4">
              THE PLATFORM
            </span>
            <h2 className="text-h2 text-ink">What OFFO Launch Does</h2>
            <p className="mt-4 text-body-xl text-ink-muted max-w-3xl mx-auto">
              Three interconnected systems that eliminate launch chaos
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
