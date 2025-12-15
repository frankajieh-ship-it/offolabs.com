'use client'

import { useState } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceArea,
  ReferenceDot,
  Legend
} from 'recharts'
import { motion, AnimatePresence } from 'framer-motion'

interface TrendDataPoint {
  day: number
  output: number
  precision: number
  alert?: string
}

interface DriftPeriod {
  start: number
  end: number
  severity: 'warning' | 'critical'
}

interface EnhancedTrendlineProps {
  data: TrendDataPoint[]
  showAlerts?: boolean
}

// Helper function to find drift periods
function findDriftPeriods(data: TrendDataPoint[]): DriftPeriod[] {
  const periods: DriftPeriod[] = []
  let driftStart: number | null = null

  for (let i = 0; i < data.length; i++) {
    const divergence = Math.abs(data[i].output - data[i].precision)

    if (divergence > 20 && driftStart === null) {
      driftStart = data[i].day
    } else if (divergence <= 20 && driftStart !== null) {
      periods.push({
        start: driftStart,
        end: data[i - 1].day,
        severity: divergence > 40 ? 'critical' : 'warning'
      })
      driftStart = null
    }
  }

  // Close any open drift period
  if (driftStart !== null) {
    periods.push({
      start: driftStart,
      end: data[data.length - 1].day,
      severity: Math.abs(data[data.length - 1].output - data[data.length - 1].precision) > 40 ? 'critical' : 'warning'
    })
  }

  return periods
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    const outputValue = payload[0]?.value
    const precisionValue = payload[1]?.value
    const divergence = Math.abs(outputValue - precisionValue)
    const alert = payload[0]?.payload?.alert

    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.15 }}
        className="bg-white border-2 border-gray-200 rounded-xl shadow-2xl p-4 min-w-[200px]"
      >
        <div className="font-semibold text-gray-900 mb-3 pb-2 border-b border-gray-200">
          Day {label}
        </div>

        <div className="space-y-2">
          {/* Output */}
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
              <span className="text-sm text-gray-700">Output</span>
            </div>
            <span className="text-sm font-bold text-blue-600">{outputValue}</span>
          </div>

          {/* Precision */}
          <div className="flex items-center justify-between">
            <div className={`h-3 w-3 rounded-full mr-2 flex-shrink-0 ${
              precisionValue > 70 ? 'bg-green-500'
              : precisionValue > 50 ? 'bg-amber-500'
              : 'bg-red-500'
            }`}></div>
            <span className="text-sm text-gray-700">Precision</span>
            <span className={`text-sm font-bold ${
              precisionValue > 70 ? 'text-green-600'
              : precisionValue > 50 ? 'text-amber-600'
              : 'text-red-600'
            }`}>{precisionValue}</span>
          </div>

          {/* Divergence */}
          <div className="pt-2 mt-2 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">Divergence</span>
              <span className={`text-sm font-bold ${
                divergence < 10 ? 'text-green-600'
                : divergence < 30 ? 'text-amber-600'
                : 'text-red-600'
              }`}>
                {divergence}
              </span>
            </div>
          </div>
        </div>

        {/* Alert if present */}
        {alert && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mt-3 p-2 bg-amber-50 border border-amber-300 rounded-lg"
          >
            <p className="text-xs text-amber-900 font-medium flex items-start">
              <span className="mr-1">⚠️</span>
              <span>{alert}</span>
            </p>
          </motion.div>
        )}
      </motion.div>
    )
  }

  return null
}

