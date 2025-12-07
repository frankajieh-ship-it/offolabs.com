'use client';

import { useEffect, useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import jsPDF from 'jspdf';
import { authService } from '@/lib/auth';

interface RiskScoreData {
  business_id: string;
  overall_score: number;
  category: string;
  components: {
    task_adherence_score: number;
    training_score: number;
    documentation_score: number;
  };
  weights: {
    task_adherence: number;
    training_completion: number;
    documentation_accuracy: number;
  };
  trend_30d?: Array<{
    date: string;
    score: number;
  }>;
  business_details?: {
    employee_count: number | null;
    industry: string;
    location: string;
    risk_profile: string;
  };
  drivers?: Array<{
    label: string;
    impact: string;
    description: string;
  }>;
  recommended_actions?: string[];
}

interface RiskDashboardProps {
  businessId: string;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export default function RiskDashboard({ businessId }: RiskDashboardProps) {
  const [riskData, setRiskData] = useState<RiskScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // PRIORITY UX: Contextual Help State
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  useEffect(() => {
    fetchRiskScore();
  }, [businessId]);

  const fetchRiskScore = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await authService.fetchWithAuth(`${API_BASE_URL}/risk-score/${businessId}`);

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setRiskData(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch risk score');
    } finally {
      setLoading(false);
    }
  };

  const exportToPDF = async () => {
    if (!businessId) return;

    try {
      // Fetch PDF from backend
      const response = await authService.fetchWithAuth(`${API_BASE_URL}/risk-score/${businessId}/pdf`);

      if (!response.ok) {
        throw new Error('Failed to generate PDF');
      }

      // Get PDF as blob
      const blob = await response.blob();

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `OFFO_Risk_Report_${businessId}_${new Date().toISOString().split('T')[0]}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error('PDF export failed:', err);
      alert('Failed to export PDF. Please try again.');
    }
  };

  // Old client-side PDF function (deprecated)
  const exportToPDF_OLD = () => {
    if (!riskData) return;

    const doc = new jsPDF();

    // Header
    doc.setFontSize(20);
    doc.text('OFFO Risk Assessment Report', 20, 20);

    doc.setFontSize(12);
    doc.text(`Business ID: ${riskData.business_id}`, 20, 35);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 42);

    // Overall Score
    doc.setFontSize(16);
    doc.text('Overall Risk Score', 20, 60);
    doc.setFontSize(14);
    doc.text(`${riskData.overall_score} / 100`, 20, 70);
    doc.text(`Category: ${riskData.category} RISK`, 20, 80);

    // Components
    doc.setFontSize(16);
    doc.text('Component Scores', 20, 100);
    doc.setFontSize(12);
    doc.text(`Task Adherence: ${riskData.components.task_adherence_score} (${riskData.weights.task_adherence * 100}% weight)`, 20, 110);
    doc.text(`Training Completion: ${riskData.components.training_score} (${riskData.weights.training_completion * 100}% weight)`, 20, 120);
    doc.text(`Documentation Accuracy: ${riskData.components.documentation_score} (${riskData.weights.documentation_accuracy * 100}% weight)`, 20, 130);

    // Recommendation
    doc.setFontSize(16);
    doc.text('Recommendations', 20, 150);
    doc.setFontSize(11);

    if (riskData.category === 'HIGH') {
      doc.text('• Immediate action required - significant compliance gaps detected', 20, 160);
      doc.text('• Review and address task completion rates', 20, 167);
      doc.text('• Ensure all required training is completed', 20, 174);
      doc.text('• Audit documentation processes for accuracy', 20, 181);
    } else if (riskData.category === 'MODERATE') {
      doc.text('• Some areas need attention to prevent escalation', 20, 160);
      doc.text('• Monitor task completion trends closely', 20, 167);
      doc.text('• Address training gaps promptly', 20, 174);
    } else {
      doc.text('• Continue current compliance practices', 20, 160);
      doc.text('• Maintain regular monitoring and reviews', 20, 167);
    }

    doc.save(`offo-risk-report-${businessId}-${Date.now()}.pdf`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading risk assessment...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-300 rounded-lg p-6">
        <h3 className="text-red-800 font-semibold mb-2">Error</h3>
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchRiskScore}
          className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!riskData) {
    return null;
  }

  const getRiskColor = (category: string) => {
    switch (category) {
      case 'LOW':
        return 'bg-green-100 border-green-300 text-green-800';
      case 'MODERATE':
        return 'bg-yellow-100 border-yellow-300 text-yellow-800';
      case 'HIGH':
        return 'bg-red-100 border-red-300 text-red-800';
      default:
        return 'bg-gray-100 border-gray-300 text-gray-800';
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  const chartData = [
    {
      name: 'Task Adherence',
      score: riskData.components.task_adherence_score,
      weight: riskData.weights.task_adherence * 100,
    },
    {
      name: 'Training',
      score: riskData.components.training_score,
      weight: riskData.weights.training_completion * 100,
    },
    {
      name: 'Documentation',
      score: riskData.components.documentation_score,
      weight: riskData.weights.documentation_accuracy * 100,
    },
  ];

  // PRIORITY UX: Tooltip Component
  const Tooltip = ({ id, text }: { id: string; text: string }) => (
    <div className="relative inline-block ml-2">
      <button
        onMouseEnter={() => setActiveTooltip(id)}
        onMouseLeave={() => setActiveTooltip(null)}
        onClick={() => setActiveTooltip(activeTooltip === id ? null : id)}
        className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none"
        aria-label={`More information about ${id}`}
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </button>
      {activeTooltip === id && (
        <div className="absolute z-10 w-64 p-3 mt-2 text-sm text-gray-700 bg-white border border-gray-300 rounded-lg shadow-lg -left-24">
          <div className="relative">
            {text}
            <div className="absolute -top-2 left-24 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white"></div>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Overall Score Card - PHASE 1: Prioritized Layout */}
      <div className={`risk-card border-2 shadow-md ${getRiskColor(riskData.category)}`}>
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            {/* PRIORITY UX: Title with Info Icon and Help Link */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="text-xl font-semibold text-gray-700">Overall Risk Score</h2>
                <Tooltip
                  id="risk-score"
                  text="0-100 score combining task adherence (40%), training completion (30%), and documentation accuracy (30%). Higher scores indicate lower risk."
                />
              </div>
              <button
                onClick={() => setShowHowItWorksModal(true)}
                className="text-sm text-blue-600 hover:text-blue-800 underline focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-2"
              >
                How Risk Score Works
              </button>
            </div>

            {/* PHASE 1: Risk Score Block - Top Priority UI Element */}
            <div className="flex items-center gap-6">
              {/* Severity Icon */}
              {riskData.category === 'LOW' && (
                <svg className="w-12 h-12 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                  <title>Low Risk Shield Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              )}
              {riskData.category === 'MODERATE' && (
                <svg className="w-12 h-12 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                  <title>Moderate Risk Warning Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              )}
              {riskData.category === 'HIGH' && (
                <svg className="w-12 h-12 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true" role="img">
                  <title>High Risk Alert Icon</title>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}

              <div className="flex items-baseline gap-4">
                {/* PHASE 1: Large, Bold Numeric Score */}
                <div
                  className={`text-5xl font-bold ${
                    riskData.category === 'LOW' ? 'text-green-600' :
                    riskData.category === 'MODERATE' ? 'text-amber-500' :
                    'text-red-600'
                  }`}
                  role="region"
                  aria-label={`Risk score ${riskData.overall_score} out of 100`}
                >
                  {riskData.overall_score}
                </div>

                {/* PHASE 1: Color-Coded Category Badge */}
                <span
                  className={`px-4 py-2 rounded-full text-lg font-bold ${
                    riskData.category === 'LOW' ? 'bg-green-100 text-green-700' :
                    riskData.category === 'MODERATE' ? 'bg-amber-100 text-amber-700' :
                    'bg-red-100 text-red-700'
                  }`}
                  role="status"
                  aria-label={`Risk category: ${riskData.category}`}
                >
                  {riskData.category} RISK
                </span>
              </div>
            </div>
          </div>

          <button
            onClick={exportToPDF}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            aria-label="Export risk assessment report as PDF"
          >
            Export PDF
          </button>
        </div>

        {/* PHASE 1: Secondary Metadata - Below the Fold */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex gap-6 text-sm text-gray-600">
            <div>
              <span className="font-medium">Business ID:</span> {riskData.business_id}
            </div>
            <div>
              <span className="font-medium">Last updated:</span> {new Date().toLocaleString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: 'numeric',
                minute: '2-digit',
                hour12: true
              })} (data refresh every 24 hours)
            </div>
          </div>
        </div>
      </div>

      {/* PRIORITY UX: Executive Summary - Visual Infographic Redesign */}
      <div className="risk-card">
        <h3 className="text-2xl font-bold text-gray-900 mb-6">Executive Summary</h3>

        {/* Visual Infographic Tiles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Top Risk Driver - RED ICON */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-red-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Red Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="text-sm font-bold text-red-600 uppercase tracking-wide mb-1">Top Risk Driver</div>
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {(() => {
                    const components = [
                      { name: 'Task Adherence', score: riskData.components.task_adherence_score },
                      { name: 'Training', score: riskData.components.training_score },
                      { name: 'Documentation', score: riskData.components.documentation_score }
                    ];
                    const lowestComponent = components.sort((a, b) => a.score - b.score)[0];
                    return lowestComponent.name;
                  })()}
                </div>
                <p className="text-xs text-gray-600">Area requiring most attention to reduce risk</p>
              </div>
            </div>
          </div>

          {/* Top Strength - GREEN ICON */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-green-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Green Icon */}
              <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="text-sm font-bold text-green-600 uppercase tracking-wide mb-1">Top Strength</div>
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {(() => {
                    const components = [
                      { name: 'Task Adherence', score: riskData.components.task_adherence_score },
                      { name: 'Training', score: riskData.components.training_score },
                      { name: 'Documentation', score: riskData.components.documentation_score }
                    ];
                    const highestComponent = components.sort((a, b) => b.score - a.score)[0];
                    return highestComponent.name;
                  })()}
                </div>
                <p className="text-xs text-gray-600">Best performing compliance area</p>
              </div>
            </div>
          </div>

          {/* Next Recommended Action - BLUE ICON */}
          <div className="bg-white p-6 rounded-xl shadow-md border-2 border-blue-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              {/* Blue Icon with Arrow */}
              <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </div>

              <div className="flex-1">
                <div className="text-sm font-bold text-blue-600 uppercase tracking-wide mb-1">Next Action</div>
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {riskData.recommended_actions && riskData.recommended_actions.length > 0
                    ? riskData.recommended_actions[0].length > 35
                      ? riskData.recommended_actions[0].substring(0, 35) + '...'
                      : riskData.recommended_actions[0]
                    : 'Review dashboard'}
                </div>
                <p className="text-xs text-gray-600">Immediate priority for improvement</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Business Details */}
      {riskData.business_details && (
        <div className="risk-card">
          <h3 className="text-xl font-bold mb-4">Business Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1 font-medium">Industry</div>
              <div className="text-sm font-semibold text-gray-900">{riskData.business_details.industry}</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1 font-medium">Location</div>
              <div className="text-sm font-semibold text-gray-900">{riskData.business_details.location}</div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1 font-medium">Employee Count</div>
              <div className="text-sm font-semibold text-gray-900">
                {riskData.business_details.employee_count ? riskData.business_details.employee_count.toLocaleString() : 'N/A'}
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="text-xs text-gray-600 mb-1 font-medium">Risk Context</div>
              <div className="text-sm font-semibold text-gray-900">
                {riskData.category === 'LOW' ? 'Low Risk' : riskData.category === 'MODERATE' ? 'Moderate Risk' : 'High Risk'}
              </div>
            </div>
          </div>

          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="text-xs text-blue-800 font-medium mb-1">Risk Profile</div>
            <div className="text-sm text-blue-900">{riskData.business_details.risk_profile}</div>
          </div>
        </div>
      )}

      {/* PHASE 1: Component Breakdown - Grouped Related Metrics */}
      <div className="risk-card">
        <h3 className="text-xl font-bold mb-6">Performance Metrics</h3>

        {/* PHASE 1: 3-Column Metric Layout with Clear Labels */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {/* Task Adherence */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="text-base font-semibold text-gray-700">Task Adherence</div>
              <Tooltip
                id="task-adherence"
                text="Measures task completion rates, overdue tasks, and adherence to safety protocols. Higher scores indicate better compliance."
              />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold" style={{ color: getScoreColor(riskData.components.task_adherence_score) }}>
                {riskData.components.task_adherence_score}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Weight: {riskData.weights.task_adherence * 100}%
            </div>
          </div>

          {/* Training Completion */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="text-base font-semibold text-gray-700">Training Completion</div>
              <Tooltip
                id="training-completion"
                text="Tracks employee training status, certification renewals, and mandatory compliance training completion. Complete training reduces incident risk."
              />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold" style={{ color: getScoreColor(riskData.components.training_score) }}>
                {riskData.components.training_score}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Weight: {riskData.weights.training_completion * 100}%
            </div>
          </div>

          {/* Documentation Accuracy */}
          <div className="p-5 bg-white border-2 border-gray-200 rounded-lg shadow-sm">
            <div className="flex items-center mb-2">
              <div className="text-base font-semibold text-gray-700">Documentation Accuracy</div>
              <Tooltip
                id="documentation-accuracy"
                text="Evaluates completeness and timeliness of safety documentation, incident reports, and compliance records. Accurate documentation supports better risk management."
              />
            </div>
            <div className="flex items-baseline gap-2">
              <div className="text-3xl font-bold" style={{ color: getScoreColor(riskData.components.documentation_score) }}>
                {riskData.components.documentation_score}
              </div>
              <div className="text-sm text-gray-500">/ 100</div>
            </div>
            <div className="text-xs text-gray-500 mt-2">
              Weight: {riskData.weights.documentation_accuracy * 100}%
            </div>
          </div>
        </div>

        {/* PHASE 1: Visual Separator */}
        <hr className="my-6 border-gray-300" />

        {/* Chart */}
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis domain={[0, 100]} />
            <RechartsTooltip />
            <Legend />
            <Bar dataKey="score" name="Score">
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={getScoreColor(entry.score)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* 30-Day Trend Chart */}
      {riskData.trend_30d && riskData.trend_30d.length > 0 && (
        <div className="risk-card">
          <h3 className="text-xl font-bold mb-4">30-Day Risk Score Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={riskData.trend_30d}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                angle={-45}
                textAnchor="end"
                height={80}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <RechartsTooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #ddd',
                  borderRadius: '8px'
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="score"
                stroke="#3b82f6"
                strokeWidth={3}
                dot={{ fill: '#3b82f6', r: 4 }}
                activeDot={{ r: 6 }}
                name="Risk Score"
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="mt-4 flex gap-4 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[#4CAF50]"></div>
              <span>Low Risk Threshold (80+)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-0.5 bg-[#F0B429]"></div>
              <span>Moderate Risk Threshold (50-79)</span>
            </div>
          </div>
        </div>
      )}

      {/* Risk Interpretation */}
      <div className="risk-card">
        <h3 className="text-xl font-bold mb-4">Risk Interpretation</h3>

        {riskData.category === 'LOW' && (
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>Low Risk:</strong> This business demonstrates excellent compliance practices.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Continue current monitoring and best practices</li>
              <li>Maintain regular compliance reviews</li>
              <li>Share successful strategies across organization</li>
            </ul>
          </div>
        )}

        {riskData.category === 'MODERATE' && (
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>Moderate Risk:</strong> Some compliance gaps exist that require attention.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Review and address areas scoring below 70</li>
              <li>Increase monitoring frequency</li>
              <li>Implement corrective action plans</li>
              <li>Schedule follow-up assessment within 30 days</li>
            </ul>
          </div>
        )}

        {riskData.category === 'HIGH' && (
          <div className="text-gray-700">
            <p className="mb-2">
              <strong>High Risk:</strong> Immediate action required to address significant compliance gaps.
            </p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>Initiate immediate remediation plan</li>
              <li>Conduct comprehensive compliance audit</li>
              <li>Assign dedicated compliance resources</li>
              <li>Weekly monitoring and reporting required</li>
              <li>Escalate to management for review</li>
            </ul>
          </div>
        )}
      </div>

      {/* PRIORITY UX: "How Risk Score Works" Modal */}
      {showHowItWorksModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4" onClick={() => setShowHowItWorksModal(false)}>
          <div className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between">
              <h3 className="text-2xl font-bold text-gray-900">How Risk Score Works</h3>
              <button
                onClick={() => setShowHowItWorksModal(false)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded p-1"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              {/* Visual Diagram */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 mb-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">📊</span> Inputs
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Task completion & overdue rates</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Training completion status</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2">•</span>
                        <span>Documentation accuracy & completeness</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">⚖️</span> Weighting
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Task Adherence: 40%</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Training Completion: 30%</strong></span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-blue-600 mr-2">•</span>
                        <span><strong>Documentation Accuracy: 30%</strong></span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center">
                      <span className="text-2xl mr-2">🎯</span> Score Meaning
                    </h4>
                    <ul className="text-sm text-gray-700 space-y-2">
                      <li className="flex items-start">
                        <span className="text-green-600 mr-2 font-bold">•</span>
                        <span><strong className="text-green-700">80-100:</strong> Low Risk (Green)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-amber-500 mr-2 font-bold">•</span>
                        <span><strong className="text-amber-700">50-79:</strong> Moderate Risk (Yellow)</span>
                      </li>
                      <li className="flex items-start">
                        <span className="text-red-600 mr-2 font-bold">•</span>
                        <span><strong className="text-red-700">0-49:</strong> High Risk (Red)</span>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Calculation:</strong> All inputs are normalized to a 0-1 scale, weighted according to their importance, and combined to produce a final 0-100 risk score. Higher scores indicate lower risk levels.
                  </p>
                </div>
              </div>

              {/* Why It Works Section */}
              <div className="mb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Why Behavioral Risk Scoring Works</h4>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="font-semibold text-gray-900 mb-1">Leading Indicators, Not Lagging Claims</h5>
                      <p className="text-sm text-gray-700">
                        Detects risk patterns before incidents occur, enabling proactive intervention instead of reactive response.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="font-semibold text-gray-900 mb-1">Captures Behavioral Drift</h5>
                      <p className="text-sm text-gray-700">
                        Monitors day-to-day compliance behaviors to identify gradual degradation in safety culture before it escalates.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <h5 className="font-semibold text-gray-900 mb-1">Measurable Risk Factors</h5>
                      <p className="text-sm text-gray-700">
                        Converts subjective compliance tasks into quantifiable metrics that drive underwriting and pricing decisions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => setShowHowItWorksModal(false)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Got It
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
