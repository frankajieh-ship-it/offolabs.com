'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface StickyCtaButtonProps {
  href?: string
  label?: string
  showAfterScroll?: number
}

export default function StickyCtaButton({
  href = '/insights/offorisk-whitepaper',
  label = '📄 Download White Paper',
  showAfterScroll = 300
}: StickyCtaButtonProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > showAfterScroll) {
        setIsVisible(true)
      } else {
        setIsVisible(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showAfterScroll])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <Link
        href={href}
        className="flex items-center gap-2 bg-offo-blue text-white px-5 py-3 rounded-full shadow-lg hover:bg-offo-navy transition-all hover:scale-105 font-semibold text-sm"
      >
        {label}
      </Link>
    </div>
  )
}
