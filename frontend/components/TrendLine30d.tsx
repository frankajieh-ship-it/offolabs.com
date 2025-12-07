'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface TrendDataPoint {
  date: string;
  score: number;
}

interface TrendLine30dProps {
  trend: TrendDataPoint[];
}

export default function TrendLine30d({ trend }: TrendLine30dProps) {
  // If no trend data, show a message
  if (!trend || trend.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <p className="text-lg">No trend data available</p>
          <p className="text-sm mt-2">Historical data will appear here</p>
        </div>
      </div>
    );
  }

  // Format date for display
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-300 rounded shadow-lg">
          <p className="text-sm text-gray-600">{data.date}</p>
          <p className="text-lg font-bold" style={{ color: getScoreColor(data.score) }}>
            Score: {data.score}
          </p>
        </div>
      );
    }
    return null;
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green
    if (score >= 50) return '#f59e0b'; // yellow
    return '#ef4444'; // red
  };

  // Calculate trend direction
  const firstScore = trend[0]?.score || 0;
  const lastScore = trend[trend.length - 1]?.score || 0;
  const scoreDiff = lastScore - firstScore;
  const trendDirection = scoreDiff > 0 ? 'up' : scoreDiff < 0 ? 'down' : 'stable';

  return (
    <div>
      {/* Trend Summary */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          {trendDirection === 'up' && (
            <div className="flex items-center text-green-600">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Improving</span>
            </div>
          )}
          {trendDirection === 'down' && (
            <div className="flex items-center text-red-600">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Declining</span>
            </div>
          )}
          {trendDirection === 'stable' && (
            <div className="flex items-center text-gray-600">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-semibold">Stable</span>
            </div>
          )}
          <span className="text-sm text-gray-600">
            {scoreDiff > 0 ? '+' : ''}{scoreDiff.toFixed(1)} points
          </span>
        </div>
      </div>

      {/* Chart */}
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={trend} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis
            dataKey="date"
            tickFormatter={formatDate}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis
            domain={[0, 100]}
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <RechartsTooltip content={<CustomTooltip />} />

          {/* Reference lines for risk zones */}
          <ReferenceLine y={80} stroke="#10b981" strokeDasharray="3 3" label={{ value: 'Low Risk', position: 'right', fontSize: 10 }} />
          <ReferenceLine y={50} stroke="#f59e0b" strokeDasharray="3 3" label={{ value: 'Moderate', position: 'right', fontSize: 10 }} />

          <Line
            type="monotone"
            dataKey="score"
            stroke="#3b82f6"
            strokeWidth={3}
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>

      {/* Legend */}
      <div className="mt-4 flex justify-center gap-6 text-xs text-gray-600">
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-green-500 mr-2"></div>
          <span>Low Risk (80+)</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-yellow-500 mr-2"></div>
          <span>Moderate (50-79)</span>
        </div>
        <div className="flex items-center">
          <div className="w-8 h-0.5 bg-red-500 mr-2"></div>
          <span>High Risk (0-49)</span>
        </div>
      </div>
    </div>
  );
}
