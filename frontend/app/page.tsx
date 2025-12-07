'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { authService } from '@/lib/auth';

interface BusinessData {
  id: string;
  name: string;
  description: string;
  industry: string;
  staff: number;
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
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  // MVP UPGRADE 1: Onboarding State
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [showOnboardingBanner, setShowOnboardingBanner] = useState(true);

  // PHASE 2: Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('ALL');
  // MVP UPGRADE #6: Sort State
  const [sortBy, setSortBy] = useState<string>('HIGHEST_RISK');

  // MVP UPGRADE #3: Business metadata with descriptions
  const businessMetadata: Record<string, { name: string; description: string; industry: string; staff: number }> = {
    biz_excellent: {
      name: 'Apex Manufacturing Co.',
      description: 'Manufacturing facility with exemplary safety record',
      industry: 'Manufacturing',
      staff: 78
    },
    biz_healthy: {
      name: 'Summit Logistics LLC',
      description: 'Logistics firm with 32 staff. Uses SafetySuite LMS',
      industry: 'Transportation & Logistics',
      staff: 32
    },
    biz_mixed: {
      name: 'Midpoint Construction Inc.',
      description: 'Mid-sized contractor with recent compliance gaps',
      industry: 'Construction',
      staff: 45
    },
    biz_risky: {
      name: 'Valley Food Processing',
      description: 'Food processing plant requiring training improvements',
      industry: 'Food Services',
      staff: 67
    },
    biz_critical: {
      name: 'Riverside Waste Services',
      description: 'Waste management with significant documentation issues',
      industry: 'Environmental Services',
      staff: 52
    },
  };

