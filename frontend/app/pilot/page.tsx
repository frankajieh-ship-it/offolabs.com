import PageHeader from '@/components/shared/PageHeader'
import PilotTimeline from '@/components/pilot/PilotTimeline'
import EligibilityForm from '@/components/pilot/EligibilityForm'
import FAQSection from '@/components/pilot/FAQSection'
import { Separator } from '@/components/ui/separator'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Clock, Users, Target } from 'lucide-react'

export const metadata = {
  title: 'Pilot Program | OFFO Risk Intelligence',
  description: 'Join our Phase 1 pilot program to implement OFFO\'s real-time risk intelligence system.',
}

const benefits = [
  {
    icon: CheckCircle,
    title: 'Early Access',
    description: 'Be among the first to deploy Harmony Engine™ with dedicated support'
  },
  {
    icon: Clock,
    title: 'Influence Development',
    description: 'Shape product roadmap based on your operational needs'
  },
  {
    icon: Users,
    title: 'Expert Partnership',
    description: 'Direct access to OFFO research and engineering teams'
  },
  {
    icon: Target,
    title: 'Reduced Pricing',
    description: 'Significant discounts for founding pilot participants'
  }
]

export default function PilotPage() {
  return (
    <div className="min-h-screen">
      <PageHeader
        title="Pilot Program"
        subtitle="Phase 1 Implementation Partnership"
        breadcrumb={[{ label: 'Home', href: '/' }, { label: 'Pilot' }]}
      />

      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {/* Introduction */}
        <section className="mb-16 text-center">
          <div className="mx-auto max-w-3xl">
            <div className="mb-6">
              <span className="inline-flex items-center rounded-full bg-green-100 px-4 py-2 text-sm font-medium text-green-800">
                Limited Slots Available
              </span>
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-6">
              Join Our Phase 1 Pilot Program
            </h1>
            <p className="text-xl text-gray-600">
              Partner with us to implement OFFO's real-time risk intelligence system
              and help shape the future of operational safety optimization.
            </p>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Pilot Program Benefits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="border-gray-200 hover:border-green-200 transition-colors">
                <CardHeader>
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="rounded-lg bg-green-100 p-2">
                      <benefit.icon className="h-6 w-6 text-green-600" />
                    </div>
                    <CardTitle className="text-lg">{benefit.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Timeline */}
        <section className="mb-16">
          <PilotTimeline />
        </section>

        <Separator className="my-12" />

        {/* Target Industries */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 text-center mb-12">
            Target Industries
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Software & DevOps',
                description: 'Engineering teams with measurable deployment metrics and quality signals',
                criteria: ['50+ engineers', 'CI/CD pipeline', 'Incident tracking']
              },
              {
                title: 'Manufacturing',
                description: 'Industrial operations with production quotas and safety compliance needs',
                criteria: ['200+ employees', 'Safety reporting', 'Quality control systems']
              },
              {
                title: 'Field Operations',
                description: 'Field service teams with mobile workforce and safety protocols',
                criteria: ['Distributed teams', 'Safety training', 'Work order systems']
              }
            ].map((industry, index) => (
              <Card key={index} className="border-gray-200">
                <CardHeader>
                  <CardTitle className="text-xl">{industry.title}</CardTitle>
                  <p className="text-gray-600 mt-2">{industry.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-medium text-gray-900 mb-3">Ideal Candidate:</h4>
                  <ul className="space-y-2">
                    {industry.criteria.map((criterion, i) => (
                      <li key={i} className="flex items-center text-gray-700">
                        <div className="mr-3 h-2 w-2 rounded-full bg-blue-500"></div>
                        {criterion}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Separator className="my-12" />

        {/* Eligibility Form */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
              Apply for Pilot Program
            </h2>
            <p className="text-gray-600">
              Complete this brief form to assess eligibility for Phase 1
            </p>
          </div>
          <EligibilityForm />
        </section>

        <Separator className="my-12" />

        {/* FAQ */}
        <section className="mb-16">
          <FAQSection />
        </section>

        {/* Footer */}
        <footer className="mt-12 pt-6 border-t border-gray-300">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
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
        </footer>
      </main>
    </div>
  )
}
