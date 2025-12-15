'use client'

import { ReactNode, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface InteractiveTooltipProps {
  content: ReactNode
  children: ReactNode
  position?: 'top' | 'bottom' | 'left' | 'right'
  delay?: number
}

export default function InteractiveTooltip({
  content,
  children,
  position = 'top',
  delay = 200
}: InteractiveTooltipProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [timer, setTimer] = useState<NodeJS.Timeout | null>(null)

  const handleMouseEnter = () => {
    const timeout = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    setTimer(timeout)
  }

  const handleMouseLeave = () => {
    if (timer) {
      clearTimeout(timer)
      setTimer(null)
    }
    setIsVisible(false)
  }

  const positionClasses = {
    top: 'bottom-full left-1/2 -translate-x-1/2 mb-2',
    bottom: 'top-full left-1/2 -translate-x-1/2 mt-2',
    left: 'right-full top-1/2 -translate-y-1/2 mr-2',
    right: 'left-full top-1/2 -translate-y-1/2 ml-2'
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-t-gray-900 border-l-transparent border-r-transparent border-b-transparent',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-b-gray-900 border-l-transparent border-r-transparent border-t-transparent',
    left: 'left-full top-1/2 -translate-y-1/2 border-l-gray-900 border-t-transparent border-b-transparent border-r-transparent',
    right: 'right-full top-1/2 -translate-y-1/2 border-r-gray-900 border-t-transparent border-b-transparent border-l-transparent'
  }

  return (
    <div
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: position === 'top' ? 5 : position === 'bottom' ? -5 : 0 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className={`absolute z-50 ${positionClasses[position]} pointer-events-none`}
          >
            <div className="relative bg-gray-900 text-white text-sm rounded-lg px-3 py-2 shadow-xl max-w-xs">
              {content}
              {/* Arrow */}
              <div
                className={`absolute w-0 h-0 border-4 ${arrowClasses[position]}`}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
