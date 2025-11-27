'use client'

import PageHero from '@/components/sections/PageHero'
import { analytics } from '@/utils/analytics'

export default function OffoAiHeroWrapper() {
  const handleWaitlistClick = () => {
    analytics.track('offo_ai_waitlist_clicked', {
      product: 'offo-ai',
      source: 'hero_cta',
    })
    const newsletter = document.getElementById('newsletter')
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#newsletter'
    }
  }

  const handleLearnMore = () => {
    analytics.track('offo_ai_hero_viewed', {
      product: 'offo-ai',
      source: 'learn_more',
    })
    window.location.hash = '#capabilities'
  }

  return (
    <PageHero
      title="OFFO AI — Applied AI agents for business and engineering."
      subtitle="Create agents that streamline operations, optimize processes, and advise teams with real-time intelligence."
      primaryCta={{
        label: 'Join OFFO AI Waitlist',
        action: handleWaitlistClick,
      }}
      secondaryCta={{
        label: 'Learn More',
        action: handleLearnMore,
      }}
      accentColor="blue"
      tagline="Operational Intelligence Platform"
      backgroundVariant="gradient"
    />
  )
}
