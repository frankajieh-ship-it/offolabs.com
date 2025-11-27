'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CaseStudy {
  name: string
  description: string
  tag: string
  href: string
  color: string
}

export default function CaseStudiesSection() {
  const caseStudies: CaseStudy[] = [
    {
      name: 'CodeCrack',
      description:
        'AI-enhanced number logic game built with Expo / React Native and multi-mode gameplay engine.',
      tag: 'Game + AI Opponents + Live Ops Ready',
      href: '/products/codecrack',
      color: 'from-purple-500 to-purple-400',
    },
    {
      name: 'Renov.AI',
      description:
        'Computer vision + generative design pipeline turning room photos into new interior concepts.',
      tag: 'Object Detection + Design Generation',
      href: '/products/renov-ai',
      color: 'from-pink-500 to-pink-400',
    },
    {
      name: 'Engine Acoustic AI',
      description:
        'FFT-based acoustic diagnostics under active R&D, built for preventive maintenance workflows.',
      tag: 'Predictive Maintenance + Audio/FFT',
      href: '/products/engine-acoustic-ai',
      color: 'from-blue-500 to-blue-400',
    },
    {
      name: 'OFFO AI Systems',
      description:
        'Internal and client-facing multi-agent architectures powering automation, strategy docs, and product builds.',
      tag: 'Agents + Workflows + B2B Tools',
      href: '/products/offo-ai',
      color: 'from-green-500 to-green-400',
    },
  ]

  return (
    <section className="py-16 sm:py-24 lg:py-32 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white">
            Case Studies from the OFFO Ecosystem
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We use our own pipeline on our own products — so you're not our first experiment.
          </p>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {caseStudies.map((study, index) => (
            <Link key={index} href={study.href}>
              <div className="group h-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 p-8 hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-600 transition-all duration-300 cursor-pointer">
                {/* Color Accent */}
                <div className={`w-1 h-12 bg-gradient-to-b ${study.color} rounded mb-6 group-hover:h-16 transition-all duration-300`} />

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                  {study.name}
                </h3>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                  {study.description}
                </p>

                {/* Tag */}
                <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mb-4">
                  {study.tag}
                </div>

                {/* Link Arrow */}
                <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400 font-semibold group-hover:gap-3 transition-all">
                  Learn More
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}