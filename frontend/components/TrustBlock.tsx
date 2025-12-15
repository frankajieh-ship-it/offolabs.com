'use client'

import Link from 'next/link'
import Image from 'next/image'

interface TrustBlockProps {
  icon?: string
  title: string
  subtitle: string
  image?: string
  href?: string
  badges?: string[]
}

export default function TrustBlock({
  icon,
  title,
  subtitle,
  image,
  href,
  badges
}: TrustBlockProps) {
  const content = (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow h-full flex flex-col">
      {icon && <div className="text-4xl mb-3">{icon}</div>}

      {image && (
        <div className="mx-auto mb-4 w-24 h-24 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain"
          />
        </div>
      )}

      <h3 className="text-lg font-semibold mb-2 text-offo-navy">{title}</h3>
      <p className="text-sm text-gray-600 flex-grow">{subtitle}</p>

      {badges && badges.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2 mt-4">
          {badges.map((badge, index) => (
            <span
              key={index}
              className="text-xs bg-offo-light text-offo-blue px-3 py-1 rounded-full font-medium"
            >
              {badge}
            </span>
          ))}
        </div>
      )}

      {href && (
        <div className="mt-4">
          <span className="text-offo-blue text-sm font-medium hover:underline">
            Learn more →
          </span>
        </div>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full">
        {content}
      </Link>
    )
  }

  return content
}
