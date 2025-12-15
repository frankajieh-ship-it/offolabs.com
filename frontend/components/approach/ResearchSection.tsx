'use client'

import { FileText, BarChart, Shield, Users } from 'lucide-react'

const researchPapers = [
  {
    title: 'Correlation Between Output Pressure and Behavioral Drift',
    authors: 'OFFO Research Team',
    year: '2024',
    icon: BarChart,
    href: null,
    color: 'blue'
  },
  {
    title: 'Real-Time Risk Scoring Methodologies in Industrial Settings',
    authors: 'Chen, S. et al.',
    year: '2023',
    icon: Shield,
    href: null,
    color: 'green'
  },
  {
    title: 'Predictive Analytics for Safety Incident Prevention',
    authors: 'OFFO Research Team',
    year: '2024',
    icon: Users,
    href: null,
    color: 'purple'
  }
]

export default function ResearchSection() {
  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
          Research & Validation
        </h2>
        <p className="text-xl text-gray-600">
          Our methodology is grounded in academic research and industry validation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {researchPapers.map((paper, index) => (
          <div
            key={index}
            className="block p-6 rounded-xl border border-gray-200"
          >
            <div className="flex items-start space-x-4">
              <div className={`p-3 rounded-lg bg-${paper.color}-100`}>
                <paper.icon className={`h-6 w-6 text-${paper.color}-600`} />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-900 mb-2">
                  {paper.title}
                </h4>
                <p className="text-sm text-gray-600 mb-1">{paper.authors}</p>
                <div className="flex items-center justify-between mt-4">
                  <span className="text-xs font-medium text-gray-500">{paper.year}</span>
                  <span className="text-gray-400 text-sm font-medium italic">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-xl p-8 border border-gray-200">
        <div className="flex items-start">
          <FileText className="h-8 w-8 text-blue-600 mr-4 mt-1 flex-shrink-0" />
          <div className="flex-1">
            <h4 className="text-xl font-bold text-gray-900 mb-6">
              Methodology Validation
            </h4>
            <ul className="space-y-5 text-gray-700">
              <li className="flex items-start">
                <div className="mr-3 mt-1.5">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong className="font-semibold text-gray-900">Peer-reviewed</strong> through academic partnerships with Stanford Human Factors Lab</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1.5">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong className="font-semibold text-gray-900">Validation across 3 pilot industries</strong> (software, manufacturing, field operations)</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1.5">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong className="font-semibold text-gray-900">Continuous A/B testing</strong> of weighting algorithms with pilot participants</span>
              </li>
              <li className="flex items-start">
                <div className="mr-3 mt-1.5">
                  <svg className="h-5 w-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </div>
                <span><strong className="font-semibold text-gray-900">External audit</strong> by third-party risk assessment firm (Q3 2024)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
