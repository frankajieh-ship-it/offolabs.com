'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

interface BusinessRiskData {
  id: string;
  name: string;
  score: number;
  category: 'LOW' | 'MODERATE' | 'HIGH';
  scoreChange: number; // 30-day change
  components: {
    task_adherence: number;
    training: number;
    documentation: number;
  };
}

// Mock data for enterprise portfolio
const mockBusinessData: BusinessRiskData[] = [
  { id: '1', name: 'Acme Manufacturing', score: 92.4, category: 'LOW', scoreChange: 2.3, components: { task_adherence: 94, training: 91, documentation: 92 } },
  { id: '2', name: 'Global Tech Solutions', score: 88.7, category: 'LOW', scoreChange: -1.2, components: { task_adherence: 89, training: 88, documentation: 89 } },
  { id: '3', name: 'Riverside Logistics', score: 85.3, category: 'LOW', scoreChange: 4.1, components: { task_adherence: 86, training: 84, documentation: 86 } },
  { id: '4', name: 'MetroHealth Services', score: 78.2, category: 'MODERATE', scoreChange: -3.5, components: { task_adherence: 80, training: 75, documentation: 79 } },
  { id: '5', name: 'Pioneer Construction', score: 74.9, category: 'MODERATE', scoreChange: 1.8, components: { task_adherence: 76, training: 72, documentation: 76 } },
  { id: '6', name: 'Coastal Retail Group', score: 71.5, category: 'MODERATE', scoreChange: -2.1, components: { task_adherence: 73, training: 69, documentation: 72 } },
  { id: '7', name: 'Summit Energy Corp', score: 68.4, category: 'MODERATE', scoreChange: 0.5, components: { task_adherence: 70, training: 66, documentation: 69 } },
  { id: '8', name: 'Valley Foods Inc', score: 63.2, category: 'MODERATE', scoreChange: -4.2, components: { task_adherence: 65, training: 60, documentation: 64 } },
  { id: '9', name: 'Northern Transport', score: 58.7, category: 'HIGH', scoreChange: -1.8, components: { task_adherence: 61, training: 55, documentation: 60 } },
  { id: '10', name: 'Eastside Industrial', score: 52.3, category: 'HIGH', scoreChange: -5.7, components: { task_adherence: 55, training: 48, documentation: 54 } },
];

// Calculate histogram data
const getHistogramData = () => {
  const bins = [
    { range: '0-50', count: 0, color: '#DC2626' }, // red
    { range: '50-60', count: 0, color: '#F59E0B' }, // amber
    { range: '60-70', count: 0, color: '#F59E0B' },
    { range: '70-80', count: 0, color: '#10B981' }, // green
    { range: '80-90', count: 0, color: '#10B981' },
    { range: '90-100', count: 0, color: '#10B981' },
  ];

  mockBusinessData.forEach((business) => {
    const score = business.score;
    if (score < 50) bins[0].count++;
    else if (score < 60) bins[1].count++;
    else if (score < 70) bins[2].count++;
    else if (score < 80) bins[3].count++;
    else if (score < 90) bins[4].count++;
    else bins[5].count++;
  });

  return bins;
};

// Calculate top enterprise drivers
const getTopDrivers = () => {
  const totalBusinesses = mockBusinessData.length;
  let taskIssues = 0;
  let trainingIssues = 0;
  let documentationIssues = 0;

  mockBusinessData.forEach((business) => {
    if (business.components.task_adherence < 80) taskIssues++;
    if (business.components.training < 80) trainingIssues++;
    if (business.components.documentation < 80) documentationIssues++;
  });

  return [
    { name: 'Training Completion', affectedBusinesses: trainingIssues, percentage: ((trainingIssues / totalBusinesses) * 100).toFixed(0) },
    { name: 'Task Adherence', affectedBusinesses: taskIssues, percentage: ((taskIssues / totalBusinesses) * 100).toFixed(0) },
    { name: 'Documentation Quality', affectedBusinesses: documentationIssues, percentage: ((documentationIssues / totalBusinesses) * 100).toFixed(0) },
  ].sort((a, b) => b.affectedBusinesses - a.affectedBusinesses);
};

