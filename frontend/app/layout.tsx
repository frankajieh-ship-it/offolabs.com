import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
