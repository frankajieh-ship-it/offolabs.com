'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

type StateType = 'harmony' | 'drift' | 'overload'

interface StateMetrics {
  pace: number
  precision: number
  divergence: number
  label: string
  color: string
  description: string
}

const stateMetrics: Record<StateType, StateMetrics> = {
  harmony: {
    pace: 82,
    precision: 78,
    divergence: 4,
    label: 'Harmony Zone',
    color: 'green',
    description: 'Balanced, sustainable operations'
  },
  drift: {
    pace: 92,
    precision: 62,
    divergence: 30,
    label: 'Drift Detected',
    color: 'amber',
    description: 'Early warning signs of behavioral drift'
  },
  overload: {
    pace: 97,
    precision: 45,
    divergence: 52,
    label: 'Overload State',
    color: 'red',
    description: 'Critical safety compromises'
  }
}

export default function ComparisonMode() {
  const [leftState, setLeftState] = useState<StateType>('harmony')
  const [rightState, setRightState] = useState<StateType>('overload')

  const leftMetrics = stateMetrics[leftState]
  const rightMetrics = stateMetrics[rightState]

  const states: StateType[] = ['harmony', 'drift', 'overload']

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h3 className="text-h2 font-bold text-gray-900 mb-2">Compare States</h3>
        <p className="text-body text-gray-600">
          See how different operational states affect the balance between pace and precision
        </p>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left State */}
        <motion.div
          layout
          className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm"
        >
          {/* State Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select State A
            </label>
            <div className="flex gap-2">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setLeftState(state)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all ${
                    leftState === state
                      ? 'bg-offo-navy text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Display */}
          <div className="space-y-4">
            <div
              className={`rounded-lg p-4 border-l-4 ${
                leftMetrics.color === 'green'
                  ? 'border-green-500 bg-green-50'
                  : leftMetrics.color === 'amber'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">
                {leftMetrics.label}
              </div>
              <div className="text-sm text-gray-600">{leftMetrics.description}</div>
            </div>

            {/* Pace */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Operational Output</span>
                <span className="text-lg font-bold text-blue-600">{leftMetrics.pace}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${leftMetrics.pace}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                />
              </div>
            </div>

            {/* Precision */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Risk & Safety</span>
                <span
                  className={`text-lg font-bold ${
                    leftMetrics.precision > 70
                      ? 'text-green-600'
                      : leftMetrics.precision > 50
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {leftMetrics.precision}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${leftMetrics.precision}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  className={`h-full ${
                    leftMetrics.precision > 70
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : leftMetrics.precision > 50
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                />
              </div>
            </div>

            {/* Divergence */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Divergence</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${
                      leftMetrics.divergence < 10
                        ? 'text-green-600'
                        : leftMetrics.divergence < 30
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {leftMetrics.divergence}
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      leftMetrics.divergence < 10
                        ? 'bg-green-500'
                        : leftMetrics.divergence < 30
                        ? 'bg-amber-500'
                        : 'bg-red-500 animate-pulse'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Right State */}
        <motion.div
          layout
          className="rounded-xl border-2 border-gray-200 bg-white p-6 shadow-sm"
        >
          {/* State Selector */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Select State B
            </label>
            <div className="flex gap-2">
              {states.map((state) => (
                <button
                  key={state}
                  onClick={() => setRightState(state)}
                  className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-all ${
                    rightState === state
                      ? 'bg-offo-navy text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {state}
                </button>
              ))}
            </div>
          </div>

          {/* Metrics Display */}
          <div className="space-y-4">
            <div
              className={`rounded-lg p-4 border-l-4 ${
                rightMetrics.color === 'green'
                  ? 'border-green-500 bg-green-50'
                  : rightMetrics.color === 'amber'
                  ? 'border-amber-500 bg-amber-50'
                  : 'border-red-500 bg-red-50'
              }`}
            >
              <div className="font-semibold text-gray-900 mb-1">
                {rightMetrics.label}
              </div>
              <div className="text-sm text-gray-600">{rightMetrics.description}</div>
            </div>

            {/* Pace */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Operational Output</span>
                <span className="text-lg font-bold text-blue-600">{rightMetrics.pace}</span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rightMetrics.pace}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut' }}
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                />
              </div>
            </div>

            {/* Precision */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Risk & Safety</span>
                <span
                  className={`text-lg font-bold ${
                    rightMetrics.precision > 70
                      ? 'text-green-600'
                      : rightMetrics.precision > 50
                      ? 'text-amber-600'
                      : 'text-red-600'
                  }`}
                >
                  {rightMetrics.precision}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${rightMetrics.precision}%` }}
                  transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                  className={`h-full ${
                    rightMetrics.precision > 70
                      ? 'bg-gradient-to-r from-green-500 to-green-600'
                      : rightMetrics.precision > 50
                      ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                      : 'bg-gradient-to-r from-red-500 to-red-600'
                  }`}
                />
              </div>
            </div>

            {/* Divergence */}
            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-gray-700">Divergence</span>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-lg font-bold ${
                      rightMetrics.divergence < 10
                        ? 'text-green-600'
                        : rightMetrics.divergence < 30
                        ? 'text-amber-600'
                        : 'text-red-600'
                    }`}
                  >
                    {rightMetrics.divergence}
                  </span>
                  <div
                    className={`h-2 w-2 rounded-full ${
                      rightMetrics.divergence < 10
                        ? 'bg-green-500'
                        : rightMetrics.divergence < 30
                        ? 'bg-amber-500'
                        : 'bg-red-500 animate-pulse'
                    }`}
                  />
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Comparison Summary */}
      <motion.div
        layout
        className="rounded-xl bg-gradient-to-r from-blue-50 to-green-50 p-6 border border-blue-200"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">State A</div>
            <div className="text-lg font-bold text-offo-navy capitalize">{leftState}</div>
          </div>
          <ArrowRight className="h-6 w-6 text-gray-400" />
          <div className="text-center">
            <div className="text-sm font-medium text-gray-600">State B</div>
            <div className="text-lg font-bold text-offo-navy capitalize">{rightState}</div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-xs text-gray-600 mb-1">Pace Change</div>
            <div
              className={`text-lg font-bold ${
                rightMetrics.pace > leftMetrics.pace
                  ? 'text-blue-600'
                  : rightMetrics.pace < leftMetrics.pace
                  ? 'text-blue-400'
                  : 'text-gray-500'
              }`}
            >
              {rightMetrics.pace > leftMetrics.pace ? '+' : ''}
              {rightMetrics.pace - leftMetrics.pace}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Precision Change</div>
            <div
              className={`text-lg font-bold ${
                rightMetrics.precision > leftMetrics.precision
                  ? 'text-green-600'
                  : rightMetrics.precision < leftMetrics.precision
                  ? 'text-red-600'
                  : 'text-gray-500'
              }`}
            >
              {rightMetrics.precision > leftMetrics.precision ? '+' : ''}
              {rightMetrics.precision - leftMetrics.precision}
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-600 mb-1">Divergence Change</div>
            <div
              className={`text-lg font-bold ${
                rightMetrics.divergence > leftMetrics.divergence
                  ? 'text-red-600'
                  : rightMetrics.divergence < leftMetrics.divergence
                  ? 'text-green-600'
                  : 'text-gray-500'
              }`}
            >
              {rightMetrics.divergence > leftMetrics.divergence ? '+' : ''}
              {rightMetrics.divergence - leftMetrics.divergence}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
