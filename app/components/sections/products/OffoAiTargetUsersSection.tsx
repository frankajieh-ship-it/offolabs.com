'use client'

import { useEffect } from 'react'
import { Building2, Rocket, Wrench, Briefcase, Users } from 'lucide-react'
import { motion } from 'framer-motion'

interface TargetUser {
  icon: React.ReactNode
  title: string
  description: string
  color: string
}

export default function OffoAiTargetUsersSection() {
  useEffect(() => {
    // Track when Target Users section is viewed
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'offo_ai_target_users_viewed', {
              product: 'offo-ai',
            })
          }
          observer.unobserve(entry.target)
        }
      })
    })

    const section = document.querySelector('section')
    if (section) observer.observe(section)

    return () => observer.disconnect()
  }, [])

  const targetUsers: TargetUser[] = [
    {
      icon: <Building2 className="w-8 h-8" />,
      title: 'Small & Medium Businesses',
      description: 'Need simple automation without hiring a tech team.',
      color: 'from-blue-600 to-blue-500',
    },
    {
      icon: <Rocket className="w-8 h-8" />,
      title: 'Startup Founders',
      description: 'Want advisory, planning support, and operational copilots.',
      color: 'from-purple-600 to-purple-500',
    },
    {
      icon: <Wrench className="w-8 h-8" />,
      title: 'Engineering Teams',
      description: 'Diagnostics, documentation drafting, and testing copilots.',
      color: 'from-orange-600 to-orange-500',
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: 'Agencies & Freelancers',
      description: 'Use OFFO AI to magnify output and manage multiple clients.',
      color: 'from-pink-600 to-pink-500',
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'Enterprise Departments',
      description: 'HR, operations, finance teams needing repetitive workflow automation.',
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
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-900/50 dark:to-gray-900 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Built for Your Workflow
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            OFFO AI adapts to your business needs. Whether you&apos;re automating operations, advising teams, or scaling your output, we have a solution tailored to your workflow.
          </p>
        </motion.div>

        {/* Target Users Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {targetUsers.map((user, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group relative rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-800 p-6 transition-all duration-300 hover:shadow-lg hover:border-indigo-300 dark:hover:border-indigo-700 hover:-translate-y-1"
            >
              {/* Gradient Background */}
              <div className={`absolute -top-3 -right-3 w-20 h-20 bg-gradient-to-br ${user.color} opacity-0 group-hover:opacity-10 rounded-full transition-opacity duration-300`} />

              {/* Content */}
              <div className="relative z-10">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${user.color} flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {user.icon}
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {user.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                  {user.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Info Banner */}
        <motion.div
          className="mt-16 p-8 rounded-xl bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20 border border-indigo-200 dark:border-indigo-800"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <p className="text-center text-gray-900 dark:text-gray-100">
            <strong>One Platform, Endless Possibilities:</strong> No matter your role or industry, OFFO AI brings AI-powered automation, advisory, and optimization to every workflow. Start simple and scale as your needs grow.
          </p>
        </motion.div>
      </div>
    </section>
  )
}
