import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'OFFO Risk Intelligence Dashboard',
  description: 'Business risk assessment powered by compliance data',
  icons: {
    icon: '/favicon.png',
    apple: '/OFFO_LAB_logo.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  )
}
