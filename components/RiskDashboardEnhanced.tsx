'use client';

import RiskScoreGauge from './RiskScoreGauge';
import TrendLine30d from './TrendLine30d';
import DriversOfRisk from './DriversOfRisk';
import RecommendedActions from './RecommendedActions';

interface RiskData {
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
  trend_30d?: Array<{ date: string; score: number }>;
  drivers?: Array<{
    label: string;
    impact: 'positive' | 'neutral' | 'negative';
    description: string;
  }>;
  recommended_actions?: string[];
}

interface RiskDashboardProps {
  data: RiskData;
}

export function RiskDashboard({ data }: RiskDashboardProps) {
  const exportToPDF = () => {
    window.print();
  };

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

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Risk Intelligence Dashboard
            </h1>
            <div className="flex items-center gap-4">
              <p className="text-gray-600">Business ID: {data.business_id}</p>
              <span
                className={`px-4 py-1 rounded-full font-semibold text-sm ${getRiskColor(
                  data.category
                )}`}
              >
                {data.category} RISK
              </span>
            </div>
          </div>
          <button
            onClick={exportToPDF}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition print:hidden"
          >
            Export PDF
          </button>
        </div>
      </div>

      {/* Main Grid: Risk Score Gauge + Trend Line */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Risk Score Gauge */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Risk Score</h2>
          <RiskScoreGauge score={data.overall_score} category={data.category} />
        </div>

        {/* Right: 30-day Trend Line */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">30-Day Trend</h2>
          <TrendLine30d trend={data.trend_30d || []} />
        </div>
      </div>

      {/* Component Breakdown */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Component Breakdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Task Adherence</div>
            <div className="text-3xl font-bold text-gray-900">
              {data.components.task_adherence_score}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Weight: {data.weights.task_adherence * 100}%
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Training Completion</div>
            <div className="text-3xl font-bold text-gray-900">
              {data.components.training_score}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Weight: {data.weights.training_completion * 100}%
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="text-sm text-gray-600 mb-1">Documentation Accuracy</div>
            <div className="text-3xl font-bold text-gray-900">
              {data.components.documentation_score}
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Weight: {data.weights.documentation_accuracy * 100}%
            </div>
          </div>
        </div>
      </div>

      {/* Lower Section: Drivers of Risk + Recommended Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Drivers of Risk */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Drivers of Risk</h2>
          <DriversOfRisk drivers={data.drivers || []} />
        </div>

        {/* Recommended Actions */}
        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended Actions</h2>
          <RecommendedActions
            actions={data.recommended_actions || []}
            category={data.category}
          />
        </div>
      </div>
    </div>
  );
}
