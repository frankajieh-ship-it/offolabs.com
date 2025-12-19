'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 sm:h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/OFFO_LAB_logo.png"
              alt="OFFO Lab"
              width={250}
              height={84}
              className="h-20 sm:h-24 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="/demo"
              className="bg-offo-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-offo-blue-900 transition-colors shadow-md hover:shadow-lg"
            >
              Try Demo
            </Link>

            {/* Divider */}
            <div className="h-8 w-px bg-border"></div>

            <Link
              href="/harmony"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border-subtle text-sm font-medium text-ink-muted hover:border-offo-blue-700 hover:text-offo-blue-700 transition-colors"
            >
              Harmony
            </Link>
            <Link
              href="/pilot"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-surface-muted border border-border-subtle text-sm font-medium text-ink-muted hover:border-offo-blue-700 hover:text-offo-blue-700 transition-colors"
            >
              Pilot Program
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            {mobileMenuOpen ? (
              <XMarkIcon className="h-6 w-6 text-gray-800" />
            ) : (
              <Bars3Icon className="h-6 w-6 text-gray-800" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-4 space-y-3">
            <Link
              href="/demo"
              className="block bg-offo-blue-700 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-offo-blue-900 transition-colors shadow-md text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Demo
            </Link>

            <div className="pt-3 space-y-3">
              <Link
                href="/harmony"
                className="block px-3 py-2 rounded-lg bg-surface-muted border border-border-subtle text-sm font-medium text-ink-muted hover:border-offo-blue-700 hover:text-offo-blue-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Harmony
              </Link>
              <Link
                href="/pilot"
                className="block px-3 py-2 rounded-lg bg-surface-muted border border-border-subtle text-sm font-medium text-ink-muted hover:border-offo-blue-700 hover:text-offo-blue-700 transition-colors text-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pilot Program
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