export default function EnterpriseDashboardPage() {
  const [sortBy, setSortBy] = useState<'score' | 'change'>('score');

  const histogramData = getHistogramData();
  const topDrivers = getTopDrivers();

  const averageScore = (mockBusinessData.reduce((sum, b) => sum + b.score, 0) / mockBusinessData.length).toFixed(1);
  const lowRiskCount = mockBusinessData.filter(b => b.category === 'LOW').length;
  const moderateRiskCount = mockBusinessData.filter(b => b.category === 'MODERATE').length;
  const highRiskCount = mockBusinessData.filter(b => b.category === 'HIGH').length;

  const sortedBusinesses = [...mockBusinessData].sort((a, b) => {
    if (sortBy === 'score') return b.score - a.score;
    return Math.abs(b.scoreChange) - Math.abs(a.scoreChange);
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'LOW': return 'text-green-600 bg-green-100';
      case 'MODERATE': return 'text-yellow-600 bg-yellow-100';
      case 'HIGH': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <Link href="/" className="inline-block">
              <img
                src="/OFFO_LAB_logo.png"
                alt="OFFO LAB"
                className="h-10 w-auto"
              />
            </Link>
            <Link
              href="/"
              className="text-sm font-semibold text-blue-600 hover:text-blue-700"
            >
              ← Back to Main Dashboard
            </Link>
          </div>
        </div>
      </header>

      {/* Page Title */}
      <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-8">
          <h1 className="text-4xl font-bold mb-3">Enterprise Risk Dashboard</h1>
          <p className="text-xl text-blue-100">
            Portfolio-wide behavioral risk intelligence across {mockBusinessData.length} business entities
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-8 py-8">
        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Portfolio Average</p>
                <p className="text-3xl font-bold text-blue-600">{averageScore}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-green-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Low Risk</p>
                <p className="text-3xl font-bold text-green-600">{lowRiskCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-yellow-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">Moderate Risk</p>
                <p className="text-3xl font-bold text-yellow-600">{moderateRiskCount}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md border border-red-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-gray-600 mb-1">High Risk</p>
                <p className="text-3xl font-bold text-red-600">{highRiskCount}</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Two-column layout for charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Risk Score Distribution Histogram */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4">Risk Score Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={histogramData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="range" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {histogramData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
            <div className="mt-4 flex justify-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-green-500 rounded"></div>
                <span className="text-gray-700">Low Risk (70-100)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-amber-500 rounded"></div>
                <span className="text-gray-700">Moderate (50-70)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 bg-red-600 rounded"></div>
                <span className="text-gray-700">High Risk (0-50)</span>
              </div>
            </div>
          </div>

          {/* Top Enterprise-Wide Risk Drivers */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
            <h3 className="text-xl font-bold mb-4">Top Enterprise-Wide Risk Drivers</h3>
            <p className="text-sm text-gray-600 mb-4">
              Components affecting the most business entities across your portfolio
            </p>
            <div className="space-y-4">
              {topDrivers.map((driver, index) => (
                <div key={index} className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className={`px-2 py-1 rounded font-bold text-sm ${
                        index === 0 ? 'bg-red-100 text-red-700' :
                        index === 1 ? 'bg-amber-100 text-amber-700' :
                        'bg-blue-100 text-blue-700'
                      }`}>
                        #{index + 1}
                      </span>
                      <p className="font-semibold text-gray-900">{driver.name}</p>
                    </div>
                    <span className="text-lg font-bold text-gray-900">{driver.percentage}%</span>
                  </div>
                  <p className="text-sm text-gray-600 ml-12">
                    Affects <span className="font-semibold">{driver.affectedBusinesses} of {mockBusinessData.length}</span> business entities
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Trending Businesses */}
        <div className="bg-white rounded-lg shadow-md border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold">All Business Entities</h3>
            <div className="flex gap-2">
              <button
                onClick={() => setSortBy('score')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  sortBy === 'score'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sort by Score
              </button>
              <button
                onClick={() => setSortBy('change')}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  sortBy === 'change'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Sort by Change
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Business Name</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Risk Score</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">Category</th>
                  <th className="text-center py-3 px-4 font-semibold text-gray-700">30-Day Change</th>
                  <th className="text-right py-3 px-4 font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {sortedBusinesses.map((business) => (
                  <tr key={business.id} className="border-b border-gray-100 hover:bg-gray-50 transition">
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-900">{business.name}</p>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className="text-2xl font-bold text-gray-900">{business.score}</span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(business.category)}`}>
                        {business.category}
                      </span>
                    </td>
                    <td className="text-center py-3 px-4">
                      <span className={`font-semibold ${
                        business.scoreChange > 0 ? 'text-green-600' :
                        business.scoreChange < 0 ? 'text-red-600' :
                        'text-gray-600'
                      }`}>
                        {business.scoreChange > 0 ? '+' : ''}{business.scoreChange.toFixed(1)}
                      </span>
                    </td>
                    <td className="text-right py-3 px-4">
                      <Link
                        href={`/risk/${business.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm"
                      >
                        View Details →
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* MVP Disclaimer */}
        <div className="mt-8 bg-gray-100 border border-gray-300 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-gray-900 mb-1">MVP Demonstration Mode:</h3>
              <p className="text-sm text-gray-700">
                This enterprise dashboard displays simulated data. Production deployments aggregate real-time risk scores across your entire portfolio of business entities.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-7xl mx-auto px-8">
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
