'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Loader2, Send, CheckCircle } from 'lucide-react'

const formSchema = z.object({
  companyName: z.string().min(2, 'Company name is required'),
  industry: z.string().min(1, 'Please select an industry'),
  locationCount: z.string().min(1, 'Please select number of locations'),
  teamSize: z.string().min(1, 'Please select team size'),
  contactName: z.string().min(2, 'Contact name is required'),
  contactEmail: z.string().email('Valid email is required'),
  contactRole: z.string().min(2, 'Role is required'),
  currentTools: z.string().optional(),
  dataSources: z.array(z.string()).min(1, 'Select at least one data source'),
  primaryChallenge: z.string().min(10, 'Please describe your challenge'),
  timeline: z.string().min(1, 'Please select timeline'),
  agreeTerms: z.boolean().refine(val => val === true, 'You must agree to the terms'),
})

type FormData = z.infer<typeof formSchema>

const industries = [
  'Restaurant / Food Service',
  'Medical Facility / Healthcare',
  'Manufacturing / Industrial',
  'Multi-unit Retail / Franchise',
  'Hospitality / Hotels',
  'Construction',
  'Field Services / Utilities',
  'Other'
]

const locationCounts = [
  '1 location',
  '2-5 locations',
  '6-20 locations',
  '21-50 locations',
  '50+ locations'
]

const teamSizes = [
  '1-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees'
]

const dataSources = [
  'Permit & Inspection Records (paper or digital)',
  'Training & Certification Records',
  'Safety Incident Reports',
  'Health Department Inspection History',
  'Fire Marshal / Building Inspection Records',
  'Equipment Maintenance Logs',
  'Staff Scheduling / HR Systems',
  'Quality Assurance / Compliance Audits',
  'Equipment Sensors / IoT',
  'Other (will specify in challenge description)'
]

