'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

interface MockupItem {
  id: string
  title: string
  src: string
}

const mockups: MockupItem[] = [
  {
    id: 'menu',
    title: 'Main Menu',
    src: '/images/mockups/codecrack-menu.svg',
  },
  {
    id: 'gameplay',
    title: 'Gameplay Arena',
    src: '/images/mockups/codecrack-gameplay.svg',
  },
  {
    id: 'duel',
    title: 'Real-Time Duel',
    src: '/images/mockups/codecrack-duel.svg',
  },
  {
    id: 'leaderboard',
    title: 'Global Leaderboard',
    src: '/images/mockups/codecrack-leaderboard.svg',
  },
]

export default function ScreenshotsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Screenshots & Mockups
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Early UI previews — final visuals may change.
          </p>
        </motion.div>

        {/* Mockups Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {mockups.map((mockup) => (
            <motion.div
              key={mockup.id}
              variants={itemVariants}
              className="group relative rounded-xl overflow-hidden bg-white dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800 shadow-md hover:shadow-lg transition-all duration-300"
            >
              {/* Image Container */}
              <div className="relative w-full h-80 sm:h-96 lg:h-80 xl:h-96 bg-gray-100 dark:bg-gray-800">
                <Image
                  src={mockup.src}
                  alt={mockup.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 50vw"
                />

                {/* Coming Soon Overlay */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-300 flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-block px-6 py-3 rounded-lg bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-lg">
                      <span className="text-sm sm:text-base font-semibold text-gray-900 dark:text-white">
                        Coming Soon
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Title */}
              <div className="p-4 sm:p-6">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                  {mockup.title}
                </h3>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Text */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-600 dark:text-gray-400 text-sm sm:text-base">
            These UI previews showcase the CodeCrack experience. Designs are subject to change as we continue development.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
