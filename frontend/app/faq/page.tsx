'use client';

import Link from 'next/link';
import { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqData: FAQItem[] = [
  {
    category: 'General',
    question: 'What is the OFFO Risk Score?',
    answer: 'The OFFO Risk Score is a behavioral risk intelligence metric that quantifies organizational compliance risk in real-time. It analyzes task completion patterns, training engagement, and documentation quality to predict potential incidents before they occur. Scores range from 0-100, with higher scores indicating lower risk.'
  },
  {
    category: 'General',
    question: 'How is the OFFO Risk Score different from traditional risk assessments?',
    answer: 'Traditional risk assessments are retrospective — they look at historical claims data and past incidents. The OFFO Risk Score is predictive and real-time, analyzing current behavioral patterns to identify risk trends before they escalate into claims or incidents.'
  },
  {
    category: 'Data & Privacy',
    question: 'What data does OFFO collect?',
    answer: 'OFFO collects compliance-related operational data including task completion logs, training records, and documentation accuracy metrics. We do not collect personally identifiable information (PII) beyond what\'s necessary for account administration. All data is encrypted and processed in accordance with our privacy policy.'
  },
  {
    category: 'Data & Privacy',
    question: 'How is my data protected?',
    answer: 'We use enterprise-grade security measures including TLS 1.3 encryption for data in transit, AES-256 encryption for data at rest, multi-factor authentication, role-based access control, and 24/7 security monitoring. We are working toward SOC 2 Type II compliance.'
  },
  {
    category: 'Data & Privacy',
    question: 'Who can see my risk score data?',
    answer: 'Your risk score data is only visible to authorized users within your organization. We never share customer data with third parties without explicit consent, except as required by law. OFFO employees have limited access under strict confidentiality agreements for support purposes only.'
  },
  {
    category: 'Integration',
    question: 'How does OFFO integrate with my existing systems?',
    answer: 'OFFO can integrate with most Learning Management Systems (LMS), task management platforms, and compliance databases via API or CSV upload. We provide documentation and support for common integrations including SafetySuite, Workday, and custom enterprise systems.'
  },
  {
    category: 'Integration',
    question: 'How long does implementation take?',
    answer: 'For CSV uploads, you can start scoring within 24 hours. API integrations typically take 1-2 weeks depending on system complexity and data availability. Our team provides onboarding support to ensure smooth implementation.'
  },
  {
    category: 'Scoring Methodology',
    question: 'What factors contribute to the risk score?',
    answer: 'The OFFO Risk Score is calculated using three weighted components: Task Completion (40%), Training Records (30%), and Documentation Quality (30%). Each component is scored independently and then combined into an overall risk score.'
  },
  {
    category: 'Scoring Methodology',
    question: 'How often is the risk score updated?',
    answer: 'Risk scores are recalculated in real-time as new data arrives. For most organizations, this means daily updates as tasks are completed, training is logged, and documents are updated. You can view historical trends to track score evolution over time.'
  },
  {
    category: 'Scoring Methodology',
    question: 'Can I customize the scoring weights?',
    answer: 'Currently, scoring weights are fixed based on our research and validation studies. However, enterprise customers can work with our team to develop custom scoring models tailored to specific industry requirements. Contact us to learn more.'
  },
  {
    category: 'Pricing & Plans',
    question: 'How much does OFFO cost?',
    answer: 'Pricing varies based on the number of entities you want to score and your integration requirements. Pilot program participants receive complimentary access for up to 10 entities. Contact our sales team for enterprise pricing.'
  },
  {
    category: 'Pricing & Plans',
    question: 'Is there a free trial?',
    answer: 'Yes! We offer a pilot program that provides free access to the OFFO Risk Score platform for qualified organizations. You can score up to 10 entities and receive full support from our team. Apply on our pilot program page.'
  },
  {
    category: 'Use Cases',
    question: 'Who uses the OFFO Risk Score?',
    answer: 'Three primary user groups: (1) Insurance underwriters use it for loss prevention and pricing decisions, (2) Enterprise risk managers use it to monitor operational compliance, and (3) Investors use it as part of due diligence to assess portfolio company maturity.'
  },
  {
    category: 'Use Cases',
    question: 'Can I use OFFO for regulatory compliance?',
    answer: 'OFFO is a risk intelligence tool, not a compliance certification service. However, many customers use OFFO\'s insights to improve their compliance posture ahead of audits and regulatory reviews. The platform helps identify gaps and track remediation progress.'
  },
  {
    category: 'Support',
    question: 'What kind of support do you provide?',
    answer: 'All customers receive email support with 24-hour response times. Pilot program participants and enterprise customers also receive onboarding assistance, training sessions, and dedicated account management. We\'re building a comprehensive knowledge base and community forum.'
  },
  {
    category: 'Support',
    question: 'How do I report a bug or request a feature?',
    answer: 'You can email support@offolab.com with bug reports or feature requests. We actively incorporate customer feedback into our product roadmap and will keep you updated on the status of your requests.'
  }
];

const categories = ['All', 'General', 'Data & Privacy', 'Integration', 'Scoring Methodology', 'Pricing & Plans', 'Use Cases', 'Support'];

export default function FAQPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filteredFAQs = selectedCategory === 'All'
    ? faqData
    : faqData.filter(faq => faq.category === selectedCategory);

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
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-900 text-white py-16">
        <div className="max-w-4xl mx-auto px-8 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-xl text-blue-100">
            Everything you need to know about OFFO Risk Score, compliance intelligence, and getting started.
          </p>
        </div>
      </section>

      {/* Content */}
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-blue-600 hover:text-blue-600'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {filteredFAQs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow-md border border-gray-200 overflow-hidden"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full p-6 flex items-center justify-between hover:bg-gray-50 transition text-left"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="px-2 py-1 bg-blue-100 text-blue-600 text-xs font-semibold rounded">
                      {faq.category}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className={`w-6 h-6 text-gray-400 transition-transform flex-shrink-0 ml-4 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 bg-blue-600 rounded-lg p-8 text-center text-white">
          <h2 className="text-2xl font-bold mb-4">Still Have Questions?</h2>
          <p className="text-blue-100 mb-6">
            Our team is here to help. Reach out and we'll get back to you within 24 hours.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:support@offolab.com"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-lg hover:bg-blue-50 transition-all shadow-xl"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Email Support
            </a>
            <Link
              href="/pilot"
              className="inline-flex items-center justify-center px-8 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white hover:text-blue-600 transition-all"
            >
              Join Pilot Program
            </Link>
          </div>
        </div>

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
