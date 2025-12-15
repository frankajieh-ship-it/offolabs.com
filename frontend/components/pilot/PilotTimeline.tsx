'use client'

import { useState } from 'react'
import { Calendar, CheckCircle, Clock, Users } from 'lucide-react'

const timelineSteps = [
  {
    phase: 'Phase 0',
    title: 'Application & Screening',
    duration: '1-2 weeks',
    description: 'Submit application, initial screening call, and data readiness assessment',
    icon: Calendar,
    status: 'current'
  },
  {
    phase: 'Phase 1',
    title: 'Onboarding & Integration',
    duration: '2-3 weeks',
    description: 'Data integration setup, team training, and initial configuration',
    icon: Users,
    status: 'upcoming'
  },
  {
    phase: 'Phase 2',
    title: 'Live Implementation',
    duration: '8-12 weeks',
    description: 'Real-time monitoring, weekly syncs, and performance optimization',
    icon: Clock,
    status: 'upcoming'
  },
  {
    phase: 'Phase 3',
    title: 'Evaluation & Transition',
    duration: '2 weeks',
    description: 'Impact analysis, case study development, and production transition',
    icon: CheckCircle,
    status: 'upcoming'
  }
]

export default function PilotTimeline() {
  const [activeStep, setActiveStep] = useState(0)

  return (
    <div className="mx-auto max-w-6xl">
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
        Pilot Program Timeline
      </h2>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200 md:left-1/2 md:-translate-x-1/2"></div>

        {/* Timeline Steps */}
        <div className="space-y-12">
          {timelineSteps.map((step, index) => (
            <div
              key={index}
              className={`relative flex flex-col md:flex-row items-center ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot */}
              <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 z-10">
                <div className={`h-8 w-8 rounded-full border-4 border-white flex items-center justify-center ${
                  index === activeStep
                    ? 'bg-blue-600'
                    : index < activeStep
                    ? 'bg-green-500'
                    : 'bg-gray-300'
                }`}>
                  <step.icon className="h-4 w-4 text-white" />
                </div>
              </div>

              {/* Content Card */}
              <div className={`ml-12 md:ml-0 md:w-5/12 ${
                index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'
              }`}>
                <div
                  className={`p-6 rounded-xl border cursor-pointer transition-all ${
                    index === activeStep
                      ? 'border-blue-300 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                  }`}
                  onClick={() => setActiveStep(index)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${
                      index === activeStep
                        ? 'bg-blue-100 text-blue-800'
                        : index < activeStep
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {step.phase}
                    </span>
                    <span className="text-sm text-gray-500">{step.duration}</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.description}</p>

                  {index === activeStep && (
                    <div className="mt-4 p-3 bg-white rounded-lg border border-blue-200">
                      <h4 className="font-medium text-blue-900 mb-1">Current Focus:</h4>
                      <p className="text-sm text-blue-700">
                        {index === 0 && 'We are currently reviewing applications and scheduling initial calls.'}
                        {index === 1 && 'Setting up data integrations and training pilot teams.'}
                        {index === 2 && 'Monitoring real-time signals and optimizing risk models.'}
                        {index === 3 && 'Measuring impact and preparing for production deployment.'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