  // MVP UPGRADE 1: Check if this is first visit
  useEffect(() => {
    const hasVisited = localStorage.getItem('offoOnboarded');
    if (hasVisited) {
      setIsFirstVisit(false);
      setShowOnboardingBanner(false);
      setIsHowItWorksOpen(false);
    } else {
      setIsFirstVisit(true);
      setShowOnboardingBanner(true);
      setIsHowItWorksOpen(true); // Expand "How it Works" on first visit
    }
  }, []);

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
        const response = await authService.fetchWithAuth(`${API_BASE_URL}/risk-score/${id}`);
        if (!response.ok) throw new Error(`Failed to fetch score for ${id}`);
        return response.json();
      });

      const scores = await Promise.all(businessPromises);

      // MVP UPGRADE #3: Map to UI data with business descriptions
      const businessData: BusinessData[] = scores.map((data) => {
        const metadata = businessMetadata[data.business_id as keyof typeof businessMetadata];
        return {
          id: data.business_id,
          name: metadata?.name || data.business_id,
          description: metadata?.description || 'Business description unavailable',
          industry: metadata?.industry || 'Unknown',
          staff: metadata?.staff || 0,
          score: data.overall_score,
          category: data.category,
          ...getCategoryStyles(data.category),
        };
      });

      // Sort by score descending (best first)
      businessData.sort((a, b) => b.score - a.score);

      setBusinesses(businessData);
      setLastUpdated(new Date());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const formatTimestamp = (date: Date | null) => {
    if (!date) return '';
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);

    if (diffMins < 1) return 'Just now';
    if (diffMins === 1) return '1 minute ago';
    if (diffMins < 60) return `${diffMins} minutes ago`;

    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  const getCategoryStyles = (category: string) => {
    switch (category) {
      case 'LOW':
        return {
          borderColor: 'border-l-[#4CAF50]',
          badgeColor: 'bg-[#E8F5E9] text-[#2E7D32] border-[#4CAF50]',
        };
      case 'MODERATE':
        return {
          borderColor: 'border-l-[#F0B429]',
          badgeColor: 'bg-[#FFF9E6] text-[#B8860B] border-[#F0B429]',
        };
      case 'HIGH':
        return {
          borderColor: 'border-l-[#E63946]',
          badgeColor: 'bg-[#FFEBEE] text-[#C62828] border-[#E63946]',
        };
      default:
        return {
          borderColor: 'border-l-gray-500',
          badgeColor: 'bg-gray-100 text-gray-700 border-gray-300',
        };
    }
  };

  // MVP UPGRADE 1: Dismiss onboarding banner
  const dismissOnboarding = () => {
    localStorage.setItem('offoOnboarded', 'true');
    setShowOnboardingBanner(false);
    setIsFirstVisit(false);
  };

  // PHASE 2 + MVP UPGRADE #6: Filter, Search, and Sort Logic
  const filteredBusinesses = businesses
    .filter((business) => {
      // Filter by category
      const matchesCategory = filterCategory === 'ALL' || business.category === filterCategory;

      // Filter by search query (name or ID)
      const matchesSearch = searchQuery === '' ||
        business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        business.id.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'HIGHEST_RISK':
          return a.score - b.score; // Lower scores = higher risk
        case 'LOWEST_RISK':
          return b.score - a.score; // Higher scores = lower risk
        case 'A_Z':
          return a.name.localeCompare(b.name);
        case 'Z_A':
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });

  return (
    <main className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        {/* MVP UPGRADE #9: Header with Logo and Timestamp */}
        <header className="mb-8">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-4">
              <img 
                src="/OFFO_logo.png" 
                alt="OFFO Labs" 
                className="h-12 w-auto"
              />
              <div>
                <h1 className="text-4xl font-bold text-gray-900">
                  OFFO Risk Intelligence Dashboard
                </h1>
                <p className="text-gray-600 text-lg">
                  Comprehensive risk assessment powered by behavioral compliance data
                </p>
              </div>
            </div>
            <div className="text-sm text-gray-500 text-right">
              <div className="font-medium">Last updated:</div>
              <div>Just now</div>
            </div>
          </div>
        </header>

        {/* MVP UPGRADE 1: Onboarding Banner - First-Time Visitors Only */}
        {showOnboardingBanner && (
          <div className="bg-blue-600 text-white rounded-lg shadow-lg p-6 mb-6 border-l-4 border-blue-800">
            <div className="flex items-start justify-between">
              <div className="flex items-start flex-1">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-bold mb-2">Welcome to OFFO Risk Intelligence!</h3>
                  <p className="text-blue-50 mb-3">
                    <strong>Select a business below</strong> to view its current behavioral risk profile and top improvement areas. Each score is calculated in real-time from task completion, training records, and documentation accuracy.
                  </p>
                  <p className="text-sm text-blue-100">
                    💡 Tip: Scroll down to explore "How the Risk Score Works" for methodology details.
                  </p>
                </div>
              </div>
              <button
                onClick={dismissOnboarding}
                className="ml-4 flex-shrink-0 text-white hover:text-blue-200 transition-colors"
                aria-label="Dismiss onboarding message"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

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

        {/* Why Behavioral Risk Scoring Works - Enterprise Proof Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-md border border-blue-200 p-8 mb-6">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Why Behavioral Risk Scoring Works
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Leading Indicators, Not Lagging Claims</h3>
                  <p className="text-sm text-gray-700">
                    Detects risk patterns before incidents occur, enabling proactive intervention instead of reactive response.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Captures Behavioral Drift</h3>
                  <p className="text-sm text-gray-700">
                    Monitors day-to-day compliance behaviors to identify gradual degradation in safety culture before it escalates.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-1">
                  <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Measurable Risk Factors</h3>
                  <p className="text-sm text-gray-700">
                    Converts subjective compliance tasks into quantifiable metrics that drive underwriting and pricing decisions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* MVP UPGRADE 2: Real-Time Data Explanation Badge */}
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-5 mb-6 shadow-sm">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm font-semibold text-gray-900 mb-1">
                🔍 Real-Time Behavioral Data
              </p>
              <p className="text-sm text-gray-700">
                All scores are calculated from <strong>live compliance data</strong>: task completion logs, training records, and documentation accuracy metrics. Updated continuously as new data arrives.
              </p>
            </div>
            <div className="hidden sm:block ml-4">
              <div className="px-3 py-1 bg-green-600 text-white text-xs font-bold rounded-full">
                LIVE
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8 border border-gray-200 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Select a Business to Analyze</h2>
              {lastUpdated && !loading && (
                <p className="text-xs text-gray-500 mt-1">
                  Last updated: {formatTimestamp(lastUpdated)}
                </p>
              )}
            </div>
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

          {/* PHASE 2: Search & Filter Controls */}
          {!loading && !error && businesses.length > 0 && (
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
              {/* Search Bar */}
              <div className="flex-1">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                  <input
                    type="text"
                    placeholder="Search by name, ID or status"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  />
                </div>
              </div>

              {/* Category Filter Dropdown */}
              <div className="sm:w-64">
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="ALL">All Risk Categories</option>
                  <option value="LOW">Low Risk Only</option>
                  <option value="MODERATE">Moderate Risk Only</option>
                  <option value="HIGH">High Risk Only</option>
                </select>
              </div>

              {/* MVP UPGRADE #6: Sort Dropdown */}
              <div className="sm:w-64">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                >
                  <option value="HIGHEST_RISK">Sort: Highest Risk</option>
                  <option value="LOWEST_RISK">Sort: Lowest Risk</option>
                  <option value="A_Z">Sort: A-Z</option>
                  <option value="Z_A">Sort: Z-A</option>
                </select>
              </div>
            </div>
          )}

          {/* Filter Results Count */}
          {!loading && !error && filteredBusinesses.length !== businesses.length && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {filteredBusinesses.length} of {businesses.length} businesses
            </div>
          )}

          {/* No Results Message */}
          {!loading && !error && filteredBusinesses.length === 0 && businesses.length > 0 && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 mb-6">
              <div className="flex items-center">
                <svg className="h-5 w-5 text-yellow-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-yellow-800 font-medium">
                  No businesses match your search criteria. Try adjusting your filters.
                </p>
              </div>
            </div>
          )}

          {/* Error State - Business-Friendly */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 rounded-lg p-6 mb-6 shadow-md">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4 flex-1">
                  <h3 className="text-lg font-semibold text-red-900 mb-2">Unable to Load Risk Scores</h3>
                  <p className="text-red-800 mb-3">
                    We're experiencing difficulty connecting to the risk scoring system. Please try again or contact your system administrator if the problem persists.
                  </p>
                  <p className="text-sm text-red-700 mb-4 font-mono bg-red-100 p-2 rounded border border-red-200">
                    Error: {error}
                  </p>
                  <button
                    onClick={fetchBusinessScores}
                    className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors font-semibold shadow-sm"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Loading Skeleton */}
          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="block p-6 bg-white rounded-lg border-2 border-l-4 border-gray-200 shadow-md animate-pulse">
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

          {/* PHASE 2: Business Cards - Improved Layout & Messaging */}
          {!loading && !error && filteredBusinesses.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" style={{ minWidth: '280px' }}>
              {filteredBusinesses.map((business) => (
                <Link
                  key={business.id}
                  href={`/risk/${business.id}`}
                  className={`block p-6 bg-white rounded-lg border-2 border-l-4 border-gray-200 ${business.borderColor} shadow-md hover:shadow-2xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer`}
                  aria-label={`View dashboard for ${business.name} - Current Risk: ${business.category} (${business.score})`}
                >
                  {/* Demo Data Tag */}
                  <div className="mb-4">
                    <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                      Demo Data – Simulated Metrics
                    </span>
                  </div>

                  {/* MVP UPGRADE #3: Improved Card Content with Description */}
                  <div className="mb-5">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {business.name}
                    </h3>

                    {/* MVP UPGRADE #3: Business Description */}
                    <p className="text-sm text-gray-600 mb-3">
                      {business.description}
                    </p>
                    <p className="text-xs text-gray-500 mb-4">
                      {business.industry} • {business.staff} employees
                    </p>

                    {/* Current Risk Label (removed "Expected") */}
                    <div className="mb-4">
                      <div className="flex items-baseline gap-2 mb-2">
                        <span className="text-sm font-semibold text-gray-700">Current Risk:</span>
                        <span className={`text-lg font-bold ${
                          business.category === 'LOW' ? 'text-green-600' :
                          business.category === 'MODERATE' ? 'text-amber-600' :
                          'text-red-600'
                        }`}>
                          {business.category}
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ({business.score})
                        </span>
                      </div>

                      {/* Severity Icon */}
                      <div className="flex items-center gap-2">
                        {business.category === 'LOW' && (
                          <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                            <title>Low Risk Shield Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                          </svg>
                        )}
                        {business.category === 'MODERATE' && (
                          <svg className="w-6 h-6 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                            <title>Moderate Risk Warning Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                          </svg>
                        )}
                        {business.category === 'HIGH' && (
                          <svg className="w-6 h-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                            <title>High Risk Alert Icon</title>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold border ${business.badgeColor}`}>
                          {business.category} RISK
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* PHASE 2: Entire card is clickable - removed separate button text */}
                  <div className="pt-3 border-t border-gray-200 flex items-center justify-between text-blue-600 text-sm font-semibold">
                    <span>Click to view full dashboard</span>
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
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

        {/* MVP UPGRADE #9: Sticky Footer with Branding */}
        <footer className="mt-12 pt-6 border-t border-gray-300">
          <div className="text-center text-sm text-gray-600">
            <p className="font-medium">
              Powered by <span className="text-blue-600 font-bold">OFFO Labs</span> Risk Intelligence Engine · v1.0 · <span className="text-red-600">Confidential</span>
            </p>
          </div>
        </footer>
    </main>
  );
}