export default function EnhancedTrendline({ data, showAlerts = true }: EnhancedTrendlineProps) {
  const [hoveredDay, setHoveredDay] = useState<number | null>(null)
  const [showDriftPeriods, setShowDriftPeriods] = useState(true)

  // Find drift periods
  const driftPeriods = findDriftPeriods(data)

  // Find critical alerts
  const criticalDays = data.filter(d => d.alert && showAlerts)

  return (
    <div className="space-y-4">
      {/* Header with Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-h3 font-semibold text-gray-900">30-Day Trend Analysis</h3>
          <p className="text-sm text-gray-600 mt-1">
            Track how pace and precision correlate over time
          </p>
        </div>

        {/* Legend & Controls */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-blue-500 mr-2 flex-shrink-0"></div>
              <span className="text-gray-700">Operational Output</span>
            </div>
            <div className="flex items-center">
              <div className="h-3 w-3 rounded-full bg-green-500 mr-2 flex-shrink-0"></div>
              <span className="text-gray-700">Risk & Safety</span>
            </div>
          </div>

          {/* Toggle Drift Periods */}
          {driftPeriods.length > 0 && (
            <button
              onClick={() => setShowDriftPeriods(!showDriftPeriods)}
              className="text-xs text-gray-600 hover:text-gray-900 flex items-center gap-2 transition-colors"
            >
              <input
                type="checkbox"
                checked={showDriftPeriods}
                onChange={() => {}}
                className="rounded"
              />
              <span>Highlight drift periods</span>
            </button>
          )}
        </div>
      </div>

      {/* Chart */}
      <div className="h-96 bg-white rounded-lg border border-gray-200 p-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 20 }}
            onMouseMove={(e: any) => {
              if (e && e.activeLabel) {
                setHoveredDay(e.activeLabel)
              }
            }}
            onMouseLeave={() => setHoveredDay(null)}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />

            <XAxis
              dataKey="day"
              label={{ value: 'Days', position: 'insideBottom', offset: -10, style: { fontSize: 12, fill: '#6B7280' } }}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />

            <YAxis
              label={{ value: 'Score', angle: -90, position: 'insideLeft', style: { fontSize: 12, fill: '#6B7280' } }}
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6B7280' }}
            />

            {/* Highlight drift periods */}
            {showDriftPeriods && driftPeriods.map((period, index) => (
              <ReferenceArea
                key={`drift-${index}`}
                x1={period.start}
                x2={period.end}
                y1={0}
                y2={100}
                fill={period.severity === 'critical' ? '#FEE2E2' : '#FEF3C7'}
                fillOpacity={0.4}
                stroke="none"
              />
            ))}

            {/* Mark critical days */}
            {showAlerts && criticalDays.map((d, i) => (
              <ReferenceDot
                key={`alert-${i}`}
                x={d.day}
                y={d.precision}
                r={6}
                fill="#DC2626"
                stroke="#fff"
                strokeWidth={2}
              />
            ))}

            <Tooltip content={<CustomTooltip />} />

            {/* Output Line */}
            <Line
              type="monotone"
              dataKey="output"
              stroke="#3B82F6"
              strokeWidth={3}
              dot={{ r: 3, fill: '#3B82F6', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              name="Operational Output"
            />

            {/* Precision Line */}
            <Line
              type="monotone"
              dataKey="precision"
              stroke="#10B981"
              strokeWidth={3}
              strokeDasharray="5 5"
              dot={{ r: 3, fill: '#10B981', strokeWidth: 0 }}
              activeDot={{ r: 6, strokeWidth: 2, stroke: '#fff' }}
              name="Risk & Safety"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Legend & Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Drift Periods Legend */}
        {showDriftPeriods && driftPeriods.length > 0 && (
          <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-amber-100 rounded-lg">
                <span className="text-xl">⚠️</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-amber-900 mb-1">
                  {driftPeriods.length} Drift Period{driftPeriods.length > 1 ? 's' : ''} Detected
                </h4>
                <p className="text-sm text-amber-800">
                  Shaded areas show when output pressure caused behavioral drift (divergence &gt;20 points)
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Critical Alerts Legend */}
        {showAlerts && criticalDays.length > 0 && (
          <div className="rounded-lg bg-red-50 border border-red-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-red-100 rounded-lg">
                <span className="text-xl">🚨</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-red-900 mb-1">
                  {criticalDays.length} Critical Alert{criticalDays.length > 1 ? 's' : ''}
                </h4>
                <p className="text-sm text-red-800">
                  Red dots mark days when precision dropped to critical levels
                </p>
              </div>
            </div>
          </div>
        )}

        {/* No Issues Found */}
        {driftPeriods.length === 0 && criticalDays.length === 0 && (
          <div className="md:col-span-2 rounded-lg bg-green-50 border border-green-200 p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 p-2 bg-green-100 rounded-lg">
                <span className="text-xl">✅</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-green-900 mb-1">Optimal Performance</h4>
                <p className="text-sm text-green-800">
                  No significant drift periods detected. Pace and precision remain well-balanced throughout the period.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Insights Panel */}
      <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 p-4">
        <div className="flex items-start gap-3">
          <div className="flex-shrink-0 p-2 bg-white rounded-lg shadow-sm">
            <span className="text-xl">💡</span>
          </div>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900 mb-2">Key Insights</h4>
            <ul className="space-y-1 text-sm text-gray-700">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Average divergence: <strong>{Math.round(data.reduce((sum, d) => sum + Math.abs(d.output - d.precision), 0) / data.length)}</strong> points
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Peak output: <strong>{Math.max(...data.map(d => d.output))}</strong> on day {data.find(d => d.output === Math.max(...data.map(d => d.output)))?.day}
                </span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>
                  Lowest precision: <strong>{Math.min(...data.map(d => d.precision))}</strong> on day {data.find(d => d.precision === Math.min(...data.map(d => d.precision)))?.day}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
