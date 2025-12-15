'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type StateType = 'harmony' | 'drift' | 'overload'

interface StateConfig {
  pace: number
  precision: number
  explanation: string
  color: 'green' | 'amber' | 'red'
  emoji: string
  title: string
}

const stateConfigurations: Record<StateType, StateConfig> = {
  harmony: {
    pace: 82,
    precision: 78,
    explanation: 'Output and safety are in optimal balance. Teams are delivering value sustainably while maintaining compliance and quality standards.',
    color: 'green',
    emoji: '⚖️',
    title: 'Harmony Zone'
  },
  drift: {
    pace: 92,
    precision: 62,
    explanation: 'High output pressure is causing early signs of behavioral drift. Teams are skipping code reviews, rushing deployments, or bypassing safety checks to meet deadlines.',
    color: 'amber',
    emoji: '⚠️',
    title: 'Drift Detected'
  },
  overload: {
    pace: 97,
    precision: 45,
    explanation: 'Critical overload detected. Maximum output is causing dangerous safety compromises. Incident risk is elevated. Immediate intervention recommended.',
    color: 'red',
    emoji: '🚨',
    title: 'Overload State'
  }
}

export default function EnhancedMeters() {
  const [currentState, setCurrentState] = useState<StateType>('harmony')
  const [isAnimating, setIsAnimating] = useState(false)
  const [hoveredMeter, setHoveredMeter] = useState<'pace' | 'precision' | null>(null)

  const handleStateChange = (newState: StateType) => {
    if (isAnimating || currentState === newState) return

    setIsAnimating(true)
    setCurrentState(newState)

    // Animation complete
    setTimeout(() => setIsAnimating(false), 600)
  }

  const config = stateConfigurations[currentState]

  return (
    <div className="space-y-8">
      {/* State Selection Buttons */}
      <div className="flex flex-wrap justify-center gap-4">
        {(Object.keys(stateConfigurations) as StateType[]).map((state) => {
          const stateConfig = stateConfigurations[state]
          return (
            <motion.button
              key={state}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleStateChange(state)}
              disabled={isAnimating}
              className={`relative rounded-lg px-6 py-3 font-medium capitalize transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                currentState === state
                  ? 'bg-offo-navy text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>{stateConfig.emoji}</span>
                <span>{state}</span>
              </span>
              {currentState === state && (
                <motion.div
                  layoutId="stateIndicator"
                  className="absolute inset-0 rounded-lg bg-offo-navy"
                  transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Animated Meters */}
      <div className="flex justify-center items-end gap-12">
        {/* Pace Meter */}
        <motion.div
          key={`pace-${currentState}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="text-center"
          onHoverStart={() => setHoveredMeter('pace')}
          onHoverEnd={() => setHoveredMeter(null)}
        >
          <motion.div
            animate={{ scale: hoveredMeter === 'pace' ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="text-h2 font-bold text-blue-600"
          >
            {config.pace}
          </motion.div>
          <div className="mt-2 text-sm font-medium text-gray-600">Operational Output</div>
          <div className="text-xs text-gray-500">(Pace)</div>

          {/* Meter Container */}
          <div className="relative mt-6 h-80 w-24 rounded-2xl bg-gradient-to-t from-blue-100 to-blue-50 overflow-hidden border-2 border-blue-200 shadow-inner">
            <motion.div
              initial={{ height: '0%' }}
              animate={{ height: `${config.pace}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 15 }}
              className="absolute bottom-0 w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-xl"
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              />
            </motion.div>

            {/* Value label inside meter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredMeter === 'pace' ? 1 : 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
              >
                <div className="text-xs font-medium text-gray-700">Deployments/Week</div>
                <div className="text-lg font-bold text-blue-600">
                  {Math.round(config.pace * 0.5)}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* Precision Meter */}
        <motion.div
          key={`precision-${currentState}`}
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
          className="text-center"
          onHoverStart={() => setHoveredMeter('precision')}
          onHoverEnd={() => setHoveredMeter(null)}
        >
          <motion.div
            animate={{ scale: hoveredMeter === 'precision' ? 1.1 : 1 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className={`text-h2 font-bold ${
              config.precision > 70
                ? 'text-green-600'
                : config.precision > 50
                ? 'text-amber-600'
                : 'text-red-600'
            }`}
          >
            {config.precision}
          </motion.div>
          <div className="mt-2 text-sm font-medium text-gray-600">Risk & Safety</div>
          <div className="text-xs text-gray-500">(Precision)</div>

          {/* Meter Container */}
          <div className="relative mt-6 h-80 w-24 rounded-2xl bg-gradient-to-t from-red-100 via-amber-100 to-green-100 overflow-hidden border-2 border-gray-200 shadow-inner">
            <motion.div
              initial={{ height: '0%' }}
              animate={{ height: `${config.precision}%` }}
              transition={{ type: 'spring', stiffness: 100, damping: 15, delay: 0.2 }}
              className={`absolute bottom-0 w-full rounded-t-xl ${
                config.precision > 70
                  ? 'bg-gradient-to-t from-green-600 to-green-400'
                  : config.precision > 50
                  ? 'bg-gradient-to-t from-amber-600 to-amber-400'
                  : 'bg-gradient-to-t from-red-600 to-red-400'
              }`}
            >
              {/* Shimmer effect */}
              <motion.div
                animate={{ y: ['-100%', '100%'] }}
                transition={{ repeat: Infinity, duration: 2, ease: 'linear', delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-white/30 to-transparent"
              />
            </motion.div>

            {/* Value label inside meter */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredMeter === 'precision' ? 1 : 0 }}
                className="bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg"
              >
                <div className="text-xs font-medium text-gray-700">Safety Compliance</div>
                <div className={`text-lg font-bold ${
                  config.precision > 70 ? 'text-green-600'
                  : config.precision > 50 ? 'text-amber-600'
                  : 'text-red-600'
                }`}>
                  {config.precision}%
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Divergence Indicator */}
      <div className="flex justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4 }}
          className="inline-flex items-center gap-3 rounded-full bg-gray-100 px-6 py-3"
        >
          <span className="text-sm font-medium text-gray-600">Divergence:</span>
          <motion.div
            key={`divergence-${currentState}`}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className={`text-lg font-bold ${
              Math.abs(config.pace - config.precision) < 10
                ? 'text-green-600'
                : Math.abs(config.pace - config.precision) < 30
                ? 'text-amber-600'
                : 'text-red-600'
            }`}
          >
            {Math.abs(config.pace - config.precision)}
          </motion.div>
          <div
            className={`h-2 w-2 rounded-full ${
              Math.abs(config.pace - config.precision) < 10
                ? 'bg-green-500'
                : Math.abs(config.pace - config.precision) < 30
                ? 'bg-amber-500'
                : 'bg-red-500 animate-pulse'
            }`}
          />
        </motion.div>
      </div>

      {/* Animated Explanation Panel */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`explanation-${currentState}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={`rounded-xl p-6 border-l-4 ${
            config.color === 'green'
              ? 'border-green-500 bg-green-50'
              : config.color === 'amber'
              ? 'border-amber-500 bg-amber-50'
              : 'border-red-500 bg-red-50'
          }`}
        >
          <div className="flex items-start gap-4">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className={`flex-shrink-0 p-3 rounded-lg ${
                config.color === 'green'
                  ? 'bg-green-100'
                  : config.color === 'amber'
                  ? 'bg-amber-100'
                  : 'bg-red-100'
              }`}
            >
              <span className="text-2xl">{config.emoji}</span>
            </motion.div>
            <div className="flex-1">
              <h4 className="text-h3 font-semibold text-gray-900">{config.title}</h4>
              <p className="mt-2 text-body text-gray-700 leading-relaxed">{config.explanation}</p>

              {/* Action Recommendation */}
              {config.color !== 'green' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.3 }}
                  className="mt-4 pt-4 border-t border-gray-200"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-sm font-medium text-gray-700">Recommended Action:</span>
                    <span className="text-sm text-gray-600">
                      {config.color === 'amber'
                        ? 'Review recent deployment velocity. Consider reducing sprint load by 15-20% to restore safety margins.'
                        : 'Immediate intervention required. Pause non-critical deployments. Conduct safety audit. Restore training compliance.'}
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
