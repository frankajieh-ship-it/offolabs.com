import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'OFFO Labs - Innovative Solutions',
  description: 'OFFO Labs provides cutting-edge technology solutions for businesses',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-white dark:bg-dark-900 text-gray-900 dark:text-gray-100">
        {children}
      </body>
    </html>
  )
}