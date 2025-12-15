'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'

const navItems = [
  { label: 'Product', href: '#product' },
  { label: 'How It Works', href: '#how-it-works' },
  {
    label: 'Pilot Program',
    href: '/pilot',
    badge: 'Join Now →'
  },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
]

export default function EnterpriseNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden border-b border-gray-200 bg-white/95 backdrop-blur-sm lg:block sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex h-16 items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-offo-blue to-offo-navy mr-2">
                <span className="text-lg font-bold text-white">O</span>
              </div>
              <span className="text-xl font-bold text-offo-navy">OFFO Labs</span>
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="group relative text-sm font-medium text-gray-700 hover:text-offo-navy transition-colors"
                >
                  {item.label}
                  {item.badge && (
                    <span className="ml-2 rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-800">
                      {item.badge}
                    </span>
                  )}
                  <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-offo-navy transition-all group-hover:w-full"></span>
                </Link>
              ))}

              {/* Primary CTA */}
              <Link
                href="/whitepaper"
                className="rounded-lg bg-offo-navy px-4 py-2 text-sm font-medium text-white hover:bg-offo-navy/90 transition-colors"
              >
                Download White Paper
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-offo-blue to-offo-navy mr-2">
              <span className="text-lg font-bold text-white">O</span>
            </div>
            <span className="text-xl font-bold text-offo-navy">OFFO</span>
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-gray-700"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="border-t border-gray-200 bg-white px-4 py-3">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="block py-3 text-gray-700 hover:text-offo-navy border-b border-gray-100 last:border-b-0"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
                {item.badge && (
                  <span className="ml-2 text-xs text-green-600">{item.badge}</span>
                )}
              </Link>
            ))}
            <Link
              href="/whitepaper"
              className="mt-4 block rounded-lg bg-offo-navy px-4 py-2 text-center text-sm font-medium text-white hover:bg-offo-navy/90 transition-colors"
              onClick={() => setIsOpen(false)}
            >
              Download White Paper
            </Link>
          </div>
        )}
      </nav>
    </>
  )
}
