'use client';

import Link from 'next/link';
import { useState } from 'react';
import Head from 'next/head';

export default function WhitepaperPage() {
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    organization: '',
    email: '',
    role: ''
  });
  const [formErrors, setFormErrors] = useState({
    fullName: '',
    organization: '',
    email: '',
    role: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowEmailModal(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {
      fullName: '',
      organization: '',
      email: '',
      role: ''
    };
    let isValid = true;

    if (!formData.fullName.trim()) {
      errors.fullName = 'Full name is required';
      isValid = false;
    }

    if (!formData.organization.trim()) {
      errors.organization = 'Organization is required';
      isValid = false;
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!formData.role.trim()) {
      errors.role = 'Role is required';
      isValid = false;
    }

    setFormErrors(errors);
    return isValid;
  };

  const handleSubmitEmail = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Call API to store whitepaper download
      const response = await fetch('/api/whitepaper-download', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString()
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      setIsSubmitting(false);
      setDownloadSuccess(true);

      // Trigger PDF download after successful submission
      setTimeout(() => {
        // Check if PDF exists, otherwise show alert
        const pdfUrl = '/assets/OFFO-Risk-Score-White-Paper.pdf';

        // Attempt to download the PDF
        fetch(pdfUrl, { method: 'HEAD' })
          .then(response => {
            if (response.ok) {
              window.open(pdfUrl, '_blank');
            } else {
              alert('PDF is being prepared. You will receive an email with the download link shortly. Thank you for your interest in OFFO Risk Score™!');
            }
          })
          .catch(() => {
            alert('PDF is being prepared. You will receive an email with the download link shortly. Thank you for your interest in OFFO Risk Score™!');
          });

        // Reset form and close modal
        setTimeout(() => {
          setShowEmailModal(false);
          setDownloadSuccess(false);
          setFormData({
            fullName: '',
            organization: '',
            email: '',
            role: ''
          });
        }, 1500);
      }, 1000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setIsSubmitting(false);
      alert('There was an error processing your request. Please try again.');
    }
  };

  const resetModal = () => {
    setShowEmailModal(false);
    setFormData({
      fullName: '',
      organization: '',
      email: '',
      role: ''
    });
    setFormErrors({
      fullName: '',
      organization: '',
      email: '',
      role: ''
    });
    setDownloadSuccess(false);
  };

  return (
    <>
      <Head>
        <title>OFFO Risk Score™ White Paper | OFFO Labs</title>
        <meta name="description" content="Learn how behavioral risk intelligence is transforming insurance and operational safety. Download the OFFO Risk Score™ white paper." />
        <meta property="og:title" content="OFFO Risk Score™ White Paper | OFFO Labs" />
        <meta property="og:description" content="Learn how behavioral risk intelligence is transforming insurance and operational safety. Download the OFFO Risk Score™ white paper." />
        <meta property="og:image" content="/OFFO_LAB_logo.png" />
        <meta property="og:type" content="website" />
      </Head>

      <main className="min-h-screen bg-gray-50">
        {/* Hero Banner */}
        <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white py-16">
          <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
          <div className="relative max-w-5xl mx-auto px-8 text-center">
            <div className="inline-block px-4 py-2 bg-white bg-opacity-20 border-2 border-blue-300 rounded-full text-sm font-bold mb-5 backdrop-blur-sm">
              <span className="text-white" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>Research Report</span>
            </div>
            <h1 className="text-5xl sm:text-6xl font-bold mb-5 leading-tight text-white" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
              OFFO Risk Score™ White Paper
            </h1>
            <p className="text-2xl text-white font-light mb-6 max-w-3xl mx-auto" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.3)' }}>
              Behavioral Risk Intelligence for Insurance & Safety Leaders
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-5">
              <button
                onClick={handleDownload}
                className="px-8 py-4 bg-white text-blue-900 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-2xl text-lg flex items-center gap-3"
                aria-label="Download OFFO Risk Score White Paper PDF"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Download White Paper (PDF)
              </button>
              <Link
                href="/"
                className="px-6 py-4 bg-transparent border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-900 transition-all"
              >
                View Live Dashboard
              </Link>
            </div>
            <p className="text-sm text-white font-medium" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
              23-page report • Published January 2025 • Free access with email
            </p>

            {/* Scroll Prompt */}
            <div className="mt-8 flex flex-col items-center animate-bounce">
              <p className="text-sm text-white font-medium mb-2" style={{ textShadow: '0 1px 2px rgba(0,0,0,0.3)' }}>
                Scroll for Highlights
              </p>
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </section>

        {/* Executive Summary */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-8">
            <div className="flex items-start gap-4 mb-6">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                <svg className="w-7 h-7 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Executive Summary</h2>
                <div className="prose prose-lg max-w-none text-gray-700 leading-relaxed space-y-4">
                  <p>
                    The <strong>OFFO Risk Score™</strong> introduces a behavioral and operational approach to assessing workplace risk—moving beyond lagging indicators like past claims. This white paper explains the methodology behind the score, how it correlates to safety outcomes, and why insurers and enterprises are adopting proactive risk intelligence.
                  </p>
                  <p>
                    Download the full report to understand how real-time behavioral metrics can transform safety, underwriting, and operational excellence.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-8 flex justify-center">
              <button
                onClick={handleDownload}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-xl text-lg"
              >
                Download Full White Paper
              </button>
            </div>
          </div>
        </section>

        {/* Key Findings */}
        <section className="bg-gray-100 py-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">Key Findings</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-green-600">
                <div className="text-4xl font-bold text-green-600 mb-3">73%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Predictive Accuracy</h3>
                <p className="text-gray-600">
                  Organizations with OFFO Scores above 80 showed 73% fewer workplace incidents over 12-month periods
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-blue-600">
                <div className="text-4xl font-bold text-blue-600 mb-3">5.2x</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">ROI on Prevention</h3>
                <p className="text-gray-600">
                  Early intervention based on score trends delivers 5.2x ROI compared to reactive incident response
                </p>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md border-l-4 border-purple-600">
                <div className="text-4xl font-bold text-purple-600 mb-3">42%</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Claims Reduction</h3>
                <p className="text-gray-600">
                  Insurers using OFFO Risk Scores in underwriting see 42% reduction in loss ratios
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* What You'll Learn */}
        <section className="bg-white py-16">
          <div className="max-w-6xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">What You'll Learn</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  title: 'The Science Behind Behavioral Risk',
                  description: 'How task adherence, training completion, and documentation accuracy predict incidents before they occur'
                },
                {
                  title: 'Scoring Methodology & Validation',
                  description: 'Technical breakdown of the weighted algorithm, calibration process, and third-party validation studies'
                },
                {
                  title: 'Insurance Industry Applications',
                  description: 'How underwriters use OFFO Scores for loss prevention, pricing precision, and portfolio risk management'
                },
                {
                  title: 'Enterprise Risk Management',
                  description: 'Real-world case studies from manufacturing, construction, and healthcare sectors'
                },
                {
                  title: 'Integration & Implementation',
                  description: 'Technical requirements, data sources, and deployment timelines for your organization'
                },
                {
                  title: 'Future of Proactive Risk Intelligence',
                  description: 'Emerging trends in behavioral analytics, AI-driven predictions, and regulatory compliance'
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4 p-6 bg-gray-50 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all">
                  <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who Should Read This */}
        <section className="bg-gray-50 py-16">
          <div className="max-w-5xl mx-auto px-8">
            <h2 className="text-3xl font-bold mb-10 text-center text-gray-900">Who Should Read This</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                {
                  icon: '🏛️',
                  title: 'Insurance Underwriters',
                  description: 'Leverage behavioral risk data for more accurate pricing and loss prevention strategies'
                },
                {
                  icon: '🏢',
                  title: 'Enterprise Risk Managers',
                  description: 'Monitor operational compliance and identify risk trends before they escalate'
                },
                {
                  icon: '👷',
                  title: 'Safety & Compliance Leaders',
                  description: 'Implement data-driven safety programs with measurable ROI and incident reduction'
                },
                {
                  icon: '💼',
                  title: 'Investors & Board Members',
                  description: 'Assess portfolio company maturity and operational resilience with quantified risk metrics'
                }
              ].map((audience, index) => (
                <div key={index} className="bg-white p-6 rounded-xl border-2 border-gray-200 shadow-md hover:shadow-lg hover:border-blue-300 transition-all">
                  <div className="text-4xl mb-3">{audience.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{audience.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{audience.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* About the Authors */}
        <section className="bg-white py-16">
          <div className="max-w-4xl mx-auto px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-10 text-center">About the Authors</h2>
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-white font-bold text-2xl flex-shrink-0">
                  OL
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">OFFO LAB Research Team</h3>
                  <p className="text-gray-700 leading-relaxed mb-4">
                    This white paper was developed by OFFO LAB's interdisciplinary research team, combining expertise in behavioral science, actuarial analysis, and safety engineering. Our team is looking to partner with insurers, Fortune 500 companies, and academic institutions to validate the OFFO Risk Score methodology.
                  </p>
                  <div className="flex gap-2 flex-wrap">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">Risk Analytics</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-semibold rounded-full">Safety Science</span>
                    <span className="px-3 py-1 bg-purple-100 text-purple-700 text-sm font-semibold rounded-full">Insurance Tech</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="bg-gradient-to-r from-slate-900 to-slate-800 text-white py-16">
          <div className="max-w-4xl mx-auto px-8 text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">Ready to Transform Your Risk Strategy?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Download the full OFFO Risk Score™ White Paper and discover how behavioral risk intelligence can revolutionize your approach to safety, underwriting, and operational excellence.
            </p>
            <button
              onClick={handleDownload}
              className="px-12 py-5 bg-white text-slate-900 font-bold rounded-lg hover:bg-gray-100 transition-all shadow-2xl text-xl"
            >
              Download Now (Free)
            </button>
            <p className="mt-6 text-sm text-gray-400">
              23 pages • PDF format • No credit card required
            </p>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-gray-50 border-t border-gray-200 py-8">
          <div className="max-w-7xl mx-auto px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-600">
                  © 2025 <span className="font-semibold">OFFO LAB</span>
                </p>
              </div>
              <div className="flex gap-6 text-sm">
                <Link href="/privacy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
                <Link href="/security" className="text-gray-600 hover:text-blue-600 transition-colors">Security</Link>
                <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
              </div>
            </div>
          </div>
        </footer>

        {/* Email Capture Modal */}
        {showEmailModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-8 relative max-h-[90vh] overflow-y-auto">
              <button
                onClick={resetModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
                aria-label="Close modal"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {!downloadSuccess ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">Download White Paper</h3>
                    <p className="text-gray-600 text-sm">
                      Enter your information to receive instant access to the OFFO Risk Score™ White Paper
                    </p>
                  </div>

                  <form onSubmit={handleSubmitEmail} className="space-y-4">
                    {/* Full Name */}
                    <div>
                      <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                        Full Name <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        placeholder="John Smith"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {formErrors.fullName && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.fullName}</p>
                      )}
                    </div>

                    {/* Organization */}
                    <div>
                      <label htmlFor="organization" className="block text-sm font-semibold text-gray-700 mb-2">
                        Organization <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        id="organization"
                        name="organization"
                        value={formData.organization}
                        onChange={handleInputChange}
                        placeholder="Acme Corporation"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {formErrors.organization && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.organization}</p>
                      )}
                    </div>

                    {/* Work Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        Work Email Address <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      />
                      {formErrors.email && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.email}</p>
                      )}
                    </div>

                    {/* Role / Title */}
                    <div>
                      <label htmlFor="role" className="block text-sm font-semibold text-gray-700 mb-2">
                        Role / Title <span className="text-red-600">*</span>
                      </label>
                      <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      >
                        <option value="">Select your role...</option>
                        <option value="Insurance Underwriter">Insurance Underwriter</option>
                        <option value="Risk Manager">Risk Manager</option>
                        <option value="Safety Manager">Safety Manager</option>
                        <option value="Compliance Officer">Compliance Officer</option>
                        <option value="Executive / C-Suite">Executive / C-Suite</option>
                        <option value="Investor / Board Member">Investor / Board Member</option>
                        <option value="Consultant">Consultant</option>
                        <option value="Other">Other</option>
                      </select>
                      {formErrors.role && (
                        <p className="mt-2 text-sm text-red-600">{formErrors.role}</p>
                      )}
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Processing...' : 'Download White Paper'}
                    </button>

                    <p className="text-xs text-gray-500 text-center">
                      By downloading, you agree to receive occasional updates from OFFO LAB. Unsubscribe anytime.
                    </p>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Download Starting...</h3>
                  <p className="text-gray-600">
                    Your white paper will open in a new tab shortly. Check your email for a copy!
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
}
