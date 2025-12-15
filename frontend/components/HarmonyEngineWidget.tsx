'use client'

import { useState, useEffect } from 'react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { motion } from 'framer-motion'

// Types
type HarmonyState = 'harmony' | 'drift' | 'overload'

interface HarmonyEngineProps {
  initialState?: HarmonyState
  showTrendline?: boolean
  theme?: 'light' | 'dark'
  onStateChange?: (state: HarmonyState) => void
}

interface StateData {
  pace: number
  precision: number
  narrative: string
  zone: 'optimized' | 'reactive' | 'at-risk'
  trendData: TrendDataPoint[]
}

interface TrendDataPoint {
  day: string
  pace: number
  precision: number
}

// Mock data generator
const generateMockTrendData = (state: HarmonyState): TrendDataPoint[] => {
  const days = Array.from({ length: 30 }, (_, i) => `Day ${i + 1}`)

  if (state === 'harmony') {
    // Balanced, stable data
    return days.map((day, i) => ({
      day,
      pace: 75 + Math.sin(i / 5) * 8 + Math.random() * 3,
      precision: 75 + Math.cos(i / 5) * 8 + Math.random() * 3,
    }))
  }

  if (state === 'drift') {
    // Pace increasing, precision decreasing
    return days.map((day, i) => ({
      day,
      pace: 75 + (i * 0.6) + Math.random() * 4,
      precision: 75 - (i * 0.45) + Math.random() * 4,
    }))
  }

  // overload: Pace very high, precision critically low
  return days.map((day, i) => ({
    day,
    pace: 85 + (i * 0.4) + Math.random() * 3,
    precision: 70 - (i * 1.0) + Math.random() * 5,
  }))
}

// State configurations
const mockStates: Record<HarmonyState, StateData> = {
  harmony: {
    pace: 82,
    precision: 78,
    narrative: 'Output and safety are in balance. Sustainable pace maintained across operations.',
    zone: 'optimized',
    trendData: generateMockTrendData('harmony'),
  },
  drift: {
    pace: 92,
    precision: 62,
    narrative: 'High output is compromising safety practices. Risk indicators showing early warning signs.',
    zone: 'reactive',
    trendData: generateMockTrendData('drift'),
  },
  overload: {
    pace: 97,
    precision: 45,
    narrative: 'Maximum output causing critical safety drift. Immediate attention needed to prevent incidents.',
    zone: 'at-risk',
    trendData: generateMockTrendData('overload'),
  },
}

