'use client'

import { Brain, Zap, Code2, Users, TrendingUp, Wrench } from 'lucide-react'
import { motion } from 'framer-motion'

interface Capability {
  icon: React.ReactNode
  title: string
  description: string
  features: string[]
  color: string
}

export default function WhatOffoAiDoesSection() {
  const capabilities: Capability[] = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: 'Business & Startup Advisory Agent',
      description:
        'Acts like a specialized advisor that helps with strategic decisions and operational optimization.',
      features: [
        'Market positioning & strategy',
        'Pricing & competitive analysis',
        'Product planning & prioritization',
        'Operational optimization',
        'User growth & marketing guidance',
      ],
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Internal Process Copilots',
      description:
        'AI copilots designed for internal operations, automating workflows and enhancing productivity.',
      features: [
        'HR onboarding flows',
        'Daily standup automation',
        'Sales pipeline assistant',
        'Inventory forecasting tools',
        'Task/PM & admin automation',
      ],
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'Engineering Assistance',
      description:
        'Embedded AI tools for technical teams to accelerate development and improve code quality.',
      features: [
        'Embedded system debugging copilot',
        'API integration assistant',
        'DevOps and CI/CD instruction agents',
        'Work instruction & test plan generators',
        'AI code reviewers & refactoring helpers',
      ],
      color: 'from-green-600 to-green-500',
    },
  ]

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
    <section id="what-offo-does" className="py-12 sm:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900/50">
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
            What OFFO AI Does
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto leading-relaxed">
            OFFO AI helps founders, SMEs, and engineering teams automate decisions, streamline daily workflows, and unlock insights that would normally require an entire operations staff.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {capabilities.map((capability, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-8 transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 overflow-hidden"
            >
              {/* Gradient Background */}
              <div
                className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${capability.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`}
              />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div
                  className={`w-14 h-14 rounded-lg bg-gradient-to-br ${capability.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  {capability.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {capability.title}
                </h3>

                {/* Description */}
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed text-sm">
                  {capability.description}
                </p>

                {/* Features List */}
                <ul className="space-y-2">
                  {capability.features.map((feature, idx) => (
                    <li
                      key={idx}
                      className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300"
                    >
                      <span className={`text-blue-600 dark:text-blue-400 font-bold mt-0.5`}>
                        ✓
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Box */}
        <motion.div
          className="mt-16 p-8 rounded-lg border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <h3 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-3">
            One Platform. Three Powerhouse Modules.
          </h3>
          <p className="text-blue-800 dark:text-blue-200 leading-relaxed">
            OFFO AI combines business intelligence, process automation, and technical expertise into a unified platform. Whether you&#39;re making strategic decisions, optimizing workflows, or debugging code, OFFO AI is your on-demand expert team.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
