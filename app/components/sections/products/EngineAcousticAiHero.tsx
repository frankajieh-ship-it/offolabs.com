'use client'

import React, { useState } from 'react'
import PageHero from '@/components/sections/PageHero'

interface EngineAcousticAiHeroProps {
  onWaitlistClick?: () => void
}

export default function EngineAcousticAiHero({ onWaitlistClick }: EngineAcousticAiHeroProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWaitlistClick = async () => {
    if (onWaitlistClick) {
      onWaitlistClick()
      return
    }

    setIsLoading(true)
    try {
      // Fire analytics event
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'engine_acoustic_ai_waitlist_clicked', {
          product: 'engine-acoustic-ai',
          source: 'hero_cta',
        })
      }

      // Scroll to newsletter section
      const newsletterSection = document.getElementById('newsletter')
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        window.location.hash = '#newsletter'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageHero
      title="Engine Acoustic AI"
      subtitle="Preventive diagnostics for rotating systems. Powered by the world's largest non-OEM acoustic dataset for vehicles and generator sets."
      tagline="Acoustic Intelligence for Industry"
      accentColor="orange"
      backgroundVariant="gradient"
      primaryCta={{
        label: 'Join Pilot Program Waitlist',
        action: handleWaitlistClick,
        loading: isLoading,
      }}
      secondaryCta={{
        label: 'Learn More',
        href: '#how-it-works',
      }}
    />
  )
}