export default function HarmonyEngineWidget({
  initialState = 'harmony',
  showTrendline = true,
  theme = 'light',
  onStateChange,
}: HarmonyEngineProps) {
  const [currentState, setCurrentState] = useState<HarmonyState>(initialState)
  const [displayedPace, setDisplayedPace] = useState(mockStates[initialState].pace)
  const [displayedPrecision, setDisplayedPrecision] = useState(mockStates[initialState].precision)
  const [showChart, setShowChart] = useState(showTrendline)

  const stateData = mockStates[currentState]

  // Smooth meter transitions
  useEffect(() => {
    const targetPace = stateData.pace
    const targetPrecision = stateData.precision
    const steps = 20
    const duration = 300
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps

      setDisplayedPace(prev => prev + (targetPace - prev) * progress)
      setDisplayedPrecision(prev => prev + (targetPrecision - prev) * progress)

      if (step >= steps) {
        clearInterval(timer)
        setDisplayedPace(targetPace)
        setDisplayedPrecision(targetPrecision)
      }
    }, interval)

    return () => clearInterval(timer)
  }, [currentState, stateData.pace, stateData.precision])

  const handleStateChange = (newState: HarmonyState) => {
    setCurrentState(newState)
    onStateChange?.(newState)
  }

  const getZoneColor = (zone: string) => {
    switch (zone) {
      case 'optimized':
        return 'text-green-600 bg-green-50 border-green-300'
      case 'reactive':
        return 'text-yellow-600 bg-yellow-50 border-yellow-300'
      case 'at-risk':
        return 'text-red-600 bg-red-50 border-red-300'
      default:
        return 'text-gray-600 bg-gray-50 border-gray-300'
    }
  }

  const getZoneLabel = (zone: string) => {
    switch (zone) {
      case 'optimized':
        return '✓ Harmony Zone'
      case 'reactive':
        return '⚠ Drift Detected'
      case 'at-risk':
        return '✗ Overload State'
      default:
        return 'Unknown'
    }
  }

  return (
    <div className={`rounded-xl border-2 border-gray-200 p-6 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} shadow-lg`}>
      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-offo-navy mb-2">
          Harmony Engine™
        </h2>
        <p className="text-sm text-gray-600">
          Real-time correlation between operational output and behavioral risk
        </p>
      </div>

      {/* State Toggle Controls */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={() => handleStateChange('harmony')}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
            currentState === 'harmony'
              ? 'bg-green-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Set state to harmony"
        >
          Harmony
        </button>
        <button
          onClick={() => handleStateChange('drift')}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
            currentState === 'drift'
              ? 'bg-yellow-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Set state to drift"
        >
          Drift
        </button>
        <button
          onClick={() => handleStateChange('overload')}
          className={`flex-1 px-4 py-3 rounded-lg font-semibold transition-all ${
            currentState === 'overload'
              ? 'bg-red-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
          aria-label="Set state to overload"
        >
          Overload
        </button>
      </div>

      {/* Harmony Indicator */}
      <div className={`mb-6 p-4 rounded-lg border-2 ${getZoneColor(stateData.zone)} text-center`}>
        <div className="text-lg font-bold mb-1">{getZoneLabel(stateData.zone)}</div>
        <p className="text-sm">{stateData.narrative}</p>
      </div>

      {/* Dual Meters */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Left Meter: Operational Output (Pace) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Operational Output
            </h3>
            <span className="text-2xl font-bold text-blue-600">
              {Math.round(displayedPace)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Deployment pace, feature velocity, and productivity metrics
          </p>

          {/* Vertical meter */}
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <motion.div
              className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-blue-600 via-blue-500 to-blue-400"
              initial={{ height: 0 }}
              animate={{ height: `${displayedPace}%` }}
              transition={{ duration: 0.3 }}
            />
            {/* Scale markers */}
            {[0, 25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className="absolute left-0 right-0 border-t border-gray-300 text-xs text-gray-400 pl-1"
                style={{ bottom: `${mark}%` }}
              >
                {mark}
              </div>
            ))}
          </div>
          <div className="text-xs text-center text-gray-500">Pace Index</div>
        </div>

        {/* Right Meter: Risk & Safety Behavior (Precision) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
              Risk & Safety Behavior
            </h3>
            <span className={`text-2xl font-bold ${
              displayedPrecision >= 70 ? 'text-green-600' :
              displayedPrecision >= 50 ? 'text-yellow-600' :
              'text-red-600'
            }`}>
              {Math.round(displayedPrecision)}
            </span>
          </div>
          <p className="text-xs text-gray-500 mb-3">
            Safety compliance, documentation quality, and risk mitigation
          </p>

          {/* Vertical meter with gradient zones */}
          <div className="relative h-64 bg-gray-100 rounded-lg overflow-hidden border-2 border-gray-200">
            <motion.div
              className={`absolute bottom-0 left-0 right-0 ${
                displayedPrecision >= 70 ? 'bg-gradient-to-t from-green-600 via-green-500 to-green-400' :
                displayedPrecision >= 50 ? 'bg-gradient-to-t from-yellow-600 via-yellow-500 to-yellow-400' :
                'bg-gradient-to-t from-red-600 via-red-500 to-red-400'
              }`}
              initial={{ height: 0 }}
              animate={{ height: `${displayedPrecision}%` }}
              transition={{ duration: 0.3 }}
            />
            {/* Scale markers */}
            {[0, 25, 50, 75, 100].map((mark) => (
              <div
                key={mark}
                className="absolute left-0 right-0 border-t border-gray-300 text-xs text-gray-400 pl-1"
                style={{ bottom: `${mark}%` }}
              >
                {mark}
              </div>
            ))}
          </div>
          <div className="text-xs text-center text-gray-500">Precision Index</div>
        </div>
      </div>

      {/* Trendline Toggle */}
      <div className="mb-4">
        <button
          onClick={() => setShowChart(!showChart)}
          className="text-sm text-offo-blue hover:text-offo-navy font-medium transition-colors"
          aria-label="Toggle trendline view"
        >
          {showChart ? '▼ Hide' : '▶ Show'} 30-Day Trendline
        </button>
      </div>

      {/* Trendline Chart */}
      {showChart && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="border-t-2 border-gray-200 pt-6"
        >
          <h3 className="text-sm font-semibold text-gray-700 mb-4 uppercase tracking-wide">
            Historical Trend Analysis
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stateData.trendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="day"
                tick={{ fontSize: 10 }}
                interval={4}
              />
              <YAxis
                domain={[0, 100]}
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px'
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: '12px' }}
              />
              <Line
                type="monotone"
                dataKey="pace"
                stroke="#2563eb"
                strokeWidth={2}
                name="Operational Output (Pace)"
                dot={false}
              />
              <Line
                type="monotone"
                dataKey="precision"
                stroke={
                  currentState === 'harmony' ? '#10b981' :
                  currentState === 'drift' ? '#f59e0b' :
                  '#ef4444'
                }
                strokeWidth={2}
                name="Risk & Safety (Precision)"
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-3 text-center italic">
            {currentState === 'harmony' && 'Stable correlation - both metrics moving in harmony'}
            {currentState === 'drift' && 'Diverging patterns - pace increasing while precision decreases'}
            {currentState === 'overload' && 'Critical divergence - maximum pace causing sharp precision decline'}
          </p>
        </motion.div>
      )}

      {/* Footer Note */}
      <div className="mt-6 pt-6 border-t-2 border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          <strong>Prototype Data:</strong> This visualization uses simulated data to demonstrate the Harmony Engine concept.
          Production version will integrate real-time data from operational systems.
        </p>
      </div>
    </div>
  )
}
