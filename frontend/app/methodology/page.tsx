'use client';

import Link from 'next/link';

export default function MethodologyPage() {
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
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            How the OFFO Risk Score™ Works
          </h1>
          <p className="text-xl text-blue-100">
            A transparent, data-driven approach to measuring behavioral compliance risk in real-time.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        {/* Overview Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Overview</h2>
          <p className="text-gray-700 mb-4">
            The OFFO Risk Score is a behavioral risk intelligence system that converts daily compliance activities
            into quantifiable risk metrics. Unlike traditional risk assessments that rely on historical claims data,
            the OFFO Score provides <strong>predictive, real-time insights</strong> into organizational risk posture.
          </p>
          <p className="text-gray-700">
            By analyzing task completion patterns, training engagement, and documentation quality, the OFFO Score
            identifies risk trends <strong>before they escalate into incidents or claims</strong>.
          </p>
        </section>

        {/* Score Methodology Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Score Calculation</h2>

          <p className="text-gray-700 mb-6">
            The OFFO Risk Score is calculated using three weighted categories of behavioral data:
          </p>

          {/* Visual Weight Breakdown */}
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 mb-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
              Risk Score Component Weights
            </h3>

            {/* Task Completion - 40% */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">Task Completion</span>
                <span className="text-2xl font-bold text-blue-600">40%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div className="bg-blue-600 h-6 rounded-full" style={{ width: '40%' }}></div>
              </div>
            </div>

            {/* Training Records - 30% */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">Training Records</span>
                <span className="text-2xl font-bold text-green-600">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div className="bg-green-600 h-6 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>

            {/* Documentation Quality - 30% */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-lg font-semibold text-gray-900">Documentation Quality</span>
                <span className="text-2xl font-bold text-purple-600">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-6 overflow-hidden">
                <div className="bg-purple-600 h-6 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>

          {/* Detailed Explanations */}
          <div className="space-y-6">
            {/* Task Completion */}
            <div className="border-l-4 border-blue-600 pl-6 py-2">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                1. Task Completion (40%)
              </h4>
              <p className="text-gray-700 mb-2">
                Measures compliance with scheduled safety and operational tasks:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>On-time task completion rates</li>
                <li>Overdue task frequency and severity</li>
                <li>Task consistency across time periods</li>
                <li>Critical task prioritization patterns</li>
              </ul>
            </div>

            {/* Training Records */}
            <div className="border-l-4 border-green-600 pl-6 py-2">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                2. Training Records (30%)
              </h4>
              <p className="text-gray-700 mb-2">
                Evaluates workforce training engagement and currency:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Training completion percentages</li>
                <li>Certification renewal timeliness</li>
                <li>Skills gap identification</li>
                <li>Training frequency and recency</li>
              </ul>
            </div>

            {/* Documentation Quality */}
            <div className="border-l-4 border-purple-600 pl-6 py-2">
              <h4 className="text-xl font-bold text-gray-900 mb-2">
                3. Documentation Quality (30%)
              </h4>
              <p className="text-gray-700 mb-2">
                Assesses the completeness and accuracy of compliance documentation:
              </p>
              <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
                <li>Document completeness scores</li>
                <li>Audit trail consistency</li>
                <li>Missing or outdated document flags</li>
                <li>Data accuracy validation</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Score Categories Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Risk Categories</h2>

          <div className="space-y-4">
            {/* Low Risk */}
            <div className="border-l-4 border-green-500 bg-green-50 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">Low Risk</h3>
                <span className="px-3 py-1 bg-green-600 text-white text-sm font-bold rounded-full">
                  Score: 80-100
                </span>
              </div>
              <p className="text-gray-700">
                Strong compliance culture with consistent task completion, current training, and high-quality documentation.
                Minimal predicted claims risk.
              </p>
            </div>

            {/* Moderate Risk */}
            <div className="border-l-4 border-yellow-500 bg-yellow-50 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">Moderate Risk</h3>
                <span className="px-3 py-1 bg-yellow-600 text-white text-sm font-bold rounded-full">
                  Score: 50-79
                </span>
              </div>
              <p className="text-gray-700">
                Some compliance gaps identified. May have inconsistent task completion, training lapses, or documentation
                deficiencies. Warrants attention and corrective action.
              </p>
            </div>

            {/* High Risk */}
            <div className="border-l-4 border-red-500 bg-red-50 rounded-r-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xl font-bold text-gray-900">High Risk</h3>
                <span className="px-3 py-1 bg-red-600 text-white text-sm font-bold rounded-full">
                  Score: 0-49
                </span>
              </div>
              <p className="text-gray-700">
                Critical compliance deficiencies. Significant risk of incidents and claims. Requires immediate intervention
                and comprehensive remediation plan.
              </p>
            </div>
          </div>
        </section>

        {/* Use Cases Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Applications</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Insurers */}
            <div className="border border-blue-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Insurers</h3>
              <p className="text-sm text-gray-600">
                Use behavioral risk signals for underwriting decisions, pricing adjustments, and loss prevention programs.
              </p>
            </div>

            {/* Enterprise Risk Teams */}
            <div className="border border-green-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Risk Managers</h3>
              <p className="text-sm text-gray-600">
                Monitor organizational compliance trends and identify intervention opportunities before incidents occur.
              </p>
            </div>

            {/* Investors */}
            <div className="border border-purple-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Investors</h3>
              <p className="text-sm text-gray-600">
                Evaluate portfolio company risk profiles and operational maturity as part of due diligence processes.
              </p>
            </div>
          </div>
        </section>

        {/* Download Whitepaper CTA */}
        <section className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg shadow-lg p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Want to Learn More?
          </h2>
          <p className="text-xl text-blue-100 mb-6">
            Download the full OFFO Risk Score methodology whitepaper for technical details and validation studies.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold text-lg rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105 shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Methodology PDF
            </a>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold text-lg rounded-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              View Live Dashboard
            </Link>
          </div>
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
