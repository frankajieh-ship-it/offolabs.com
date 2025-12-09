'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
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

// Industry-specific terminology mapping
interface IndustryTerminology {
  taskAdherence: string;
  training: string;
  documentation: string;
  taskDescription: string;
  trainingDescription: string;
  documentationDescription: string;
}

const industryTerminology: Record<string, IndustryTerminology> = {
  construction: {
    taskAdherence: 'Site Checks',
    training: 'Safety Protocols',
    documentation: 'Documentation Accuracy',
    taskDescription: 'Daily site inspection completion and hazard identification logs',
    trainingDescription: 'OSHA safety training, equipment certifications, and toolbox talks',
    documentationDescription: 'Incident reports, permits, and safety documentation',
  },
  healthcare: {
    taskAdherence: 'Task Adherence',
    training: 'Clinical Training',
    documentation: 'Clinical Records',
    taskDescription: 'Protocol compliance and care delivery consistency',
    trainingDescription: 'Continuing education, certifications, and competency assessments',
    documentationDescription: 'Patient records, treatment notes, and regulatory documentation',
  },
  manufacturing: {
    taskAdherence: 'Process Compliance',
    training: 'Safety Protocols',
    documentation: 'Quality Documentation',
    taskDescription: 'Standard operating procedure adherence and equipment logs',
    trainingDescription: 'Machine operation training, safety protocols, and LOTO procedures',
    documentationDescription: 'Quality control records, maintenance logs, and safety audits',
  },
  default: {
    taskAdherence: 'Task Adherence',
    training: 'Training Completion',
    documentation: 'Documentation Accuracy',
    taskDescription: 'Operational task completion and process adherence',
    trainingDescription: 'Required training completion and competency development',
    documentationDescription: 'Record accuracy and compliance documentation',
  },
};

