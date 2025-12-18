'use client'

import { useState, Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon, PlayCircleIcon, CalendarDaysIcon, CheckCircleIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'

type DemoPath = 'selection' | 'interactive' | 'pilot-walkthrough' | 'readiness-preview'

interface QualificationData {
  industry: string
  locations: string
  timeline: string
  role: string
  name?: string
  email?: string
  company?: string
}

interface DemoModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function DemoModal({ isOpen, onClose }: DemoModalProps) {
  const [path, setPath] = useState<DemoPath>('selection')
  const [qualificationData, setQualificationData] = useState<QualificationData>({
    industry: '',
    locations: '',
    timeline: '',
    role: '',
  })

  const handlePathSelect = (selectedPath: DemoPath) => {
    setPath(selectedPath)
  }

  const handleQualificationSubmit = () => {
    // In production, send to CRM/analytics
    console.log('Qualification data:', qualificationData)

    if (path === 'interactive') {
      setPath('readiness-preview')
    }
  }

  const resetModal = () => {
    setPath('selection')
    setQualificationData({
      industry: '',
      locations: '',
      timeline: '',
      role: '',
    })
  }

  const handleClose = () => {
    resetModal()
    onClose()
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={handleClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all">
                {/* Close Button */}
                <button
                  onClick={handleClose}
                  className="absolute right-4 top-4 rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors z-10"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>

                {/* Path Selection */}
                {path === 'selection' && (
                  <div className="p-10">
                    <Dialog.Title className="text-h2 text-ink text-center mb-3">
                      Experience OFFO Launch
                    </Dialog.Title>
                    <p className="text-body-lg text-ink-muted text-center mb-10 max-w-2xl mx-auto">
                      Choose how you'd like to explore our launch compliance platform
                    </p>

                    <div className="grid md:grid-cols-2 gap-6">
                      {/* Interactive Demo Card */}
                      <button
                        onClick={() => handlePathSelect('interactive')}
                        className="group relative bg-gradient-to-br from-offo-blue-700 to-offo-blue-900 rounded-2xl p-8 text-left hover:shadow-2xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute top-4 right-4">
                          <PlayCircleIcon className="w-8 h-8 text-white/80 group-hover:text-white transition-colors" />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-white mb-2">Interactive Demo</h3>
                          <p className="text-blue-100 text-sm">Explore on your own, no login required</p>
                        </div>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start gap-2 text-sm text-white">
                            <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                            <span>See Launch Readiness Score in action</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                            <span>Explore permit & inspection workflows</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-white">
                            <CheckCircleIcon className="w-5 h-5 text-offo-success flex-shrink-0 mt-0.5" />
                            <span>Preview timeline & delay tracking</span>
                          </li>
                        </ul>

                        <div className="inline-flex items-center text-sm font-semibold text-white">
                          Start exploring →
                        </div>
                      </button>

                      {/* Pilot Walkthrough Card */}
                      <button
                        onClick={() => handlePathSelect('pilot-walkthrough')}
                        className="group relative bg-white border-2 border-border rounded-2xl p-8 text-left hover:border-offo-blue-700 hover:shadow-xl transition-all duration-300 hover:scale-105"
                      >
                        <div className="absolute top-4 right-4">
                          <CalendarDaysIcon className="w-8 h-8 text-offo-blue-700 group-hover:text-offo-blue-900 transition-colors" />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-2xl font-bold text-ink mb-2">Book Pilot Walkthrough</h3>
                          <p className="text-ink-muted text-sm">Personalized demo with compliance advisor</p>
                        </div>

                        <ul className="space-y-3 mb-6">
                          <li className="flex items-start gap-2 text-sm text-ink-muted">
                            <CheckCircleIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                            <span>Custom workflow for your jurisdiction</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-ink-muted">
                            <CheckCircleIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                            <span>ROI analysis for your operation</span>
                          </li>
                          <li className="flex items-start gap-2 text-sm text-ink-muted">
                            <CheckCircleIcon className="w-5 h-5 text-offo-blue-700 flex-shrink-0 mt-0.5" />
                            <span>Early access to pilot program</span>
                          </li>
                        </ul>

                        <div className="inline-flex items-center text-sm font-semibold text-offo-blue-700">
                          Schedule a time →
                        </div>
                      </button>
                    </div>

                    <p className="text-center text-sm text-ink-muted mt-8">
                      Both options include a Launch Readiness Score preview
                    </p>
                  </div>
                )}

                {/* Interactive Demo Qualification */}
                {path === 'interactive' && (
                  <div className="p-10">
                    <Dialog.Title className="text-h2 text-ink text-center mb-3">
                      Let's Personalize Your Demo
                    </Dialog.Title>
                    <p className="text-body-lg text-ink-muted text-center mb-8 max-w-2xl mx-auto">
                      Tell us about your launch so we can show relevant workflows
                    </p>

                    <form className="max-w-2xl mx-auto space-y-6">
                      {/* Industry */}
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          What type of facility are you opening?
                        </label>
                        <select
                          value={qualificationData.industry}
                          onChange={(e) => setQualificationData({ ...qualificationData, industry: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select industry...</option>
                          <option value="restaurant-full-service">Restaurant - Full Service</option>
                          <option value="restaurant-qsr">Restaurant - Quick Service (QSR)</option>
                          <option value="restaurant-fast-casual">Restaurant - Fast Casual</option>
                          <option value="medical-clinic">Medical Clinic</option>
                          <option value="medical-urgent-care">Urgent Care Center</option>
                          <option value="medical-dental">Dental Office</option>
                          <option value="medical-specialty">Specialty Medical Practice</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Number of Locations */}
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          How many locations are you planning?
                        </label>
                        <select
                          value={qualificationData.locations}
                          onChange={(e) => setQualificationData({ ...qualificationData, locations: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select number...</option>
                          <option value="1">1 location (single opening)</option>
                          <option value="2-3">2-3 locations</option>
                          <option value="4-10">4-10 locations</option>
                          <option value="11+">11+ locations (rollout)</option>
                        </select>
                      </div>

                      {/* Timeline */}
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          When do you plan to open?
                        </label>
                        <select
                          value={qualificationData.timeline}
                          onChange={(e) => setQualificationData({ ...qualificationData, timeline: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select timeline...</option>
                          <option value="0-3-months">In the next 0-3 months</option>
                          <option value="3-6-months">In 3-6 months</option>
                          <option value="6-12-months">In 6-12 months</option>
                          <option value="12+-months">12+ months out</option>
                        </select>
                      </div>

                      {/* Role */}
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          What's your role?
                        </label>
                        <select
                          value={qualificationData.role}
                          onChange={(e) => setQualificationData({ ...qualificationData, role: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select role...</option>
                          <option value="owner">Owner/Founder</option>
                          <option value="operations">Operations Manager</option>
                          <option value="development">Development/Expansion Lead</option>
                          <option value="compliance">Compliance Manager</option>
                          <option value="consultant">Consultant/Advisor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setPath('selection')}
                          className="flex-1 rounded-xl border border-border px-6 py-3 text-base font-semibold text-ink hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <button
                          type="button"
                          onClick={handleQualificationSubmit}
                          disabled={!qualificationData.industry || !qualificationData.locations || !qualificationData.timeline || !qualificationData.role}
                          className="flex-1 rounded-xl bg-offo-blue-700 px-6 py-3 text-base font-semibold text-white hover:bg-offo-blue-900 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                          Continue to Demo
                        </button>
                      </div>
                    </form>
                  </div>
                )}

                {/* Pilot Walkthrough Qualification */}
                {path === 'pilot-walkthrough' && (
                  <div className="p-10">
                    <Dialog.Title className="text-h2 text-ink text-center mb-3">
                      Schedule Your Pilot Walkthrough
                    </Dialog.Title>
                    <p className="text-body-lg text-ink-muted text-center mb-8 max-w-2xl mx-auto">
                      Tell us about your launch and we'll match you with the right compliance advisor
                    </p>

                    <form className="max-w-2xl mx-auto space-y-6">
                      {/* Same qualification fields */}
                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          What type of facility are you opening?
                        </label>
                        <select
                          value={qualificationData.industry}
                          onChange={(e) => setQualificationData({ ...qualificationData, industry: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select industry...</option>
                          <option value="restaurant-full-service">Restaurant - Full Service</option>
                          <option value="restaurant-qsr">Restaurant - Quick Service (QSR)</option>
                          <option value="restaurant-fast-casual">Restaurant - Fast Casual</option>
                          <option value="medical-clinic">Medical Clinic</option>
                          <option value="medical-urgent-care">Urgent Care Center</option>
                          <option value="medical-dental">Dental Office</option>
                          <option value="medical-specialty">Specialty Medical Practice</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          How many locations are you planning?
                        </label>
                        <select
                          value={qualificationData.locations}
                          onChange={(e) => setQualificationData({ ...qualificationData, locations: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select number...</option>
                          <option value="1">1 location (single opening)</option>
                          <option value="2-3">2-3 locations</option>
                          <option value="4-10">4-10 locations</option>
                          <option value="11+">11+ locations (rollout)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          When do you plan to open?
                        </label>
                        <select
                          value={qualificationData.timeline}
                          onChange={(e) => setQualificationData({ ...qualificationData, timeline: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select timeline...</option>
                          <option value="0-3-months">In the next 0-3 months</option>
                          <option value="3-6-months">In 3-6 months</option>
                          <option value="6-12-months">In 6-12 months</option>
                          <option value="12+-months">12+ months out</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          What's your role?
                        </label>
                        <select
                          value={qualificationData.role}
                          onChange={(e) => setQualificationData({ ...qualificationData, role: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                        >
                          <option value="">Select role...</option>
                          <option value="owner">Owner/Founder</option>
                          <option value="operations">Operations Manager</option>
                          <option value="development">Development/Expansion Lead</option>
                          <option value="compliance">Compliance Manager</option>
                          <option value="consultant">Consultant/Advisor</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      {/* Contact info for pilot */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-ink mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            value={qualificationData.name || ''}
                            onChange={(e) => setQualificationData({ ...qualificationData, name: e.target.value })}
                            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                            placeholder="Your name"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-ink mb-2">
                            Email
                          </label>
                          <input
                            type="email"
                            value={qualificationData.email || ''}
                            onChange={(e) => setQualificationData({ ...qualificationData, email: e.target.value })}
                            className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                            placeholder="you@company.com"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-ink mb-2">
                          Company Name (Optional)
                        </label>
                        <input
                          type="text"
                          value={qualificationData.company || ''}
                          onChange={(e) => setQualificationData({ ...qualificationData, company: e.target.value })}
                          className="w-full rounded-lg border border-border bg-white px-4 py-3 text-ink focus:border-offo-blue-700 focus:outline-none focus:ring-2 focus:ring-offo-blue-700/20"
                          placeholder="Your company"
                        />
                      </div>

                      <div className="flex gap-4 pt-4">
                        <button
                          type="button"
                          onClick={() => setPath('selection')}
                          className="flex-1 rounded-xl border border-border px-6 py-3 text-base font-semibold text-ink hover:bg-gray-50 transition-colors"
                        >
                          Back
                        </button>
                        <a
                          href="https://calendly.com/offo-launch/pilot-walkthrough"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex-1 rounded-xl bg-offo-blue-700 px-6 py-3 text-base font-semibold text-white hover:bg-offo-blue-900 transition-colors text-center"
                          onClick={() => {
                            // In production, send to CRM
                            console.log('Pilot walkthrough data:', qualificationData)
                          }}
                        >
                          Continue to Calendly
                        </a>
                      </div>
                    </form>

                    <p className="text-center text-sm text-ink-muted mt-6">
                      We'll use this to prepare a customized demo for your jurisdiction
                    </p>
                  </div>
                )}

                {/* Launch Readiness Score Preview */}
                {path === 'readiness-preview' && (
                  <div className="p-10">
                    <Dialog.Title className="text-h2 text-ink text-center mb-3">
                      Your Launch Readiness Preview
                    </Dialog.Title>
                    <p className="text-body-lg text-ink-muted text-center mb-8 max-w-2xl mx-auto">
                      Here's what a {qualificationData.industry?.replace(/-/g, ' ')} launch looks like in OFFO
                    </p>

                    {/* Sample Dashboard */}
                    <div className="max-w-3xl mx-auto space-y-6">
                      {/* Overall Score */}
                      <div className="bg-gradient-to-br from-offo-blue-700 to-offo-blue-900 rounded-2xl p-8 text-white">
                        <div className="flex items-center justify-between mb-4">
                          <div>
                            <div className="text-sm font-semibold text-blue-100 mb-1">Launch Readiness Score</div>
                            <div className="text-5xl font-bold">73%</div>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-blue-100">Estimated Opening</div>
                            <div className="text-xl font-bold">42 days</div>
                          </div>
                        </div>
                        <div className="h-3 bg-white/20 rounded-full overflow-hidden">
                          <div className="h-full bg-offo-success rounded-full" style={{ width: '73%' }} />
                        </div>
                      </div>

                      {/* Category Breakdown */}
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="bg-white border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-ink">Permits</div>
                            <div className="text-2xl font-bold text-offo-success">85%</div>
                          </div>
                          <div className="text-sm text-ink-muted">6 of 7 permits approved</div>
                          <div className="mt-3 text-xs text-ink-muted">⏳ Health permit pending (3 days)</div>
                        </div>

                        <div className="bg-white border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-ink">Inspections</div>
                            <div className="text-2xl font-bold text-yellow-500">60%</div>
                          </div>
                          <div className="text-sm text-ink-muted">3 of 5 inspections passed</div>
                          <div className="mt-3 text-xs text-ink-muted">🔥 Fire inspection scheduled 12/20</div>
                        </div>

                        <div className="bg-white border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-ink">Training</div>
                            <div className="text-2xl font-bold text-offo-success">100%</div>
                          </div>
                          <div className="text-sm text-ink-muted">All staff certified</div>
                          <div className="mt-3 text-xs text-ink-muted">✅ Food safety complete</div>
                        </div>

                        <div className="bg-white border border-border rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <div className="text-sm font-semibold text-ink">Equipment</div>
                            <div className="text-2xl font-bold text-red-500">40%</div>
                          </div>
                          <div className="text-sm text-ink-muted">2 of 5 items delivered</div>
                          <div className="mt-3 text-xs text-ink-muted">⚠️ Hood system delayed to 12/22</div>
                        </div>
                      </div>

                      {/* Next Steps */}
                      <div className="bg-surface-muted border border-border-subtle rounded-xl p-6">
                        <div className="font-semibold text-ink mb-4">Critical Path (Next 7 Days)</div>
                        <ul className="space-y-3">
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-semibold text-ink">Hood system installation</div>
                              <div className="text-xs text-ink-muted">Blocks final fire inspection</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-semibold text-ink">Health permit follow-up</div>
                              <div className="text-xs text-ink-muted">Documentation submitted, awaiting approval</div>
                            </div>
                          </li>
                          <li className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0" />
                            <div>
                              <div className="text-sm font-semibold text-ink">Final fire inspection</div>
                              <div className="text-xs text-ink-muted">Ready to schedule after hood install</div>
                            </div>
                          </li>
                        </ul>
                      </div>

                      {/* CTAs */}
                      <div className="flex gap-4 pt-6">
                        <Link
                          href="/demo"
                          className="flex-1 rounded-xl bg-offo-blue-700 px-6 py-4 text-center text-base font-semibold text-white hover:bg-offo-blue-900 transition-colors"
                          onClick={handleClose}
                        >
                          Explore Full Demo
                        </Link>
                        <button
                          onClick={() => setPath('pilot-walkthrough')}
                          className="flex-1 rounded-xl border-2 border-offo-blue-700 px-6 py-4 text-base font-semibold text-offo-blue-700 hover:bg-offo-blue-50 transition-colors"
                        >
                          Book Walkthrough
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}
