'use client'

import Link from 'next/link'
import Image from 'next/image'

export default function LaunchInfoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-white py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-block mb-4">
              <span className="bg-green-500 text-white text-sm px-4 py-1.5 rounded-full font-bold">
                NEW LAUNCH
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              OFFO Launch™
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Streamline Your Restaurant Opening With Confidence
            </p>
            <p className="text-lg mb-12 max-w-2xl mx-auto">
              Track permits, manage compliance, and hit your opening date with precision.
              OFFO Launch™ simplifies the complex process of opening restaurants and businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors shadow-lg"
              >
                Try Live Demo
              </Link>
              <Link
                href="#features"
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Opening a Restaurant is Complex
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Navigate dozens of permits, inspections, and compliance requirements across multiple agencies.
              Miss a deadline, and your opening could be delayed by weeks or months.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📋</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">20+ Permits</h3>
              <p className="text-gray-600">
                Health, fire, building, zoning, business licenses, and more across multiple agencies
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">📅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">6-12 Months</h3>
              <p className="text-gray-600">
                Average timeline from concept to opening, with many moving parts to coordinate
              </p>
            </div>
            <div className="text-center p-6">
              <div className="text-5xl mb-4">💰</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">$50K+ in Delays</h3>
              <p className="text-gray-600">
                Average cost of a 30-day opening delay in lost revenue and carrying costs
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Everything You Need to Launch
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              OFFO Launch™ provides a comprehensive platform to manage every aspect of your restaurant opening
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature Cards */}
            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">✅</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Permit Tracking</h3>
              <p className="text-gray-600">
                Centralized dashboard to track all required permits with real-time status updates and automated reminders.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Timeline Management</h3>
              <p className="text-gray-600">
                Visual timeline to monitor your opening progress and identify critical path items.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🏛️</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Government API Integration</h3>
              <p className="text-gray-600">
                Sync with 5 major US city databases for real-time permit status updates. More cities coming soon.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📁</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Document Management</h3>
              <p className="text-gray-600">
                Upload, organize, and share all required documents with your team and inspectors.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600">
                Email, SMS, and in-app alerts for upcoming inspections, expiring permits, and status changes.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Team Collaboration</h3>
              <p className="text-gray-600">
                Real-time collaboration tools to coordinate with contractors, inspectors, and your team.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Demo Preview Section */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                See OFFO Launch™ in Action
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our interactive demo shows you how OFFO Launch™ simplifies the complex process of opening a restaurant.
                Track permits, manage timelines, and ensure compliance all in one place.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <div className="text-green-500 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Real-Time Dashboard</h4>
                    <p className="text-gray-600">See all your permits and their status at a glance</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-500 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Timeline Visualization</h4>
                    <p className="text-gray-600">Track progress with beautiful charts and calendars</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="text-green-500 text-xl mt-1">✓</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Document Upload</h4>
                    <p className="text-gray-600">Drag & drop files with automatic organization</p>
                  </div>
                </div>
              </div>
              <Link
                href="/"
                className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors"
              >
                Try Interactive Demo →
              </Link>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-white p-8 rounded-2xl border border-blue-100">
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="bg-blue-900 text-white p-6">
                  <h3 className="text-xl font-bold mb-1">Ember & Oak Restaurant</h3>
                  <p className="text-blue-200">Downtown San Francisco • Target: 1/31/2026</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-900">45</div>
                      <div className="text-sm text-gray-600">Days Until Open</div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg text-center">
                      <div className="text-3xl font-bold text-blue-900">2 / 6</div>
                      <div className="text-sm text-gray-600">Permits Approved</div>
                    </div>
                  </div>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-r-lg mb-4">
                    <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2">
                      <span>⚠️</span> Critical Pending
                    </h4>
                    <p className="text-sm text-red-800">
                      Health Department Inspection • Fire Safety Certificate • Liquor License
                    </p>
                  </div>

                  <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg text-sm text-gray-700">
                    <p><strong>MVP Demo Mode</strong> - This is a demonstration. Production version syncs with government databases.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Supported Cities Section */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Municipal API Integration
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Real-time permit status syncing with major US cities. More jurisdictions coming soon.
          </p>

          <div className="grid md:grid-cols-5 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🌉</div>
              <h3 className="font-bold text-gray-900">San Francisco</h3>
              <p className="text-sm text-gray-600">Health Dept API</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🏙️</div>
              <h3 className="font-bold text-gray-900">Chicago</h3>
              <p className="text-sm text-gray-600">Business Licenses</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🌴</div>
              <h3 className="font-bold text-gray-900">Los Angeles</h3>
              <p className="text-sm text-gray-600">Food Facilities</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🤠</div>
              <h3 className="font-bold text-gray-900">Houston</h3>
              <p className="text-sm text-gray-600">Building Permits</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <div className="text-3xl mb-2">🗽</div>
              <h3 className="font-bold text-gray-900">New York</h3>
              <p className="text-sm text-gray-600">Restaurant Grades</p>
            </div>
          </div>

          <p className="text-gray-600">
            + More cities coming soon. Request your city integration →
          </p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Streamline Your Launch Process?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join restaurants and businesses that are opening on time and within budget using OFFO Launch™.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-blue-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-colors"
            >
              Start Free Trial
            </Link>
            <Link
              href="/pilot"
              className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 transition-colors"
            >
              Schedule a Demo
            </Link>
          </div>
          <p className="mt-8 text-sm opacity-75">
            No credit card required • 14-day free trial • Full feature access
          </p>
        </div>
      </section>

      {/* Technical Details */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Built for Scale & Reliability
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Production-ready platform with enterprise-grade features
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">&lt;100ms Response</h3>
              <p className="text-gray-600">Lightning-fast API performance for instant updates</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Bank-Level Security</h3>
              <p className="text-gray-600">JWT authentication, encrypted data, SOC 2 compliant</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Mobile-First Design</h3>
              <p className="text-gray-600">Access from any device, anywhere, anytime</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
