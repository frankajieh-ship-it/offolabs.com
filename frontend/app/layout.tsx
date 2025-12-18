import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import { Providers } from '@/src/components/Providers'
import { Analytics } from '@/src/components/Analytics'
import StructuredData from '@/components/StructuredData'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
  preload: true,
  fallback: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
})

export const metadata: Metadata = {
  title: 'OFFO Launch™ | Launch Your Restaurant or Medical Facility with Complete Compliance Confidence',
  description: 'Eliminate permit chaos and inspection delays. OFFO Launch™ provides real-time permit tracking, inspection coordination, and launch readiness scores for restaurants and medical facilities. Join our pilot program today.',
  keywords: ['restaurant permits', 'medical facility compliance', 'health department permits', 'fire inspection', 'launch readiness', 'compliance management', 'restaurant opening', 'medical clinic launch'],
  authors: [{ name: 'OFFO Lab Consulting' }],
  creator: 'OFFO Lab Consulting',
  publisher: 'OFFO Lab Consulting',
  icons: {
    icon: '/favicon.png',
    apple: '/OFFO_LAB_logo.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://offolabs.com',
    siteName: 'OFFO Launch',
    title: 'OFFO Launch™ | Launch Compliance Management for Restaurants & Medical Facilities',
    description: 'Eliminate permit chaos and inspection delays. Track permits, inspections, and training in one dashboard. Open on time, every time.',
    images: [
      {
        url: '/OFFO_LAB_logo.png',
        width: 1200,
        height: 630,
        alt: 'OFFO Launch - Launch Compliance Management',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'OFFO Launch™ | Launch Compliance Management',
    description: 'Eliminate permit chaos. Track permits, inspections, and training in one dashboard.',
    images: ['/OFFO_LAB_logo.png'],
    creator: '@offolabs',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <head>
        <StructuredData />
      </head>
      <body>
        <Providers>
          <Navigation />
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  )
}
