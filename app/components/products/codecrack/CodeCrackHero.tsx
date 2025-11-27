'use client'

import React, { useState } from 'react'
import PageHero from '@/components/sections/PageHero'
import { analytics } from '@/utils/analytics'

interface CodeCrackHeroProps {
  onWaitlistClick?: () => void
}

export default function CodeCrackHero({ onWaitlistClick }: CodeCrackHeroProps) {
  const [isLoading, setIsLoading] = useState(false)

  const handleWaitlistClick = async () => {
    if (onWaitlistClick) {
      onWaitlistClick()
      return
    }

    setIsLoading(true)
    try {
      // Fire analytics event
      analytics.track('codecrack_waitlist_clicked', {
        product: 'codecrack',
        source: 'hero_cta',
      })

      // Scroll to newsletter section or trigger modal
      const newsletterSection = document.getElementById('newsletter')
      if (newsletterSection) {
        newsletterSection.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Fallback: navigate to waitlist
        window.location.hash = '#newsletter'
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageHero
      title="CodeCrack — The Logic Puzzle Arena"
      subtitle="Daily code-breaking duels vs AI and friends. Challenge your problem-solving skills in real-time multiplayer battles with AI-powered puzzle generation."
      tagline="Be the first to play the Daily Duel beta"
      accentColor="blue"
      backgroundVariant="gradient"
      primaryCta={{
        label: 'Join CodeCrack Waitlist',
        action: handleWaitlistClick,
        loading: isLoading,
      }}
      secondaryCta={{
        label: 'Learn More',
        href: '#features',
      }}
    />
  )
}
