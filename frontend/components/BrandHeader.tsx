'use client'

import Link from 'next/link'

export default function BrandHeader() {
  return (
    <header className="border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-4">
            {/* Logo placeholder - can be replaced with actual logo */}
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-offo-blue to-offo-navy">
              <span className="text-xl font-bold text-white">O</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-gray-900">OFFO Labs</span>
              <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
                Harmony Engine Prototype
              </span>
            </div>
          </Link>

          {/* Right side - version badge */}
          <div className="flex items-center space-x-4">
            <span className="hidden rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 sm:inline-flex">
              Phase 0 Demo
            </span>
            <span className="text-sm text-gray-500">v0.1</span>
          </div>
        </div>
      </div>
    </header>
  )
}
