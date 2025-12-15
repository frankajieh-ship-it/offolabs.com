'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Bars3Icon, XMarkIcon, ChevronDownIcon } from '@heroicons/react/24/outline'

export default function NavigationEnhanced() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [resourcesOpen, setResourcesOpen] = useState(false)

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="h-10 w-10 bg-gradient-to-br from-offo-blue to-offo-navy rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">O</span>
            </div>
            <span className="text-offo-blue font-bold text-xl">OFFO</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link
              href="#product"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              Product
            </Link>
            <Link
              href="#how-it-works"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              How It Works
            </Link>
            <Link
              href="#use-cases"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              Use Cases
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
                className={`absolute top-full left-0 mt-2 w-52 bg-white shadow-lg rounded-lg border border-gray-200 py-2 transition-all ${
                  resourcesOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
                }`}
                onMouseEnter={() => setResourcesOpen(true)}
                onMouseLeave={() => setResourcesOpen(false)}
              >
                <Link
                  href="/insights/offorisk-whitepaper"
                  className="block px-4 py-3 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors font-semibold border-b border-gray-100"
                >
                  📄 White Paper
                </Link>
                <Link
                  href="#articles"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  Articles
                </Link>
                <Link
                  href="#faq"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  FAQ
                </Link>
                <Link
                  href="#newsletter"
                  className="block px-4 py-2 text-gray-700 hover:bg-offo-light hover:text-offo-blue transition-colors"
                >
                  Newsletter
                </Link>
              </div>
            </div>

            <Link
              href="#pilot"
              className="text-gray-800 font-medium hover:text-offo-blue transition-colors"
            >
              Pilot Program
            </Link>
            <Link
              href="#contact"
              className="bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm"
            >
              Contact
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
              href="#product"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Product
            </Link>
            <Link
              href="#how-it-works"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </Link>
            <Link
              href="#use-cases"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Use Cases
            </Link>

            {/* Mobile Resources Section */}
            <div className="space-y-2">
              <div className="text-gray-800 font-medium">Resources</div>
              <Link
                href="/insights/offorisk-whitepaper"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors font-semibold"
                onClick={() => setMobileMenuOpen(false)}
              >
                📄 White Paper
              </Link>
              <Link
                href="#articles"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Articles
              </Link>
              <Link
                href="#faq"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQ
              </Link>
              <Link
                href="#newsletter"
                className="block pl-4 text-gray-700 hover:text-offo-blue transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Newsletter
              </Link>
            </div>

            <Link
              href="#pilot"
              className="block text-gray-800 font-medium hover:text-offo-blue transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pilot Program
            </Link>
            <Link
              href="#contact"
              className="block bg-offo-blue text-white px-6 py-2 rounded-lg font-semibold hover:bg-offo-navy transition-colors shadow-sm text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
