import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Github, Linkedin, Twitter } from 'lucide-react'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const footerSections = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#' },
        { label: 'Pricing', href: '#' },
        { label: 'Security', href: '#' },
        { label: 'Roadmap', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Terms', href: '/legal/terms' },
        { label: 'Privacy', href: '/legal/privacy' },
        { label: 'Data Transparency', href: '/legal/data-transparency' },
        { label: 'AI Policy', href: '/legal/ai-policy' },
      ],
    },
  ]

  return (
    <footer className="bg-dark-900 text-gray-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link href="/" className="hover:opacity-80 transition-opacity w-fit">
              <Image
                src="/images/offo-logo.png"
                alt="OFFO Labs Logo"
                width={78}
                height={78}
                className="w-20 h-20 sm:w-24 sm:h-24"
              />
            </Link>
            <p className="text-sm text-gray-500">
              Innovative solutions for modern businesses.
            </p>
            {/* Social Links */}
            <div className="flex items-center space-x-4 pt-4">
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="Twitter">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="hover:text-primary-400 transition-colors" aria-label="GitHub">
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Link Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wide">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm hover:text-primary-400 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} OFFO Labs. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/legal/privacy" className="hover:text-primary-400 transition-colors">
                Privacy Policy
              </a>
              <a href="/legal/terms" className="hover:text-primary-400 transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
