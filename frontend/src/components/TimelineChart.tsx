'use client';

// src/components/TimelineChart.tsx
import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell
} from 'recharts';

interface Permit {
  id?: string;
  name: string;
  status?: string;
  priority?: string;
  timeline?: {
    applicationDate?: string;
    submissionDate?: string;
    estimatedApprovalDate?: string;
    actualApprovalDate?: string;
  };
}

interface TimelineChartProps {
  permits: Permit[];
}

const TimelineChart: React.FC<TimelineChartProps> = ({ permits }) => {
  const chartData = useMemo(() => {
    if (!permits || permits.length === 0) return [];

    // Group permits by month
    const monthData: { [key: string]: { pending: number; approved: number; total: number } } = {};

    permits.forEach(permit => {
      const date = permit.timeline?.estimatedApprovalDate || permit.timeline?.submissionDate || new Date().toISOString();
      const monthKey = new Date(date).toLocaleDateString('en-US', { month: 'short', year: 'numeric' });

      if (!monthData[monthKey]) {
        monthData[monthKey] = { pending: 0, approved: 0, total: 0 };
      }

      monthData[monthKey].total++;

      if (permit.status === 'approved') {
        monthData[monthKey].approved++;
      } else {
        monthData[monthKey].pending++;
      }
    });

    // Convert to array and sort by date
    return Object.entries(monthData)
      .map(([month, data]) => ({
        month,
        ...data
      }))
      .sort((a, b) => new Date(a.month).getTime() - new Date(b.month).getTime())
      .slice(0, 6); // Show last 6 months
  }, [permits]);

  if (chartData.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <p>No permit timeline data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          stroke="#888"
        />
        <YAxis
          tick={{ fontSize: 12 }}
          stroke="#888"
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '12px'
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: '20px' }}
          iconType="circle"
        />
        <Bar
          dataKey="approved"
          name="Approved"
          fill="#10b981"
          radius={[8, 8, 0, 0]}
        />
        <Bar
          dataKey="pending"
          name="Pending"
          fill="#3b82f6"
          radius={[8, 8, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default TimelineChart;
