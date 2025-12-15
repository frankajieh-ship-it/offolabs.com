'use client'

import Link from 'next/link'

interface KpiCardProps {
  icon: string
  title: string
  value?: string
  subtitle?: string
  href?: string
}

export default function KpiCard({ icon, title, value, subtitle, href }: KpiCardProps) {
  const content = (
    <div className="rounded-xl bg-white shadow-md hover:shadow-lg transition-shadow p-8 text-center space-y-4 border border-gray-200">
      <div className="text-5xl mb-2">{icon}</div>
      <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
      {value && (
        <div className="text-4xl font-bold text-offo-blue">{value}</div>
      )}
      {subtitle && (
        <p className="text-sm text-gray-600">{subtitle}</p>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block hover:scale-105 transition-transform">
        {content}
      </Link>
    )
  }

  return content
}
