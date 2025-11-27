import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import LegalPageLayout from '@/components/layouts/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Data Transparency | OFFO Labs',
  description: 'Understand how OFFO Labs collects, uses, stores, and protects your data. We believe in complete transparency about your information.',
  keywords: ['data transparency', 'data handling', 'data storage', 'user rights'],
}

export default function DataTransparencyPage() {
  const lastUpdated = 'November 23, 2024'

  return (
    <MainLayout>
      <LegalPageLayout
        title="Data Transparency"
        lastUpdated={lastUpdated}
        analyticsEvent="legal_data_transparency_viewed"
      >
        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Our Commitment to Transparency
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                At OFFO Labs, we believe transparency about data is fundamental to building trust. This document provides detailed information about how we handle your data, from collection to storage to deletion.
              </p>
              <p>
                We are committed to being honest and clear about our practices, and we want you to understand exactly what data we collect and why.
              </p>
            </div>
          </div>

          {/* 2. How Data is Collected */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. How Data is Collected
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Direct Collection
              </h3>
              <p>
                We collect data directly when you:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Create an account or profile</li>
                <li>Fill out forms or surveys</li>
                <li>Submit support requests</li>
                <li>Make purchases or payments</li>
                <li>Subscribe to our newsletter</li>
                <li>Participate in feedback sessions</li>
                <li>Contact us via email or chat</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Indirect Collection
              </h3>
              <p>
                We collect data automatically through:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Web analytics (Google Analytics, Mixpanel)</li>
                <li>Session recording tools (for UX improvement)</li>
                <li>Error tracking and logging systems</li>
                <li>Server logs and access records</li>
                <li>Cookies and local storage</li>
                <li>Third-party integrations</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Data Minimization
              </h3>
              <p>
                We collect only data necessary for our stated purposes. We do not collect excessive or unnecessary information.
              </p>
            </div>
          </div>

          {/* 3. How Data is Used */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. How Data is Used
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Primary Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Service Delivery:</strong> Providing and improving our Services</li>
                <li><strong>Communication:</strong> Sending updates, security alerts, and support responses</li>
                <li><strong>Account Management:</strong> Authentication and account security</li>
                <li><strong>Analytics:</strong> Understanding usage patterns to improve product</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Secondary Uses
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Marketing:</strong> Promotional emails (with your consent)</li>
                <li><strong>Research:</strong> Improving features and user experience</li>
                <li><strong>Compliance:</strong> Meeting legal and regulatory requirements</li>
                <li><strong>Security:</strong> Fraud detection and abuse prevention</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Legal Basis for Processing
              </h3>
              <p>
                We process your data based on:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Your explicit consent</li>
                <li>Contractual obligations (Terms of Service)</li>
                <li>Legal requirements and compliance</li>
                <li>Legitimate business interests</li>
              </ul>
            </div>
          </div>

          {/* 4. How Data is Stored */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. How Data is Stored
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Storage Infrastructure
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Data is stored on secure, encrypted servers</li>
                <li>We use industry-standard encryption (AES-256, TLS 1.2+)</li>
                <li>Multiple geographic backups for disaster recovery</li>
                <li>Access is restricted to authorized personnel only</li>
                <li>Regular security audits and vulnerability assessments</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Data Encryption
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>In Transit:</strong> All data is encrypted with TLS</li>
                <li><strong>At Rest:</strong> Sensitive data is encrypted with AES-256</li>
                <li><strong>In Use:</strong> Processed in secure environments</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Access Controls
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Principle of least privilege for staff access</li>
                <li>Multi-factor authentication for all staff accounts</li>
                <li>Audit logs for all data access and changes</li>
                <li>Regular access reviews and compliance checks</li>
              </ul>
            </div>
          </div>

          {/* 5. Data Retention Policies */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Data Retention Policies
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Retention Schedule
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Account Data:</strong> Retained while account is active, deleted 30 days after closure</li>
                <li><strong>Transaction Data:</strong> Retained for 7 years (legal requirement)</li>
                <li><strong>Analytics Data:</strong> Retained for 24 months then anonymized</li>
                <li><strong>Support Tickets:</strong> Retained for 2 years for reference</li>
                <li><strong>Server Logs:</strong> Retained for 90 days then deleted</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Deletion Process
              </h3>
              <p>
                When data reaches the end of its retention period:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Data is securely deleted using industry-standard methods</li>
                <li>Backups containing the data are removed or overwritten</li>
                <li>We maintain records that deletion occurred</li>
                <li>No remnants of data are recoverable</li>
              </ul>
            </div>
          </div>

          {/* 6. Third-Party Processors */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Third-Party Data Processors
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                We work with trusted third-party services. All processors have signed Data Processing Agreements (DPA) ensuring compliance with privacy regulations.
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Service Categories
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li><strong>Analytics:</strong> Google Analytics, Mixpanel (anonymized usage data)</li>
                <li><strong>Email:</strong> SendGrid, Mailchimp (newsletters, transactional emails)</li>
                <li><strong>Payments:</strong> Stripe, PayPal (payment processing only)</li>
                <li><strong>Hosting:</strong> AWS, Google Cloud (encrypted data storage)</li>
                <li><strong>CDN:</strong> Cloudflare (content delivery, no data collection)</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Sub-Processor Policy
              </h3>
              <p>
                We maintain a public list of all sub-processors. You can request this list at any time.
              </p>
            </div>
          </div>

          {/* 7. User Rights and Control */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. User Rights and Control
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                You have the following rights regarding your data:
              </p>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Access and Portability
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Request a copy of all your data in a machine-readable format</li>
                <li>Export your data to use with other services</li>
                <li>Understand what data we hold and why</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Correction and Deletion
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Correct inaccurate or incomplete data</li>
                <li>Delete your data (subject to legal requirements)</li>
                <li>Request anonymization instead of deletion</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Preferences and Opt-Out
              </h3>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Opt out of marketing communications</li>
                <li>Control analytics and tracking preferences</li>
                <li>Manage cookie preferences</li>
                <li>Restrict certain processing activities</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mt-6">
                Exercising Your Rights
              </h3>
              <p>
                Submit requests to: privacy@offodlabs.com. We will respond within 30 days and may request verification of identity.
              </p>
            </div>
          </div>

          {/* 8. Contact for Data Requests */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Contact for Data Requests
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                For any data-related requests or questions:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: privacy@offodlabs.com</li>
                <li>Website: www.offodlabs.com/privacy</li>
                <li>Response time: Within 30 days</li>
              </ul>
            </div>
          </div>
        </section>
      </LegalPageLayout>
    </MainLayout>
  )
}