export default function EligibilityForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      companyName: '',
      industry: '',
      locationCount: '',
      teamSize: '',
      contactName: '',
      contactEmail: '',
      contactRole: '',
      currentTools: '',
      dataSources: [],
      primaryChallenge: '',
      timeline: '',
      agreeTerms: false,
    },
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In production, this would be:
    // await fetch('/api/pilot/application', {
    //   method: 'POST',
    //   body: JSON.stringify(data),
    // });

    console.log('Form submitted:', data)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      form.reset()
    }, 5000)
  }

  if (isSubmitted) {
    return (
      <div className="mx-auto max-w-2xl text-center p-12">
        <div className="mb-6">
          <div className="inline-flex items-center justify-center h-16 w-16 rounded-full bg-green-100">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Application Submitted!
        </h3>
        <p className="text-gray-600 mb-6">
          Thank you for your interest in the OFFO Pilot Program.
          Our team will review your application and contact you within 2 business days.
        </p>
        <p className="text-sm text-gray-500">
          Next steps: Initial screening call → Data readiness assessment → Onboarding
        </p>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl">
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Company Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Company Name *
                </label>
                <Input
                  {...form.register('companyName')}
                  placeholder="Acme Corporation"
                  error={form.formState.errors.companyName?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Industry *
                </label>
                <Select
                  onValueChange={(value) => form.setValue('industry', value)}
                  value={form.watch('industry')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select industry" />
                  </SelectTrigger>
                  <SelectContent>
                    {industries.map((industry) => (
                      <SelectItem key={industry} value={industry}>
                        {industry}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.industry.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Number of Locations *
                </label>
                <Select
                  onValueChange={(value) => form.setValue('locationCount', value)}
                  value={form.watch('locationCount')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select location count" />
                  </SelectTrigger>
                  <SelectContent>
                    {locationCounts.map((count) => (
                      <SelectItem key={count} value={count}>
                        {count}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.locationCount && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.locationCount.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Team Size *
                </label>
                <Select
                  onValueChange={(value) => form.setValue('teamSize', value)}
                  value={form.watch('teamSize')}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team size" />
                  </SelectTrigger>
                  <SelectContent>
                    {teamSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {form.formState.errors.teamSize && (
                  <p className="text-sm text-red-600 mt-1">
                    {form.formState.errors.teamSize.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <Input
                  {...form.register('contactName')}
                  placeholder="Jane Smith"
                  error={form.formState.errors.contactName?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  {...form.register('contactEmail')}
                  type="email"
                  placeholder="jane@company.com"
                  error={form.formState.errors.contactEmail?.message}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Your Role *
                </label>
                <Input
                  {...form.register('contactRole')}
                  placeholder="Head of Safety / Engineering Director"
                  error={form.formState.errors.contactRole?.message}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Current Tools */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Current Compliance/Risk Tools (Optional)
            </label>
            <Input
              {...form.register('currentTools')}
              placeholder="e.g., Excel spreadsheets, ComplianceBridge, SafetyCulture, etc."
              error={form.formState.errors.currentTools?.message}
            />
            <p className="text-xs text-gray-500 mt-1">
              List any tools you currently use for permit tracking, compliance management, or risk monitoring
            </p>
          </div>
        </div>

        {/* Data Sources */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-gray-900">
            Available Data Sources
          </h3>
          <p className="text-sm text-gray-600">
            Select all data sources you currently use or can provide access to:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dataSources.map((source) => (
              <div key={source} className="flex items-center space-x-3">
                <Checkbox
                  id={`source-${source}`}
                  checked={form.watch('dataSources')?.includes(source)}
                  onCheckedChange={(checked) => {
                    const current = form.getValues('dataSources')
                    if (checked) {
                      form.setValue('dataSources', [...current, source])
                    } else {
                      form.setValue('dataSources', current.filter(s => s !== source))
                    }
                  }}
                />
                <label
                  htmlFor={`source-${source}`}
                  className="text-sm font-medium text-gray-700 cursor-pointer"
                >
                  {source}
                </label>
              </div>
            ))}
          </div>
          {form.formState.errors.dataSources && (
            <p className="text-sm text-red-600">
              {form.formState.errors.dataSources.message}
            </p>
          )}
        </div>

        {/* Challenge & Timeline */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Primary Challenge *
            </label>
            <Textarea
              {...form.register('primaryChallenge')}
              placeholder="Describe your main operational risk or safety challenge (e.g., balancing production speed with safety compliance, reducing incident rates, etc.)"
              rows={4}
              error={form.formState.errors.primaryChallenge?.message}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Desired Timeline *
            </label>
            <Select
              onValueChange={(value) => form.setValue('timeline', value)}
              value={form.watch('timeline')}
            >
              <SelectTrigger>
                <SelectValue placeholder="When would you like to start?" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="immediate">Immediately (within 2 weeks)</SelectItem>
                <SelectItem value="1month">Within 1 month</SelectItem>
                <SelectItem value="3months">Within 3 months</SelectItem>
                <SelectItem value="exploring">Exploring options, no set timeline</SelectItem>
              </SelectContent>
            </Select>
            {form.formState.errors.timeline && (
              <p className="text-sm text-red-600 mt-1">
                {form.formState.errors.timeline.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="terms"
              checked={form.watch('agreeTerms')}
              onCheckedChange={(checked) => form.setValue('agreeTerms', checked === true)}
            />
            <label htmlFor="terms" className="text-sm text-gray-700 cursor-pointer">
              I agree to the terms of the pilot program, including data handling policies
              and participation requirements. I understand this is a collaborative research
              partnership and commit to providing feedback throughout the pilot period.
            </label>
          </div>
          {form.formState.errors.agreeTerms && (
            <p className="text-sm text-red-600">
              {form.formState.errors.agreeTerms.message}
            </p>
          )}

          <p className="text-xs text-gray-500">
            By submitting this form, you agree to OFFO's Privacy Policy and Terms of Service.
            We will only use your information to evaluate your pilot eligibility and will not
            share it with third parties without your consent.
          </p>
        </div>

        {/* Submit */}
        <div className="pt-6 border-t border-gray-200">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full md:w-auto px-8 py-3"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              <>
                <Send className="mr-2 h-4 w-4" />
                Submit Application
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  )
}
