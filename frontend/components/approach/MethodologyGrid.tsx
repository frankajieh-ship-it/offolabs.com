'use client'

import { CheckCircle, BarChart3, Eye, RefreshCw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const methodologySections = [
  {
    icon: BarChart3,
    title: 'Risk Score Inputs',
    description: 'Multi-source signal ingestion for comprehensive risk assessment',
    items: [
      'Training & Compliance Data',
      'Incident & Near-Miss Logs',
      'Operational Performance Metrics',
      'Behavioral Pattern Analysis'
    ]
  },
  {
    icon: CheckCircle,
    title: 'Weighting Logic',
    description: 'Dynamic prioritization based on impact and correlation',
    items: [
      'Weighted by historical impact severity',
      'Adjusted for signal frequency and recency',
      'Correlation-weighted for predictive power',
      'Industry-specific coefficient calibration'
    ]
  },
  {
    icon: Eye,
    title: 'Auditability',
    description: 'Transparent, explainable scoring methodology',
    items: [
      'All scores are explainable and traceable',
      'Full attribution to source signals',
      'Audit log of all score calculations',
      'Exportable methodology documentation'
    ]
  },
  {
    icon: RefreshCw,
    title: 'Update Frequency',
    description: 'Continuous intelligence refresh',
    items: [
      'Continuously updated as signals arrive',
      'Real-time alerting on significant changes',
      'Daily/weekly trend analysis',
      'Historical performance benchmarking'
    ]
  }
]

export default function MethodologyGrid() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
      {methodologySections.map((section, index) => (
        <Card key={index} className="border-gray-200 hover:border-blue-200 transition-colors">
          <CardHeader>
            <div className="flex items-center space-x-3">
              <div className="rounded-lg bg-blue-100 p-2">
                <section.icon className="h-6 w-6 text-blue-600" />
              </div>
              <CardTitle className="text-xl">{section.title}</CardTitle>
            </div>
            <p className="text-gray-600 mt-2">{section.description}</p>
          </CardHeader>
          <CardContent>
            <ul className="space-y-3">
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex} className="flex items-start">
                  <div className="mr-3 mt-1 h-5 w-5 flex-shrink-0">
                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                  </div>
                  <span className="text-gray-700">{item}</span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
