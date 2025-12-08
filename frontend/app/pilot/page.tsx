'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PilotPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    orgName: '',
    sector: '',
    interestReason: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Validate form
      if (!formData.email || !formData.orgName || !formData.sector) {
        throw new Error('Please fill in all required fields');
      }

      // TODO: Send to backend API or webhook
      // For now, simulate submission
      console.log('[OFFO] Pilot signup:', formData);

      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Redirect to thank you page
      router.push('/thank-you');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Submission failed. Please try again.');
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/" className="inline-block">
            <img
              src="/OFFO_LAB_logo.png"
              alt="OFFO LAB"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-600 via-purple-700 to-purple-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Join the OFFO Risk Score™ Pilot Program
          </h1>
          <p className="text-xl text-purple-100">
            Be among the first to leverage behavioral risk intelligence for smarter underwriting and risk management decisions.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-8 py-12">
        {/* Benefits Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Pilot Program Benefits</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Early Access to Risk Intelligence Platform</h3>
                <p className="text-gray-600">Get hands-on experience with the OFFO Risk Score engine before public launch.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Complimentary Risk Assessments</h3>
                <p className="text-gray-600">Receive free behavioral risk scores for up to 10 portfolio companies or insured entities.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Dedicated Support & Training</h3>
                <p className="text-gray-600">Work directly with our team to understand and apply risk insights to your operations.</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-1">Influence Product Development</h3>
                <p className="text-gray-600">Shape the future of the platform with your feedback and feature requests.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Signup Form */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign Up for Early Access</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Work Email <span className="text-red-600">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="you@company.com"
              />
            </div>

            {/* Organization Name */}
            <div>
              <label htmlFor="orgName" className="block text-sm font-semibold text-gray-700 mb-2">
                Organization Name <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                id="orgName"
                name="orgName"
                required
                value={formData.orgName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                placeholder="Your Company Inc."
              />
            </div>

            {/* Sector */}
            <div>
              <label htmlFor="sector" className="block text-sm font-semibold text-gray-700 mb-2">
                Industry Sector <span className="text-red-600">*</span>
              </label>
              <select
                id="sector"
                name="sector"
                required
                value={formData.sector}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition bg-white"
              >
                <option value="">Select your sector...</option>
                <option value="insurance">Insurance / Underwriting</option>
                <option value="healthcare">Healthcare</option>
                <option value="construction">Construction</option>
                <option value="logistics">Logistics & Transportation</option>
                <option value="manufacturing">Manufacturing</option>
                <option value="food_services">Food Services</option>
                <option value="environmental">Environmental Services</option>
                <option value="venture_capital">Venture Capital / Investment</option>
                <option value="enterprise_risk">Enterprise Risk Management</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Interest Reason */}
            <div>
              <label htmlFor="interestReason" className="block text-sm font-semibold text-gray-700 mb-2">
                Why are you interested in the OFFO Risk Score? (Optional)
              </label>
              <textarea
                id="interestReason"
                name="interestReason"
                rows={4}
                value={formData.interestReason}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition resize-none"
                placeholder="Tell us about your use case, team size, or any specific challenges you're looking to address..."
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 bg-purple-600 text-white font-bold text-lg rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all transform hover:scale-105 active:scale-95 shadow-lg"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Submitting...
                  </span>
                ) : (
                  'Request Pilot Access'
                )}
              </button>
            </div>

            <p className="text-xs text-gray-500 text-center">
              By submitting this form, you agree to be contacted by the OFFO LAB team regarding the pilot program.
            </p>
          </form>
        </section>

        {/* Alternative Contact CTA */}
        <section className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-8 text-center">
          <h3 className="text-lg font-bold text-gray-900 mb-2">
            Have Questions?
          </h3>
          <p className="text-gray-700 mb-4">
            Contact our team directly to discuss custom integration options or enterprise partnerships.
          </p>
          <a
            href="mailto:contact@offolab.com"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            Email Us
          </a>
        </section>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/OFFO_LAB_logo.png"
                alt="OFFO LAB"
                className="h-8 w-auto opacity-60"
              />
              <p className="text-xs text-gray-600">
                © 2025 <span className="font-semibold">OFFO LAB</span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600 font-medium">
                Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Risk Intelligence Engine · v1.0
              </p>
              <p className="text-xs text-red-600 font-semibold mt-1">
                Confidential
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
