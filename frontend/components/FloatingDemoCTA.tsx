'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function FloatingDemoCTA() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Send to Calendly or backend
      console.log('[OFFO] Demo request:', formData);

      // Simulate submission
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Close modal and show success
      setShowModal(false);
      alert('Thank you! We\'ll reach out within 24 hours to schedule your demo.');
      setFormData({ name: '', email: '', company: '' });
    } catch (error) {
      console.error('[OFFO] Demo request error:', error);
      alert('Something went wrong. Please try again or email us at contact@offolab.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setShowModal(true)}
        className="fixed bottom-8 right-8 z-50 px-6 py-4 bg-blue-600 text-white font-bold rounded-full shadow-2xl hover:bg-blue-700 transition-all transform hover:scale-110 flex items-center gap-2 group"
        aria-label="Book a Demo"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <span className="hidden sm:inline">Book a Demo</span>
        <span className="sm:hidden">Demo</span>
      </button>

      {/* Modal Overlay */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full p-8 relative">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
              aria-label="Close modal"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Modal Header */}
            <div className="mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Your Demo</h2>
              <p className="text-sm text-gray-600">
                See how OFFO Risk Score can transform your risk intelligence workflow in a personalized 30-minute demo.
              </p>
            </div>

            {/* Modal Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="demo-name" className="block text-sm font-semibold text-gray-700 mb-1">
                  Your Name *
                </label>
                <input
                  type="text"
                  id="demo-name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label htmlFor="demo-email" className="block text-sm font-semibold text-gray-700 mb-1">
                  Work Email *
                </label>
                <input
                  type="email"
                  id="demo-email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@company.com"
                />
              </div>

              <div>
                <label htmlFor="demo-company" className="block text-sm font-semibold text-gray-700 mb-1">
                  Company Name *
                </label>
                <input
                  type="text"
                  id="demo-company"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Your Company Inc."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all shadow-lg"
              >
                {isSubmitting ? 'Submitting...' : 'Request Demo'}
              </button>

              <p className="text-xs text-gray-500 text-center">
                We'll contact you within 24 hours to schedule your personalized demo.
              </p>
            </form>

            {/* Alternative: Calendly Link */}
            <div className="mt-6 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600 mb-3">
                Or schedule directly:
              </p>
              <a
                href="#"
                className="inline-flex items-center text-blue-600 font-semibold hover:text-blue-700"
                onClick={(e) => {
                  e.preventDefault();
                  // TODO: Replace with actual Calendly link
                  alert('Calendly integration coming soon. We\'ll email you a scheduling link.');
                }}
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                Open Calendly
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
