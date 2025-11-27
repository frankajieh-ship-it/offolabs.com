import { Metadata } from 'next'
import MainLayout from '@/components/layouts/MainLayout'
import LegalPageLayout from '@/components/layouts/LegalPageLayout'

export const metadata: Metadata = {
  title: 'Terms of Service | OFFO Labs',
  description: 'Read the terms of service for OFFO Labs products and services. Please review our complete terms before using our platform.',
  keywords: ['terms of service', 'legal', 'agreement', 'conditions'],
}

export default function TermsPage() {
  const lastUpdated = 'November 23, 2024'

  return (
    <MainLayout>
      <LegalPageLayout
        title="Terms of Service"
        lastUpdated={lastUpdated}
        analyticsEvent="legal_terms_viewed"
      >
        <section className="space-y-8">
          {/* 1. Introduction */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              1. Introduction
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                These Terms of Service ("Terms") govern your use of OFFO Labs' products, services, and websites (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms.
              </p>
              <p>
                If you do not agree to these Terms, you may not use the Services. Please read them carefully.
              </p>
            </div>
          </div>

          {/* 2. Use License */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              2. Use License
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                OFFO Labs grants you a limited, non-exclusive, non-transferable license to access and use the Services for lawful purposes only. You agree not to:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Use the Services for any illegal or unauthorized purpose</li>
                <li>Violate any applicable laws or regulations</li>
                <li>Infringe upon any intellectual property rights</li>
                <li>Transmit viruses, malware, or harmful code</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Reverse engineer, decompile, or disassemble our Services</li>
                <li>Use the Services to harass, abuse, or harm others</li>
                <li>Engage in any form of automated data collection without permission</li>
              </ul>
            </div>
          </div>

          {/* 3. Intellectual Property Rights */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              3. Intellectual Property Rights
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                All content, features, and functionality of the Services—including but not limited to text, graphics, logos, images, code, and software—are the exclusive property of OFFO Labs or its content suppliers and are protected by copyright, trademark, and other laws.
              </p>
              <p>
                You may not reproduce, distribute, or transmit any content without our prior written permission.
              </p>
            </div>
          </div>

          {/* 4. User Accounts */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              4. User Accounts
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                If you create an account on our Services, you are responsible for:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Maintaining the confidentiality of your login credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized access</li>
              </ul>
              <p>
                You agree that all information you provide is accurate and complete. You are solely responsible for the security of your account.
              </p>
            </div>
          </div>

          {/* 5. Limitation of Liability */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              5. Limitation of Liability
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                To the fullest extent permitted by law, OFFO Labs and its affiliates shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or use, even if advised of the possibility of such damages.
              </p>
              <p>
                In no event shall our total liability exceed the amount paid by you for the Services in the 12 months preceding the claim.
              </p>
            </div>
          </div>

          {/* 6. Disclaimer of Warranties */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              6. Disclaimer of Warranties
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                The Services are provided "as is" and "as available" without warranties of any kind, whether express or implied. To the fullest extent permitted by law, OFFO Labs disclaims all warranties, including:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4">
                <li>Warranties of merchantability</li>
                <li>Warranties of fitness for a particular purpose</li>
                <li>Warranties of non-infringement</li>
                <li>Warranties of title</li>
              </ul>
            </div>
          </div>

          {/* 7. Indemnification */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              7. Indemnification
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                You agree to indemnify and hold harmless OFFO Labs, its affiliates, and their respective officers, directors, and employees from any claims, damages, losses, liabilities, and expenses arising from your use of the Services or violation of these Terms.
              </p>
            </div>
          </div>

          {/* 8. Termination */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              8. Termination
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                OFFO Labs may terminate or suspend your account and access to the Services at any time, without notice, if you violate these Terms or for any reason at our sole discretion.
              </p>
              <p>
                Upon termination, all rights granted to you will cease, and you must immediately stop using the Services.
              </p>
            </div>
          </div>

          {/* 9. Modifications to Terms */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              9. Modifications to Terms
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                OFFO Labs reserves the right to modify these Terms at any time. If changes are material, we will notify you by email or by posting a notice on the Services. Your continued use of the Services after such changes constitutes your acceptance of the updated Terms.
              </p>
            </div>
          </div>

          {/* 10. Governing Law */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              10. Governing Law
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                These Terms are governed by and construed in accordance with the laws of the United States, without regard to its conflict of law principles. You agree to submit to the exclusive jurisdiction of the courts located in the United States.
              </p>
            </div>
          </div>

          {/* 11. Contact */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              11. Contact Information
            </h2>
            <div className="space-y-4 text-gray-700 dark:text-gray-300">
              <p>
                If you have questions about these Terms of Service, please contact us at:
              </p>
              <ul className="list-none space-y-2 ml-4">
                <li>Email: legal@offodlabs.com</li>
                <li>Website: www.offodlabs.com</li>
              </ul>
            </div>
          </div>
        </section>
      </LegalPageLayout>
    </MainLayout>
  )
}