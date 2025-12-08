'use client';

import Link from 'next/link';

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header with Logo */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <Link href="/" className="inline-block">
            <img
              src="/OFFO_LAB_logo.png"
              alt="OFFO LAB"
              className="h-10 w-auto"
            />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-green-600 via-green-700 to-green-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Security at OFFO LAB
          </h1>
          <p className="text-xl text-green-100">
            Your data security is our top priority. Learn about our comprehensive security measures and compliance standards.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Security Overview */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Commitment to Security</h2>
          <p className="text-gray-700 mb-4">
            OFFO LAB processes sensitive compliance and risk data on behalf of insurers, enterprise risk teams, and investors. We understand that trust is earned through transparent security practices and continuous improvement.
          </p>
          <p className="text-gray-700">
            Our security program is built on industry best practices and evolving compliance standards.
          </p>
        </section>

        {/* Security Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Data Encryption */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Data Encryption</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>TLS 1.3</strong> for all data in transit</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span><strong>AES-256</strong> encryption for data at rest</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Encrypted database backups</span>
              </li>
            </ul>
          </div>

          {/* Access Control */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Access Control</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Multi-factor authentication (MFA) required</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Role-based access control (RBAC)</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Least-privilege access principles</span>
              </li>
            </ul>
          </div>

          {/* Infrastructure Security */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Infrastructure Security</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Hosted on enterprise-grade cloud infrastructure</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Network segmentation and firewall protection</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>DDoS protection and rate limiting</span>
              </li>
            </ul>
          </div>

          {/* Monitoring & Response */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-8">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Monitoring & Response</h3>
            <ul className="text-gray-700 space-y-2 text-sm">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>24/7 security monitoring and alerting</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Automated threat detection</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mr-2 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Incident response procedures</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Compliance Section */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Compliance & Certifications</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border border-blue-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">SOC 2 Type II</h3>
              <p className="text-sm text-gray-600 mb-2">In Progress</p>
              <p className="text-xs text-gray-500">Audit expected Q2 2025</p>
            </div>

            <div className="border border-green-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">GDPR Compliant</h3>
              <p className="text-sm text-gray-600 mb-2">Target: Q1 2026</p>
              <p className="text-xs text-gray-500">EU data residency options</p>
            </div>

            <div className="border border-purple-200 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">ISO 27001</h3>
              <p className="text-sm text-gray-600 mb-2">Roadmap</p>
              <p className="text-xs text-gray-500">Target: 2026</p>
            </div>
          </div>
        </section>

        {/* Security Practices */}
        <section className="bg-white rounded-lg shadow-md border border-gray-200 p-8 mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Operational Security Practices</h2>

          <div className="space-y-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                1
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Regular Security Audits</h3>
                <p className="text-gray-700 text-sm">Quarterly internal audits and annual third-party penetration testing</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                2
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Employee Training</h3>
                <p className="text-gray-700 text-sm">All employees complete security awareness training and sign confidentiality agreements</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                3
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Vulnerability Management</h3>
                <p className="text-gray-700 text-sm">Continuous vulnerability scanning with rapid patching processes</p>
              </div>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold mr-4">
                4
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">Data Backup & Recovery</h3>
                <p className="text-gray-700 text-sm">Automated daily backups with point-in-time recovery capabilities</p>
              </div>
            </div>
          </div>
        </section>

        {/* Reporting Section */}
        <section className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Report a Security Vulnerability</h2>
          <p className="text-gray-700 mb-4">
            We take security vulnerabilities seriously. If you discover a security issue, please report it to our security team immediately.
          </p>
          <div className="bg-white border border-red-300 rounded-lg p-4">
            <p className="text-gray-900 font-semibold mb-2">Security Contact</p>
            <p className="text-gray-700 mb-1">Email: <a href="mailto:security@offolab.com" className="text-blue-600 hover:text-blue-700 font-semibold">security@offolab.com</a></p>
            <p className="text-sm text-gray-600 mt-2">
              We will acknowledge receipt within 24 hours and provide a detailed response within 72 hours.
            </p>
          </div>
        </section>

        {/* Back to Home Link */}
        <div className="text-center mt-8">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold"
          >
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Dashboard
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 mt-12 py-8">
        <div className="max-w-6xl mx-auto px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <img
                src="/OFFO_LAB_logo.png"
                alt="OFFO LAB"
                className="h-8 w-auto opacity-60"
              />
              <p className="text-xs text-gray-600">
                © 2025 <span className="font-semibold">OFFO LAB</span>
              </p>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-sm text-gray-600 font-medium">
                Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Risk Intelligence Engine · v1.0
              </p>
              <p className="text-xs text-red-600 font-semibold mt-1">
                Confidential
              </p>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
