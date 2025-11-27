'use client'

import PageHero from '@/components/sections/PageHero'

export default function EngineAcousticAiHeroWrapper() {
  const handleWaitlistClick = () => {
    // Fire analytics event
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'engine_ai_waitlist_clicked', {
        product: 'engine-acoustic-ai',
        source: 'hero_cta',
      })
    }

    const newsletter = document.getElementById('newsletter')
    if (newsletter) {
      newsletter.scrollIntoView({ behavior: 'smooth' })
    } else {
      window.location.hash = '#newsletter'
    }
  }

  return (
    <PageHero
      title="Engine Acoustic AI"
      subtitle="Preventive diagnostics for rotating systems. Powered by the world&apos;s largest non-OEM acoustic dataset for vehicles and generator sets."
      primaryCta={{
        label: 'Join Pilot Program Waitlist',
        action: handleWaitlistClick,
      }}
      secondaryCta={{
        label: 'Learn More',
        action: () => {
          window.location.hash = '#how-it-works'
        },
      }}
      accentColor="orange"
      tagline="Acoustic Intelligence for Industry"
      backgroundVariant="gradient"
    />
  )
}
