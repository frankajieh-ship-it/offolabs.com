'use client'

import Link from 'next/link'

interface CtaButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
}

export default function CallToAction() {
  const buttons: CtaButton[] = [
    { label: 'Download White Paper', href: '#whitepaper', variant: 'primary' },
    { label: 'Join Pilot Program', href: '#pilot', variant: 'secondary' },
    { label: 'Book a Demo', href: '#demo', variant: 'secondary' }
  ]

  return (
    <div className="max-w-5xl mx-auto text-center space-y-8 px-6">
      <h2 className="text-3xl md:text-4xl font-bold text-white">
        Ready to see it in action?
      </h2>
      <p className="text-xl text-blue-100 max-w-3xl mx-auto">
        Join forward-thinking organizations using OFFO to predict risk and prevent incidents before they happen.
      </p>

      <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
        {buttons.map((button) => (
          <Link
            key={button.label}
            href={button.href}
            className={`
              px-8 py-4 rounded-lg font-semibold text-lg transition-all shadow-lg
              ${button.variant === 'primary'
                ? 'bg-white text-offo-blue hover:bg-gray-100 hover:shadow-xl'
                : 'border-2 border-white text-white hover:bg-white hover:text-offo-blue'
              }
            `}
          >
            {button.label}
          </Link>
        ))}
      </div>

      {/* Trust indicators */}
      <div className="pt-8 border-t border-blue-400 mt-12">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-blue-200 text-sm">API Uptime</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">&lt;100ms</div>
            <div className="text-blue-200 text-sm">Response Time</div>
          </div>
          <div>
            <div className="text-3xl font-bold mb-2">SOC 2</div>
            <div className="text-blue-200 text-sm">Compliant</div>
          </div>
        </div>
      </div>
    </div>
  )
}
