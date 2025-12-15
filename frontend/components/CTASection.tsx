'use client'

import { useState } from 'react'
import { ArrowRight, Download, Calendar, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function CTASection() {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      {/* Main CTA Section */}
      <section className="py-16 bg-gradient-to-r from-offo-navy to-offo-blue relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }} />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-h1 font-bold mb-6">
              Ready to Balance Your Operations?
            </h2>
            <p className="text-body-lg opacity-95 mb-10 max-w-2xl mx-auto leading-relaxed">
              Join our Phase 1 pilot program and be among the first to deploy the Harmony Engine™ in your organization.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {/* Primary CTA - Join Pilot */}
              <motion.button
                onClick={() => setIsFormOpen(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-xl bg-white px-8 py-4 text-lg font-semibold text-offo-navy hover:bg-gray-100 transition-colors shadow-lg w-full sm:w-auto"
              >
                Join Pilot Program
                <ArrowRight className="ml-2 h-5 w-5" />
              </motion.button>

              {/* Secondary CTA - Whitepaper */}
              <motion.a
                href="/insights/offorisk-whitepaper"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-xl border-2 border-white px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors w-full sm:w-auto"
              >
                <Download className="mr-2 h-5 w-5" />
                Download White Paper
              </motion.a>

              {/* Tertiary CTA - Demo */}
              <motion.a
                href="https://calendly.com/offolabs/demo"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center justify-center rounded-xl bg-transparent px-8 py-4 text-lg font-semibold text-white hover:bg-white/10 transition-colors border border-white/30 w-full sm:w-auto"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book Demo
              </motion.a>
            </div>

            {/* Trust Line */}
            <p className="mt-8 text-sm opacity-80 flex items-center justify-center gap-2 flex-wrap">
              <span>✓ Pilot slots are limited</span>
              <span className="hidden sm:inline">•</span>
              <span>✓ Priority given to software teams & manufacturing leaders</span>
            </p>
          </motion.div>
        </div>
      </section>

      {/* Modal Form */}
      <AnimatePresence>
        {isFormOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setIsFormOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            >
              {/* Modal Header */}
              <div className="p-6 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-offo-navy to-offo-blue">
                <div>
                  <h3 className="text-xl font-bold text-white">Apply for Pilot Program</h3>
                  <p className="text-sm text-white/80 mt-1">Phase 1 - Limited Availability</p>
                </div>
                <button
                  onClick={() => setIsFormOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                {/* Placeholder Form - Replace with actual Typeform or custom form */}
                <div className="space-y-6">
                  {/* Company Info */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name *
                    </label>
                    <input
                      type="text"
                      placeholder="Your company"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors"
                    />
                  </div>

                  {/* Contact Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        placeholder="john@company.com"
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors"
                      />
                    </div>
                  </div>

                  {/* Industry */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Industry *
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors">
                      <option value="">Select industry</option>
                      <option value="software">Software & DevOps</option>
                      <option value="manufacturing">Manufacturing & Industrial</option>
                      <option value="field-ops">Field Service Operations</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Team Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Team Size *
                    </label>
                    <select className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors">
                      <option value="">Select team size</option>
                      <option value="1-10">1-10 people</option>
                      <option value="11-50">11-50 people</option>
                      <option value="51-200">51-200 people</option>
                      <option value="201+">201+ people</option>
                    </select>
                  </div>

                  {/* Use Case */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Primary Use Case
                    </label>
                    <textarea
                      rows={3}
                      placeholder="What operational challenge are you looking to solve?"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 focus:border-offo-blue focus:ring-2 focus:ring-offo-blue/20 outline-none transition-colors resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-offo-navy px-8 py-4 text-lg font-semibold text-white hover:bg-offo-navy/90 transition-colors shadow-lg"
                  >
                    Submit Application
                  </button>

                  <p className="text-xs text-gray-500 text-center">
                    By submitting, you agree to be contacted about the pilot program.
                    We typically respond within 24 hours.
                  </p>
                </div>

                {/* Alternative: Typeform Embed */}
                {/* Uncomment when you have a Typeform link */}
                {/*
                <div className="h-[500px]">
                  <iframe
                    src="https://form.typeform.com/to/YOUR-FORM-ID"
                    className="w-full h-full border-0 rounded-lg"
                    title="Pilot Application"
                  />
                </div>
                */}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
