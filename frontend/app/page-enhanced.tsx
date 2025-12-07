'use client';

import Link from 'next/link';

export default function Home() {
  const businesses = [
    {
      id: 'biz_excellent',
      name: 'Business A - Excellent',
      expectedRisk: 'LOW',
      score: 98,
      color: 'green',
      borderColor: 'border-l-green-500',
      badgeColor: 'bg-green-100 text-green-700 border-green-300'
    },
    {
      id: 'biz_healthy',
      name: 'Business B - Healthy',
      expectedRisk: 'LOW',
      score: 91,
      color: 'green',
      borderColor: 'border-l-green-500',
      badgeColor: 'bg-green-100 text-green-700 border-green-300'
    },
    {
      id: 'biz_mixed',
      name: 'Business C - Mixed',
      expectedRisk: 'MODERATE',
      score: 68,
      color: 'yellow',
      borderColor: 'border-l-yellow-500',
      badgeColor: 'bg-yellow-100 text-yellow-700 border-yellow-300'
    },
    {
      id: 'biz_risky',
      name: 'Business D - Risky',
      expectedRisk: 'HIGH',
      score: 42,
      color: 'red',
      borderColor: 'border-l-red-500',
      badgeColor: 'bg-red-100 text-red-700 border-red-300'
    },
    {
      id: 'biz_critical',
      name: 'Business E - Critical',
      expectedRisk: 'HIGH',
      score: 28,
      color: 'red',
      borderColor: 'border-l-red-500',
      badgeColor: 'bg-red-100 text-red-700 border-red-300'
    },
  ];

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            OFFO Risk Intelligence Dashboard
          </h1>
          <p className="text-gray-600 text-lg">
            Comprehensive risk assessment powered by behavioral compliance data
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Select a Business to Analyze</h2>
          <p className="text-gray-600 mb-6">
            Choose from our sample businesses to view detailed risk assessments with trends and recommendations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {businesses.map((business) => (
              <Link
                key={business.id}
                href={`/risk/${business.id}`}
                className={`block p-6 bg-gray-50 rounded-lg border-2 border-l-4 border-gray-200 ${business.borderColor} hover:border-blue-500 hover:shadow-lg transition-all duration-200`}
              >
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {business.name}
                  </h3>

                  {/* Numeric Risk Score - NEW */}
                  <div className="mb-3">
                    <div className="text-2xl font-bold text-gray-900">
                      {business.score}
                      <span className="text-sm font-normal text-gray-500 ml-1">/ 100</span>
                    </div>
                    <div className="text-xs text-gray-500 mt-1">Risk Score</div>
                  </div>

                  {/* Risk Category Badge - Enhanced */}
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${business.badgeColor}`}>
                    {business.expectedRisk} RISK
                  </span>
                </div>

                <div className="flex items-center text-blue-600 text-sm font-medium">
                  View Dashboard →
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Risk Scoring</h3>
            </div>
            <p className="text-gray-600 text-sm">
              0-100 risk score based on task adherence, training completion, and documentation accuracy.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Trend Analysis</h3>
            </div>
            <p className="text-gray-600 text-sm">
              30-day historical trends show risk score evolution and identify patterns over time.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Action Plans</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Tailored recommendations and specific actions based on your risk profile and drivers.
            </p>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-blue-900 mb-1">MVP Demo Mode</h3>
              <p className="text-sm text-blue-700">
                This is a demonstration version with simulated data. In production, data will be
                sourced from your Compliance AI database with real-time metrics.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
