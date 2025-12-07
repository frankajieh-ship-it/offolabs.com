'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

interface BusinessData {
  id: string;
  name: string;
  score: number;
  category: string;
  borderColor: string;
  badgeColor: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function Home() {
  const [isHowItWorksOpen, setIsHowItWorksOpen] = useState(false);
  const [businesses, setBusinesses] = useState<BusinessData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Business metadata (names remain static)
  const businessMetadata = {
    biz_excellent: 'Business A - Excellent',
    biz_healthy: 'Business B - Healthy',
    biz_mixed: 'Business C - Mixed',
    biz_risky: 'Business D - Risky',
    biz_critical: 'Business E - Critical',
  };

  useEffect(() => {
    fetchBusinessScores();
  }, []);

  const fetchBusinessScores = async () => {
    setLoading(true);
    setError(null);

    try {
      // Fetch all business IDs
      const idsResponse = await fetch(`${API_BASE_URL}/businesses`);
      if (!idsResponse.ok) throw new Error('Failed to fetch business list');
      const { businesses: businessIds } = await idsResponse.json();

      // Fetch scores for each business
      const businessPromises = businessIds.map(async (id: string) => {
        const response = await fetch(`${API_BASE_URL}/risk-score/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch score for ${id}`);
        return response.json();
      });

      const scores = await Promise.all(businessPromises);

      // Map to UI data with dynamic styling
      const businessData: BusinessData[] = scores.map((data) => ({
        id: data.business_id,
        name: businessMetadata[data.business_id as keyof typeof businessMetadata] || data.business_id,
        score: data.overall_score,
        category: data.category,
        ...getCategoryStyles(data.category),
      }));

      // Sort by score descending (best first)
      businessData.sort((a, b) => b.score - a.score);

      setBusinesses(businessData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'LOW':
        return {
          borderColor: 'border-l-green-500',
          badgeColor: 'bg-green-100 text-green-700 border-green-300',
        };
      case 'MODERATE':
        return {
          borderColor: 'border-l-yellow-500',
          badgeColor: 'bg-yellow-100 text-yellow-700 border-yellow-300',
        };
      case 'HIGH':
        return {
          borderColor: 'border-l-red-500',
          badgeColor: 'bg-red-100 text-red-700 border-red-300',
        };
      default:
        return {
          borderColor: 'border-l-gray-500',
          badgeColor: 'bg-gray-100 text-gray-700 border-gray-300',
        };
    }
  };

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

        {/* How the Score Works - Collapsible Section */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 mb-6">
          <button
            onClick={() => setIsHowItWorksOpen(!isHowItWorksOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition"
          >
            <div className="flex items-center">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900">How the Risk Score Works</h2>
            </div>
            <svg className={`w-6 h-6 text-gray-600 transition-transform duration-200 ${isHowItWorksOpen ? 'transform rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {isHowItWorksOpen && (
            <div className="px-6 pb-6 border-t border-gray-200">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">📊</span> Inputs
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Task completion & overdue rates</li>
                    <li>• Training completion status</li>
                    <li>• Documentation accuracy & completeness</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">⚖️</span> Weighting
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Task Adherence: 40%</li>
                    <li>• Training Completion: 30%</li>
                    <li>• Documentation Accuracy: 30%</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 flex items-center">
                    <span className="mr-2">🎯</span> Score Meaning
                  </h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• 80-100: Low Risk (Green)</li>
                    <li>• 50-79: Moderate Risk (Yellow)</li>
                    <li>• 0-49: High Risk (Red)</li>
                  </ul>
                </div>
              </div>
              <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                <p className="text-xs text-blue-700">
                  <strong>Calculation:</strong> All inputs are normalized to 0-1 scale, then weighted and combined to produce a final 0-100 score.
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Select a Business to Analyze</h2>
            {loading && (
              <div className="flex items-center text-blue-600 text-sm">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading scores...
              </div>
            )}
          </div>

          <p className="text-gray-600 mb-6">
            Choose from our sample businesses to view detailed risk assessments with trends and recommendations.
          </p>

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-300 rounded-lg p-6 mb-6">
              <h3 className="text-red-800 font-semibold mb-2">Error Loading Data</h3>
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchBusinessScores}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Retry
              </button>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="block p-6 bg-gray-50 rounded-lg border-2 border-l-4 border-gray-200 animate-pulse">
                  <div className="mb-3">
                    <div className="h-5 w-32 bg-gray-300 rounded"></div>
                  </div>
                  <div className="mb-4">
                    <div className="h-6 w-40 bg-gray-300 rounded mb-3"></div>
                    <div className="mb-3">
                      <div className="h-8 w-20 bg-gray-300 rounded"></div>
                      <div className="h-3 w-16 bg-gray-300 rounded mt-1"></div>
                    </div>
                    <div className="h-6 w-24 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-4 w-28 bg-gray-300 rounded"></div>
                </div>
              ))}
            </div>
          )}

          {/* Business Cards - Dynamic Data */}
          {!loading && !error && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {businesses.map((business) => (
                <Link
                  key={business.id}
                  href={`/risk/${business.id}`}
                  className={`block p-6 bg-gray-50 rounded-lg border-2 border-l-4 border-gray-200 ${business.borderColor} hover:border-blue-500 hover:shadow-lg transition-all duration-200`}
                >
                  {/* Demo Data Tag */}
                  <div className="mb-3">
                    <span className="inline-block px-2 py-1 bg-gray-200 text-gray-600 rounded text-xs font-medium">
                      Demo Data – Simulated Metrics
                    </span>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                      {business.name}
                    </h3>

                    {/* Dynamic Numeric Risk Score */}
                    <div className="mb-3">
                      <div className="text-2xl font-bold text-gray-900">
                        {business.score}
                        <span className="text-sm font-normal text-gray-500 ml-1">/ 100</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">Risk Score</div>
                    </div>

                    {/* Dynamic Risk Category Badge */}
                    <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${business.badgeColor}`}>
                      {business.category} RISK
                    </span>
                  </div>

                  <div className="flex items-center text-blue-600 text-sm font-medium">
                    View Dashboard →
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
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
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
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
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900">Action Plans</h3>
            </div>
            <p className="text-gray-600 text-sm">
              Tailored recommendations and specific actions based on your risk profile and drivers.
            </p>
          </div>
        </div>

        {/* MVP Demo Banner */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
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
