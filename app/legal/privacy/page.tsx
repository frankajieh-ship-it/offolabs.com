import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import LegalPageLayout from '@/components/layouts/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Privacy Policy | OFFO Labs',
  description: 'Learn how OFFO Labs collects, uses, and protects your personal data. Read our complete privacy policy.',
  keywords: ['privacy policy', 'data protection', 'personal information'],
}

export default function PrivacyPage() {
  const lastUpdated = 'November 23, 2024'

  return (
    <MainLayout>
      <LegalPageLayout
        title="Privacy Policy"
        lastUpdated={lastUpdated}
        analyticsEvent="legal_privacy_viewed"
      >
        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                OFFO Labs ("we," "us," or "our") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our Services.
              </p>
              <p>
                Please read this policy carefully. If you do not agree with our practices, please do not use the Services.
              </p>
            </div>
          </div>

          {/* 2. Data We Collect */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. Data We Collect
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Information You Provide
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Name and email address</li>
                <li>Account credentials</li>
                <li>Profile information</li>
                <li>Messages and communications</li>
                <li>Payment information (processed securely through third-party providers)</li>
                <li>Support requests and feedback</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Information Collected Automatically
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>IP address and device identifiers</li>
                <li>Browser type and operating system</li>
                <li>Referring URL and pages visited</li>
                <li>Time and date of your visits</li>
                <li>Cookies and similar tracking technologies</li>
                <li>Usage patterns and preferences</li>
              </ul>
            </div>
          </div>

          {/* 3. How We Use Your Data */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. How We Use Your Data
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>We use your data to:</p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Provide, maintain, and improve the Services</li>
                <li>Process transactions and send related communications</li>
                <li>Send service updates and promotional communications</li>
                <li>Respond to your inquiries and support requests</li>
                <li>Analyze usage patterns and improve user experience</li>
                <li>Detect and prevent fraud or security incidents</li>
                <li>Comply with legal obligations</li>
                <li>Enforce our Terms of Service</li>
              </ul>
            </div>
          </div>

          {/* 4. Cookies and Analytics */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. Cookies and Analytics
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We use cookies and similar technologies to enhance your experience, remember your preferences, and understand how you use our Services.
              </p>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Types of Cookies
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Essential Cookies:</strong> Required for basic functionality</li>
                <li><strong>Performance Cookies:</strong> Track usage and performance metrics</li>
                <li><strong>Functionality Cookies:</strong> Remember your preferences</li>
                <li><strong>Marketing Cookies:</strong> Track interests for targeted content</li>
              </ul>
              <p className="mt-4">
                You can control cookie settings through your browser. However, disabling certain cookies may limit your ability to use some features.
              </p>
            </div>
          </div>

          {/* 5. Data Protection */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Data Protection
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We implement industry-standard security measures to protect your personal data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Secure authentication mechanisms</li>
                <li>Regular security audits and penetration testing</li>
                <li>Access controls and least-privilege principles</li>
                <li>Data backup and disaster recovery procedures</li>
              </ul>
              <p className="mt-4">
                While we take reasonable precautions, no security system is impenetrable. We cannot guarantee absolute security of your data.
              </p>
            </div>
          </div>

          {/* 6. Data Sharing */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Data Sharing
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We do not sell, rent, or trade your personal information. We may share data with:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Service providers who perform functions on our behalf</li>
                <li>Legal authorities when required by law</li>
                <li>Partners and affiliates (with your consent)</li>
                <li>Third parties in case of acquisition or merger</li>
              </ul>
              <p className="mt-4">
                We require all third parties to maintain strict confidentiality and use data only for the purposes specified.
              </p>
            </div>
          </div>

          {/* 7. Your Rights */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Your Rights
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                Depending on your location, you may have the following rights:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Right to access your personal data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to delete your data</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
              </ul>
              <p className="mt-4">
                To exercise any of these rights, please contact us at privacy@offodlabs.com.
              </p>
            </div>
          </div>

          {/* 8. Data Retention */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Data Retention
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We retain your personal data only as long as necessary to provide the Services and comply with legal obligations. When data is no longer needed, we securely delete or anonymize it.
              </p>
            </div>
          </div>

          {/* 9. Contact */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Contact Information
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                For privacy-related inquiries, please contact:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: privacy@offodlabs.com</li>
                <li>Website: www.offodlabs.com</li>
              </ul>
            </div>
          </div>
        </section>
      </LegalPageLayout>
    </MainLayout>
  )
}