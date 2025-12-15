import { Shield, FileText, Lock } from 'lucide-react'

export default function TrustSignals() {
  return (
    <section className="py-12 bg-gray-50 border-y border-gray-200">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-h3 font-semibold text-gray-900 mb-10">
          Built on Research & Designed for Enterprise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Whitepaper Preview */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-blue-100 rounded-lg flex-shrink-0">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <span className="ml-3 font-medium text-gray-900">Research-Backed</span>
            </div>
            <p className="text-gray-600 text-body mb-4">
              Download our whitepaper: &ldquo;The Correlation Between Output Pressure and Behavioral Drift&rdquo;
            </p>
            <a
              href="/insights/offorisk-whitepaper"
              className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium"
            >
              Read Whitepaper
              <span className="ml-1">→</span>
            </a>
          </div>

          {/* Security & Compliance */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-4">
              <div className="p-2 bg-purple-100 rounded-lg flex-shrink-0">
                <Lock className="h-6 w-6 text-purple-600" />
              </div>
              <span className="ml-3 font-medium text-gray-900">Enterprise</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">SOC2 Type II Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">GDPR & CCPA Compliant</span>
              </div>
              <div className="flex items-center">
                <Shield className="h-4 w-4 text-amber-500 mr-2 flex-shrink-0" />
                <span className="text-sm text-gray-700">FedRAMP Moderate (In Progress)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
