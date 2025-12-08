'use client';

import Link from 'next/link';

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-8">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-12 text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          {/* Logo */}
          <Link href="/" className="inline-block mb-6">
            <img
              src="/OFFO_LAB_logo.png"
              alt="OFFO LAB"
              className="h-12 w-auto mx-auto"
            />
          </Link>

          {/* Heading */}
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Thank You for Your Interest!
          </h1>

          <p className="text-lg text-gray-700 mb-6">
            We've received your pilot program application and will review it shortly.
          </p>

          {/* What's Next Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-gray-900 mb-4 text-center">What Happens Next?</h2>

            <div className="space-y-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  1
                </div>
                <p className="text-gray-700 pt-1">
                  Our team will review your application within <strong>2-3 business days</strong>.
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  2
                </div>
                <p className="text-gray-700 pt-1">
                  If selected, we'll reach out to schedule an <strong>onboarding call</strong> to discuss your use case.
                </p>
              </div>

              <div className="flex items-start">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold mr-3">
                  3
                </div>
                <p className="text-gray-700 pt-1">
                  You'll receive <strong>pilot access credentials</strong> and documentation to get started.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-600 text-white font-bold text-lg rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Back to Dashboard
            </Link>

            <Link
              href="/methodology"
              className="inline-flex items-center justify-center px-8 py-4 bg-white border-2 border-blue-600 text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition-all"
            >
              Learn About Methodology
            </Link>
          </div>

          {/* Contact Info */}
          <div className="border-t border-gray-200 pt-6">
            <p className="text-sm text-gray-600 mb-2">
              Questions? Contact us at{' '}
              <a href="mailto:contact@offolab.com" className="text-blue-600 hover:text-blue-700 font-semibold">
                contact@offolab.com
              </a>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-xs text-gray-500">
            © 2025 <span className="font-semibold">OFFO LAB</span> · Risk Intelligence Engine
          </p>
        </div>
      </div>
    </main>
  );
}
