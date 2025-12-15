'use client'

import HarmonyEngineWidget from '@/components/HarmonyEngineWidget'
import TrustSignals from '@/components/TrustSignals'
import { BarChart3, Shield } from 'lucide-react'

export default function HarmonyEnginePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section - WCAG Compliant */}
        <div className="mb-10 rounded-2xl bg-gradient-to-r from-offo-navy to-offo-blue p-8 relative overflow-hidden">
          {/* Translucent white overlay for better text contrast */}
          <div className="absolute inset-0 bg-white/5 backdrop-blur-[1px]"></div>

          <div className="relative z-10">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8">
              <div className="max-w-3xl">
                <h2 className="text-h1 font-bold text-white mb-4 tracking-tight">
                  Why Harmony Matters
                </h2>
                <p className="text-body-lg text-white/95 mb-6 max-w-prose">
                  Our research shows that output pressure correlates with behavioral drift.
                  When teams push for speed, safety and compliance often suffer.
                  The Harmony Engine™ visualizes this tension so you can optimize both.
                </p>

                {/* Key Features List */}
                <ul className="space-y-3">
                  {[
                    {
                      icon: <BarChart3 className="h-5 w-5 text-green-300" />,
                      title: 'Operational Output',
                      desc: 'Deployment frequency, task completion'
                    },
                    {
                      icon: <Shield className="h-5 w-5 text-amber-300" />,
                      title: 'Risk & Safety',
                      desc: 'Compliance, quality, incident prevention'
                    },
                    {
                      icon: (
                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-gradient-to-r from-blue-400 to-green-400">
                          <span className="text-[10px] font-bold text-white">⇄</span>
                        </div>
                      ),
                      title: 'Intelligent Balance',
                      desc: 'Find the optimal harmony between them'
                    }
                  ].map((item, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-3 mt-1 flex-shrink-0">{item.icon}</div>
                      <div>
                        <p className="font-semibold text-white">{item.title}</p>
                        <p className="text-sm text-white/80">{item.desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pilot Industries Sidebar */}
              <div className="hidden lg:block flex-shrink-0 rounded-xl bg-white/10 p-6 backdrop-blur-sm border border-white/20">
                <h3 className="font-semibold text-white mb-4">Phase 1 Pilot Industries</h3>
                <ol className="space-y-3">
                  <li className="flex items-center rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                    <div className="mr-3 h-3 w-3 rounded-full bg-green-400 flex-shrink-0"></div>
                    <div>
                      <span className="font-medium text-white">Software & DevOps</span>
                      <span className="ml-2 text-xs text-white/90">(Primary)</span>
                    </div>
                  </li>
                  <li className="flex items-center rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                    <div className="mr-3 h-3 w-3 rounded-full bg-amber-400 flex-shrink-0"></div>
                    <span className="text-white">Manufacturing & Industrial</span>
                  </li>
                  <li className="flex items-center rounded-lg bg-white/20 px-3 py-2 backdrop-blur-sm">
                    <div className="mr-3 h-3 w-3 rounded-full bg-blue-400 flex-shrink-0"></div>
                    <span className="text-white">Field Service Operations</span>
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals Section */}
        <TrustSignals />

        {/* Main Widget Area */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3 mt-10">
          {/* Left Panel - Simulation Controls */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-h3 text-gray-900 mb-2 tracking-tight">Simulation Controls</h3>
              <p className="text-body text-gray-600 mb-6">
                Toggle between states to see how harmony, drift, and overload affect operations.
              </p>

              <div className="space-y-4">
                {[
                  {
                    color: 'green',
                    title: 'Harmony State',
                    desc: 'Output and safety are balanced. This is the sustainable operational zone.',
                    dotClass: 'bg-green-500'
                  },
                  {
                    color: 'amber',
                    title: 'Drift State',
                    desc: 'High output pressure causing safety/compliance drift. Risk is increasing.',
                    dotClass: 'bg-amber-500'
                  },
                  {
                    color: 'red',
                    title: 'Overload State',
                    desc: 'Maximum output causing critical safety compromises. Immediate attention needed.',
                    dotClass: 'bg-red-500'
                  }
                ].map((state, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-4 hover:border-gray-300 transition-colors">
                    <div className="flex items-center mb-2">
                      <div className={`h-3 w-3 rounded-full ${state.dotClass} flex-shrink-0`}></div>
                      <span className="ml-2 font-semibold text-gray-900">{state.title}</span>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {state.desc}
                    </p>
                  </div>
                ))}
              </div>

              {/* Data Sources */}
              <div className="mt-8 border-t border-gray-200 pt-6">
                <h4 className="font-semibold text-gray-900 mb-4">Input Data Streams</h4>
                <ul className="space-y-3">
                  {[
                    { color: 'bg-blue-500', label: 'Deployment Frequency (CI/CD logs)' },
                    { color: 'bg-purple-500', label: 'Feature Completion (Jira/Asana)' },
                    { color: 'bg-green-500', label: 'Incident & Safety Reports' },
                    { color: 'bg-amber-500', label: 'Training Compliance (LMS)' }
                  ].map((source, index) => (
                    <li key={index} className="flex items-start">
                      <div className={`mr-3 mt-1 h-2 w-2 rounded-full ${source.color} flex-shrink-0`}></div>
                      <span className="text-sm text-gray-600">{source.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Center Panel - Main Widget */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-6">
                <h2 className="text-h2 text-gray-900 mb-2 tracking-tight">Dual-Meter Visualization</h2>
                <p className="text-body text-gray-600">Real-time simulation of Pace vs Precision dynamics</p>
              </div>

              {/* Harmony Engine Widget */}
              <div className="min-h-[500px] rounded-lg bg-gradient-to-b from-gray-50 to-white p-6 border border-gray-100">
                <HarmonyEngineWidget
                  initialState="harmony"
                  showTrendline={true}
                  theme="light"
                />
              </div>

              {/* Metrics Explanation */}
              <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-lg bg-blue-50 p-5 border border-blue-100">
                  <h4 className="font-semibold text-blue-900 mb-3">Operational Output (Pace)</h4>
                  <p className="text-sm text-blue-800 leading-relaxed mb-3">
                    Measures how effectively your team ships value. Based on deployment frequency,
                    task completion rates, and throughput metrics.
                  </p>
                  <div className="text-xs font-mono text-blue-700 bg-blue-100 rounded px-2 py-1">
                    Formula: 0.4×Deployments + 0.3×Completion + 0.2×Impact + 0.1×Team Health
                  </div>
                </div>
                <div className="rounded-lg bg-green-50 p-5 border border-green-100">
                  <h4 className="font-semibold text-green-900 mb-3">Risk & Safety Behavior (Precision)</h4>
                  <p className="text-sm text-green-800 leading-relaxed mb-3">
                    Tracks compliance adherence, safety practices, and quality standards.
                    Lower scores indicate behavioral drift and increased risk.
                  </p>
                  <div className="text-xs font-mono text-green-700 bg-green-100 rounded px-2 py-1">
                    Components: Training compliance, incident rates, SOP adherence, quality metrics
                  </div>
                </div>
              </div>
            </div>

            {/* Use Cases Section */}
            <div className="mt-8 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="text-h3 text-gray-900 mb-6 tracking-tight">Pilot Use Cases</h3>
              <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                {[
                  {
                    emoji: '👨‍💻',
                    bgColor: 'bg-blue-100',
                    title: 'Software Teams',
                    desc: 'Monitor deployment velocity vs. code quality and incident rates. Identify when speed compromises stability.'
                  },
                  {
                    emoji: '🏭',
                    bgColor: 'bg-amber-100',
                    title: 'Manufacturing',
                    desc: 'Balance production output with safety compliance and quality control. Detect when output pressure causes procedural shortcuts.'
                  },
                  {
                    emoji: '🔧',
                    bgColor: 'bg-green-100',
                    title: 'Field Operations',
                    desc: 'Track job completion rates against safety protocol adherence. Flag when technicians rush jobs and skip safety steps.'
                  }
                ].map((useCase, index) => (
                  <div key={index} className="rounded-lg border border-gray-200 p-5 hover:border-gray-300 transition-colors">
                    <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-full ${useCase.bgColor}`}>
                      <span className="text-2xl">{useCase.emoji}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{useCase.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {useCase.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-12 border-t border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="text-center md:text-left">
              <span className="text-lg font-bold text-gray-900">OFFO LAB</span>
              <span className="ml-2 text-gray-600">Harmony Engine™ Prototype v0.1</span>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm text-gray-500">
              <span>Phase 0: Visual Prototype</span>
              <span className="hidden sm:inline">•</span>
              <span>Data: Simulated</span>
              <span className="hidden sm:inline">•</span>
              <span>Next: Phase 1 Pilot Integration</span>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-gray-400 max-w-prose mx-auto leading-relaxed">
            © {new Date().getFullYear()} OFFO LAB. Harmony Engine™ is a trademark of OFFO LAB.
            This is a prototype for demonstration purposes only.
          </div>
        </div>
      </footer>
    </div>
  )
}
