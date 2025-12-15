'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

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
              href="/harmony"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              Harmony Engine
            </Link>
            <Link
              href="/approach"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              How It Works
            </Link>

            {/* Resources Dropdown */}
            <div className="relative group">
              <button
                className="text-gray-800 font-medium hover:text-offo-blue transition-colors flex items-center gap-1"
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                Resources
                <ChevronDownIcon className="h-4 w-4" />
              </button>
              <div
                className={`absolute top-full left-0 mt-2 w-48 bg-white shadow-lg rounded-lg border border-gray-200 py-2 transition-all ${
                  resourcesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <Link
                  href="/insights/offorisk-whitepaper"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  White Paper
                </Link>
                <Link
                  href="/articles"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  Articles
                </Link>
                <Link
                  href="/faq"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  FAQ
                </Link>
              </div>
            </div>

            <Link
              href="/pilot"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              Pilot Program
            </Link>
            <Link
              href="/pilot"
              className="bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm"
            >
              Apply Now
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
              href="/harmony"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Harmony Engine
            </Link>
            <Link
              href="/approach"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>

            {/* Mobile Resources Section */}
            <div className="space-y-2">
              <div className="text-gray-800 font-medium">Resources</div>
              <Link
                href="/insights/offorisk-whitepaper"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                White Paper
              </Link>
              <Link
                href="/articles"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="/faq"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
            </div>

            <Link
              href="/pilot"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pilot Program
            </Link>
            <Link
              href="/pilot"
              className="block bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Apply Now
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
