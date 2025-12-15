'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'

interface AnimatedKpiCardProps {
  icon: string
  title: string
  value?: string
  subtitle?: string
  href?: string
  delay?: number
}

export default function AnimatedKpiCard({
  icon,
  title,
  value,
  subtitle,
  href,
  delay = 0
}: AnimatedKpiCardProps) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.05 }}
      className="rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow p-8 text-center space-y-4 border border-gray-200"
    >
      <motion.div
        className="text-5xl mb-2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: delay + 0.2, type: "spring" }}
      >
        {icon}
      </motion.div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      {value && (
        <motion.div
          className="text-4xl font-bold text-offo-blue"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: delay + 0.4 }}
        >
          {value}
        </motion.div>
      )}
      {subtitle && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </motion.div>
  )

  if (href) {
    return (
      <Link href={href} className="block">
        {content}
      </Link>
    )
  }

  return content
}
