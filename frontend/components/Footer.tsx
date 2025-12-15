'use client'

import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-gray-200">
      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Company Info */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="h-10 w-10 bg-gradient-to-br from-offo-blue to-offo-navy rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">O</span>
              </div>
              <span className="text-xl font-bold text-offo-navy">OFFO Labs</span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              Enterprise Behavioral Risk Intelligence Platform
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Product</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#features" className="hover:text-offo-blue transition-colors">
                  Features
                </Link>
              </li>
              <li>
                <Link href="#how-it-works" className="hover:text-offo-blue transition-colors">
                  How It Works
                </Link>
              </li>
              <li>
                <Link href="#use-cases" className="hover:text-offo-blue transition-colors">
                  Use Cases
                </Link>
              </li>
              <li>
                <Link href="#pricing" className="hover:text-offo-blue transition-colors">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="/insights/offorisk-whitepaper" className="hover:text-offo-blue transition-colors">
                  White Paper
                </Link>
              </li>
              <li>
                <Link href="#articles" className="hover:text-offo-blue transition-colors">
                  Articles
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-offo-blue transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="#newsletter" className="hover:text-offo-blue transition-colors">
                  Newsletter
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">Company</h4>
            <ul className="space-y-3 text-sm text-gray-600">
              <li>
                <Link href="#about" className="hover:text-offo-blue transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="hover:text-offo-blue transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-offo-blue transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/security" className="hover:text-offo-blue transition-colors">
                  Security
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <div>
            © {currentYear} OFFO Labs. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy" className="hover:text-offo-blue transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-offo-blue transition-colors">
              Terms of Service
            </Link>
            <Link href="/security" className="hover:text-offo-blue transition-colors">
              Security Statement
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
