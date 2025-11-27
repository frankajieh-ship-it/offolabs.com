import type { ReactNode } from 'react'
import HeaderNav from '@/components/common/HeaderNav'
import Footer from '@/components/common/Footer'

export default function MainLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderNav />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  )
}
