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
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="/demo"
              className="bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm"
            >
              Try Demo
            </Link>

            {/* Divider */}
            <div className="h-8 w-px bg-gray-300"></div>

            {/* Other Products Section */}
            <Link
              href="/harmony"
              className="text-gray-600 font-medium hover:text-offo-blue transition-colors relative"
            >
              <span className="flex items-center gap-2">
                Harmony
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
              </span>
            </Link>
            <Link
              href="/pilot"
              className="text-gray-600 font-medium hover:text-offo-blue transition-colors"
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
          <div className="md:hidden border-t border-gray-200 py-4 space-y-4">
            <Link
              href="/demo"
              className="block bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Try Demo
            </Link>

            <div className="border-t border-gray-200 pt-4 mt-4">
              <div className="text-xs text-gray-500 font-semibold mb-2 px-2">OTHER PRODUCTS</div>
              <Link
                href="/harmony"
                className="block text-gray-600 font-medium hover:text-offo-blue transition-colors flex items-center gap-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Harmony
                <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded-full font-bold">NEW</span>
              </Link>
              <Link
                href="/pilot"
                className="block text-gray-600 font-medium hover:text-offo-blue transition-colors mt-2"
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