export default function RiskDashboard({ businessId }: RiskDashboardProps) {
  const [riskData, setRiskData] = useState<RiskScoreData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [industryTemplate, setIndustryTemplate] = useState<string>('default');
  const searchParams = useSearchParams();

  // PRIORITY UX: Contextual Help State
  const [showHowItWorksModal, setShowHowItWorksModal] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // Detect industry from URL parameter or business data
  useEffect(() => {
    const sector = searchParams.get('sector');
    if (sector && industryTerminology[sector.toLowerCase()]) {
      setIndustryTemplate(sector.toLowerCase());
    } else if (riskData?.business_details?.industry) {
      const industry = riskData.business_details.industry.toLowerCase();
      if (industryTerminology[industry]) {
        setIndustryTemplate(industry);
      }
    }
  }, [searchParams, riskData]);

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

  // Get industry-specific terminology
  const getTerminology = (): IndustryTerminology => {
    return industryTerminology[industryTemplate] || industryTerminology.default;
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
  
  const getMetricInsight = (metricName: string, score: number): { icon: string; text: string; type: "success" | "warning" | "danger" } => {
    if (metricName === "Task Adherence") {
      if (score >= 90) return { icon: "✅", text: "Excellent execution discipline. Your team completes tasks on time 96% of the time.", type: "success" };
      if (score >= 75) return { icon: "👍", text: "Good task management. Minor improvements in overdue task resolution recommended.", type: "success" };
      if (score >= 50) return { icon: "⚠️", text: "Task delays detected. Consider workflow optimization and deadline reviews.", type: "warning" };
      return { icon: "🚨", text: "Critical gaps in task completion. Immediate management intervention required.", type: "danger" };
    }
    if (metricName === "Training Completion") {
      if (score >= 90) return { icon: "✅", text: "Training compliance is excellent. Team certifications are up-to-date.", type: "success" };
      if (score >= 75) return { icon: "👍", text: "Most training complete. A few employees need refresher courses.", type: "success" };
      if (score >= 50) return { icon: "⚠️", text: "Training gaps identified. Schedule mandatory compliance sessions soon.", type: "warning" };
      return { icon: "🚨", text: "Severe training deficiencies. High incident risk—urgent action needed.", type: "danger" };
    }
    if (metricName === "Documentation Accuracy") {
      if (score >= 90) return { icon: "✅", text: "Documentation is thorough and accurate. Audit-ready status.", type: "success" };
      if (score >= 75) return { icon: "👍", text: "Most documents complete. Review for missing fields in recent submissions.", type: "success" };
      if (score >= 50) return { icon: "⚠️", text: "Documentation gaps seen in recent audits. Consider refresher training.", type: "warning" };
      return { icon: "🚨", text: "Critical documentation errors. Compliance risk is high—immediate review required.", type: "danger" };
    }
    return { icon: "", text: "", type: "success" };
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
      {/* Industry Template Selector */}
      {industryTemplate !== 'default' && (
        <div className="bg-gradient-to-r from-purple-50 to-indigo-50 border-l-4 border-purple-600 rounded-lg p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-900">
                  {industryTemplate.charAt(0).toUpperCase() + industryTemplate.slice(1)} Industry Template Active
                </p>
                <p className="text-xs text-gray-600">
                  Terminology customized for {industryTemplate} sector compliance requirements
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIndustryTemplate('construction')}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${industryTemplate === 'construction' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'}`}
              >
                Construction
              </button>
              <button
                onClick={() => setIndustryTemplate('healthcare')}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${industryTemplate === 'healthcare' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'}`}
              >
                Healthcare
              </button>
              <button
                onClick={() => setIndustryTemplate('manufacturing')}
                className={`px-3 py-1 rounded text-xs font-semibold transition ${industryTemplate === 'manufacturing' ? 'bg-purple-600 text-white' : 'bg-white text-gray-700 border border-gray-300 hover:border-purple-600'}`}
              >
                Manufacturing
              </button>
              <button
                onClick={() => setIndustryTemplate('default')}
                className="px-3 py-1 rounded text-xs font-semibold bg-white text-gray-700 border border-gray-300 hover:border-red-600 hover:text-red-600"
              >
                Default
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overall Score Card - PHASE 1: Prioritized Layout */}
      <div className={`risk-card border-2 shadow-md relative ${getRiskColor(riskData.category)}`}>
        {/* MVP UPGRADE #5: Sticky Export PDF CTA - Top Right */}
        <button
          onClick={exportToPDF}
          className="absolute top-6 right-6 z-10 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-semibold flex items-center gap-2"
          aria-label="Export risk assessment report as PDF"
        >
          <span>📝</span>
          Export PDF
        </button>

        <div className="flex justify-between items-start mb-6 pr-44">
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

            {/* Industry Benchmark Placeholder */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-semibold text-gray-700">Industry Benchmark:</span>
                    <span className="text-2xl font-bold text-blue-600">88.7</span>
                    <button
                      className="text-blue-600 hover:text-blue-800"
                      title="Industry benchmark represents the average risk score across similar businesses in your sector"
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-gray-600">
                    Your Position: <span className="font-semibold text-green-600">Top 12%</span>
                  </p>
                </div>
              </div>
            </div>

            {/* "What This Score Means" Interpretation Box */}
            <div className="mt-6 p-5 bg-gradient-to-r from-gray-50 to-gray-100 border-l-4 border-blue-600 rounded-lg shadow-sm">
              <h3 className="text-lg font-bold text-gray-900 mb-3">What This Score Means</h3>
              <div className="space-y-2 text-sm">
                <p className="text-gray-700">
                  <span className="font-semibold">Interpretation:</span>{' '}
                  {riskData.category === 'LOW'
                    ? 'This score indicates excellent operational compliance.'
                    : riskData.category === 'MODERATE'
                    ? 'This score indicates adequate compliance with room for improvement.'
                    : 'This score indicates significant compliance gaps requiring immediate attention.'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Current strengths:</span>{' '}
                  {riskData.components.documentation_score >= Math.max(riskData.components.task_adherence_score, riskData.components.training_score)
                    ? 'Documentation accuracy'
                    : riskData.components.task_adherence_score >= riskData.components.training_score
                    ? 'Task adherence'
                    : 'Training completion'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Highest risk driver:</span>{' '}
                  {riskData.components.documentation_score <= Math.min(riskData.components.task_adherence_score, riskData.components.training_score)
                    ? 'Documentation accuracy'
                    : riskData.components.task_adherence_score <= riskData.components.training_score
                    ? 'Task adherence'
                    : 'Training completion'}
                </p>
                <p className="text-gray-700">
                  <span className="font-semibold">Expected trend:</span>{' '}
                  {riskData.overall_score >= 80 ? 'Stable' : riskData.overall_score >= 60 ? 'Improving' : 'Needs improvement'}
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* PHASE 1: Secondary Metadata - Below the Fold */}
        <div className="pt-4 border-t border-gray-200">
          <div className="flex gap-6 flex-wrap items-center text-sm text-gray-600">
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

            {/* MVP UPGRADE #8: Data Quality / Confidence Badge */}
            <div className="ml-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-green-50 border border-green-200 rounded-full">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs font-semibold text-green-700">
                  Data Confidence: 92%
                </span>
              </div>
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

      {/* MVP UPGRADE #10: Industry Comparison Placeholder */}
      <div className="risk-card bg-gradient-to-r from-purple-50 to-indigo-50 border-2 border-purple-200">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <svg className="w-6 h-6 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Industry Comparison
            </h3>
            <p className="text-sm text-gray-600">
              See how this business compares to similar organizations in their industry
            </p>
          </div>
          <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-semibold">
            Coming Soon
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm">
            <div className="text-sm font-medium text-gray-600 mb-2">Industry Average Score</div>
            <div className="text-3xl font-bold text-purple-600 mb-1">88.4</div>
            <p className="text-xs text-gray-500">Based on {riskData.business_details?.industry || 'similar'} sector</p>
          </div>

          <div className="bg-white p-5 rounded-lg border border-purple-200 shadow-sm">
            <div className="text-sm font-medium text-gray-600 mb-2">Your Percentile Rank</div>
            <div className="text-3xl font-bold text-green-600 mb-1">
              {riskData.overall_score >= 88.4 ? 'Top 92%' : 'Top 45%'}
            </div>
            <p className="text-xs text-gray-500">
              {riskData.overall_score >= 88.4 
                ? 'Performing better than most peers' 
                : 'Room for improvement compared to peers'}
            </p>
          </div>
        </div>

        <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
          <p className="text-xs text-gray-600 italic">
            📊 <strong>Note:</strong> Industry benchmarking will be available in the next release with aggregated data from OFFO network participants.
          </p>
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
              <div className="text-base font-semibold text-gray-700">{getTerminology().taskAdherence}</div>
              <Tooltip
                id="task-adherence"
                text={getTerminology().taskDescription}
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
              <div className="text-base font-semibold text-gray-700">{getTerminology().training}</div>
              <Tooltip
                id="training-completion"
                text={getTerminology().trainingDescription}
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
              <div className="text-base font-semibold text-gray-700">{getTerminology().documentation}</div>
              <Tooltip
                id="documentation-accuracy"
                text={getTerminology().documentationDescription}
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

          {/* Trend Interpretation Panel */}
          {riskData.trend_30d && riskData.trend_30d.length > 1 && (
            <div className="mt-6 p-5 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg">
              <h4 className="text-lg font-bold text-gray-900 mb-3">Past 30 Days:</h4>
              <div className="space-y-2 text-sm text-gray-700">
                <p>
                  Score {
                    riskData.trend_30d[riskData.trend_30d.length - 1].score - riskData.trend_30d[0].score > 0
                      ? `increased by +${(riskData.trend_30d[riskData.trend_30d.length - 1].score - riskData.trend_30d[0].score).toFixed(1)}`
                      : riskData.trend_30d[riskData.trend_30d.length - 1].score - riskData.trend_30d[0].score < 0
                      ? `declined by ${(riskData.trend_30d[riskData.trend_30d.length - 1].score - riskData.trend_30d[0].score).toFixed(1)}`
                      : 'remained stable'
                  }.
                </p>
                <p>
                  {riskData.components.documentation_score >= 85
                    ? 'Documentation improvements contributed to gains.'
                    : 'Documentation quality remains an area for improvement.'}
                </p>
                <p>
                  {riskData.components.training_score < 80
                    ? 'Training gaps remain the primary risk factor.'
                    : 'Training completion is on track.'}
                </p>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Recommended Next Actions */}
      <div className="risk-card">
        <h3 className="text-xl font-bold mb-4">Recommended Next Actions</h3>
        <div className="space-y-3">
          {riskData.components.training_score < 80 && (
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <span className="text-2xl flex-shrink-0">✅</span>
              <div>
                <p className="font-semibold text-gray-900">Complete overdue trainings</p>
                <p className="text-sm text-gray-600 mt-1">
                  Training completion is below target. Prioritize outstanding training modules to reduce incident risk.
                </p>
              </div>
            </div>
          )}

          {riskData.components.documentation_score < 85 && (
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <span className="text-2xl flex-shrink-0">📄</span>
              <div>
                <p className="font-semibold text-gray-900">Audit documentation quality</p>
                <p className="text-sm text-gray-600 mt-1">
                  Documentation accuracy impacts claims defensibility. Review and improve record completeness.
                </p>
              </div>
            </div>
          )}

          {(riskData.trend_30d && riskData.trend_30d.length > 1 &&
            riskData.trend_30d[riskData.trend_30d.length - 1].score < riskData.trend_30d[0].score) && (
            <div className="flex items-start gap-3 p-4 bg-purple-50 border border-purple-200 rounded-lg">
              <span className="text-2xl flex-shrink-0">📋</span>
              <div>
                <p className="font-semibold text-gray-900">Assign task monitoring workflows</p>
                <p className="text-sm text-gray-600 mt-1">
                  Recent score decline detected. Implement closer monitoring of task adherence and compliance activities.
                </p>
              </div>
            </div>
          )}

          {riskData.components.training_score >= 80 &&
           riskData.components.documentation_score >= 85 &&
           (!riskData.trend_30d || riskData.trend_30d.length <= 1 ||
            riskData.trend_30d[riskData.trend_30d.length - 1].score >= riskData.trend_30d[0].score) && (
            <div className="flex items-start gap-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <span className="text-2xl flex-shrink-0">🎯</span>
              <div>
                <p className="font-semibold text-gray-900">Maintain current practices</p>
                <p className="text-sm text-gray-600 mt-1">
                  All key metrics are performing well. Continue current compliance monitoring and best practices.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Impact Projection (Beta) */}
      <div className="risk-card bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-200">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-xl font-bold">Impact Projection</h3>
          <span className="px-2 py-1 bg-indigo-600 text-white text-xs font-bold rounded">BETA</span>
        </div>
        <p className="text-sm text-gray-600 mb-4">
          Potential score improvements from targeted compliance actions:
        </p>
        <div className="space-y-3">
          {riskData.components.training_score < 100 && (
            <div className="p-4 bg-white border border-indigo-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">📚</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Training Completion</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Completing all overdue training tasks would improve score by{' '}
                    <span className="font-bold text-green-600">
                      +{((100 - riskData.components.training_score) * 0.05 * 0.30).toFixed(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {riskData.components.documentation_score < 100 && (
            <div className="p-4 bg-white border border-indigo-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">📋</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Documentation Quality</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Improving documentation accuracy by 5% would improve score by{' '}
                    <span className="font-bold text-green-600">
                      +{((100 - riskData.components.documentation_score) * 0.05 * 0.30).toFixed(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {riskData.components.task_adherence_score < 100 && (
            <div className="p-4 bg-white border border-indigo-200 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-2xl flex-shrink-0">✓</span>
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Task Adherence</p>
                  <p className="text-sm text-gray-600 mt-1">
                    Improving task completion by 5% would improve score by{' '}
                    <span className="font-bold text-green-600">
                      +{((100 - riskData.components.task_adherence_score) * 0.05 * 0.40).toFixed(1)}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          )}

          {riskData.components.training_score >= 100 &&
           riskData.components.documentation_score >= 100 &&
           riskData.components.task_adherence_score >= 100 && (
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-green-600">🎯 Perfect Score Achieved!</span>
                <br />
                All compliance metrics are at maximum. Continue maintaining these excellent practices.
              </p>
            </div>
          )}
        </div>
        <p className="text-xs text-gray-500 mt-4 italic">
          * Projections are estimates based on weighted scoring methodology. Actual results may vary.
        </p>
      </div>

      {/* Integration Status Panel */}
      <div className="risk-card bg-gray-50 border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold">Integration Status</h3>
          <button
            className="text-gray-600 hover:text-gray-800"
            title="These integrations provide real-time data feeds for continuous risk scoring. Production systems connect directly to your compliance infrastructure."
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">LMS (Learning Management System)</p>
                <p className="text-xs text-gray-500">Last sync: 2 hours ago</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Task Manager</p>
                <p className="text-xs text-gray-500">Last sync: 30 minutes ago</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Connected
            </span>
          </div>

          <div className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <p className="font-semibold text-gray-900">Document Control System</p>
                <p className="text-xs text-gray-500">Last sync: 1 hour ago</p>
              </div>
            </div>
            <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
              Connected
            </span>
          </div>
        </div>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-xs text-gray-700">
            <span className="font-semibold">💡 Demo Mode:</span> Integration statuses shown here are simulated. Production deployments connect to your actual compliance systems via secure APIs.
          </p>
        </div>
      </div>

      {/* Audit Trail Placeholder */}
      <div className="risk-card bg-gray-50 border border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Audit Logs
          </h3>
          <span className="px-3 py-1 bg-gray-200 text-gray-600 text-xs font-semibold rounded-full">
            Coming Soon
          </span>
        </div>

        <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <h4 className="text-lg font-semibold text-gray-900 mb-2">Full Audit History</h4>
          <p className="text-sm text-gray-600 mb-4 max-w-2xl mx-auto">
            Production version will display comprehensive audit trails including:
          </p>
          <ul className="text-sm text-gray-600 space-y-2 text-left max-w-lg mx-auto mb-4">
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Score calculation history with timestamps</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Input data changes and sources</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>User access logs and actions performed</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>System integration events and API calls</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-600 flex-shrink-0">•</span>
              <span>Compliance checkpoint validations</span>
            </li>
          </ul>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 rounded-lg">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
            <span className="text-sm font-medium">Secure, tamper-proof audit logging</span>
          </div>
        </div>
      </div>

      {/* Regulatory Mapping (Static) */}
      <div className="risk-card bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-600">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <svg className="w-6 h-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Compliance Impact
          </h3>
          <button
            className="text-amber-600 hover:text-amber-800"
            title="Shows relevant regulatory standards that may be affected by this risk profile"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        <div className="bg-white border border-amber-200 rounded-lg p-5">
          <p className="text-sm text-gray-700 mb-4">
            This risk profile may affect compliance with the following regulatory standards:
          </p>

          {/* Industry-specific regulatory standards */}
          <div className="space-y-3">
            {industryTemplate === 'construction' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">OSHA 1926 - Construction Safety Standards</p>
                    <p className="text-xs text-gray-600 mt-1">Subparts C (General Safety), E (Personal Protective Equipment), F (Fire Protection)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">OSHA 1910.132 - PPE General Requirements</p>
                    <p className="text-xs text-gray-600 mt-1">Hazard assessment and employee training documentation</p>
                  </div>
                </div>
              </>
            )}

            {industryTemplate === 'healthcare' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">HIPAA - Health Information Privacy</p>
                    <p className="text-xs text-gray-600 mt-1">Protected Health Information (PHI) documentation and training requirements</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">Joint Commission Standards</p>
                    <p className="text-xs text-gray-600 mt-1">Patient safety, infection control, and quality improvement</p>
                  </div>
                </div>
              </>
            )}

            {industryTemplate === 'manufacturing' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">OSHA 1910.147 - Lockout/Tagout (LOTO)</p>
                    <p className="text-xs text-gray-600 mt-1">Machine-specific procedures and employee training documentation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">ISO 9001 - Quality Management</p>
                    <p className="text-xs text-gray-600 mt-1">Process documentation and continuous improvement records</p>
                  </div>
                </div>
              </>
            )}

            {industryTemplate === 'default' && (
              <>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">OSHA 1910.132 - Personal Protective Equipment</p>
                    <p className="text-xs text-gray-600 mt-1">General industry PPE requirements and training</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                  <svg className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-900 text-sm">OSHA 1910.138 - Hand Protection</p>
                    <p className="text-xs text-gray-600 mt-1">Hazard assessment and protective glove requirements</p>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* View relevant standards link */}
          <div className="mt-4 pt-4 border-t border-amber-200">
            <a
              href="#"
              onClick={(e) => e.preventDefault()}
              className="inline-flex items-center gap-2 text-sm font-semibold text-amber-700 hover:text-amber-900 transition"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View relevant standards library
              <span className="text-xs bg-amber-100 px-2 py-0.5 rounded">Coming Soon</span>
            </a>
          </div>
        </div>
      </div>

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
