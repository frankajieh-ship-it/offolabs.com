'use client';

import Link from 'next/link';

export default function IndexPage() {
  const businesses = [
    { id: 'biz_excellent', name: 'Business A - Excellent', expectedRisk: 'LOW', color: 'green' },
    { id: 'biz_healthy', name: 'Business B - Healthy', expectedRisk: 'LOW', color: 'green' },
    { id: 'biz_mixed', name: 'Business C - Mixed', expectedRisk: 'MODERATE', color: 'yellow' },
    { id: 'biz_risky', name: 'Business D - Risky', expectedRisk: 'HIGH', color: 'red' },
    { id: 'biz_critical', name: 'Business E - Critical', expectedRisk: 'HIGH', color: 'red' },
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
                className="block p-6 bg-gray-50 rounded-lg border-2 border-gray-200 hover:border-blue-500 hover:shadow-lg transition-all duration-200"
              >
                <div className="mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {business.name}
                  </h3>
                  <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold border">
                    Expected: {business.expectedRisk} RISK
                  </span>
                </div>
                <div className="flex items-center text-blue-600 text-sm font-medium">
                  View Dashboard →
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
