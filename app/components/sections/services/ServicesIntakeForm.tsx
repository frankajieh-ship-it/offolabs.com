'use client'

import { useState, useRef, useEffect } from 'react'
import { CheckCircle, AlertCircle } from 'lucide-react'
import { FormInput } from '@/components/ui/FormInput'
import { FormTextarea } from '@/components/ui/FormTextarea'
import { FormSelect } from '@/components/ui/FormSelect'

interface FormData {
  name: string
  email: string
  company?: string
  serviceType: string
  budget?: string
  timeline?: string
  description: string
}

interface FormErrors {
  [key: string]: string
}

type SubmissionStatus = 'idle' | 'loading' | 'success' | 'error'

export default function ServicesIntakeForm() {
  const formRef = useRef<HTMLFormElement>(null)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    serviceType: '',
    budget: '',
    timeline: '',
    description: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  // Scroll to form if there are errors
  useEffect(() => {
    if (Object.keys(errors).length > 0 && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [errors])

  // Prefill form based on CTA context from sessionStorage
  useEffect(() => {
    const consultationRequested = sessionStorage.getItem('consultationRequested')
    if (consultationRequested === 'true') {
      setFormData((prev) => ({
        ...prev,
        serviceType: 'consultation',
      }))
      // Clear the sessionStorage flag after reading it
      sessionStorage.removeItem('consultationRequested')
    }
  }, [])

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    if (!formData.serviceType) {
      newErrors.serviceType = 'Please select a service type'
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Please describe your project or consultation needs'
    } else if (formData.description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setStatus('loading')
    setErrorMessage('')

    try {
      const response = await fetch('/api/services/intake', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          source: 'services_page',
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Failed to submit intake form')
      }

      setStatus('success')
      setFormData({
        name: '',
        email: '',
        company: '',
        serviceType: '',
        budget: '',
        timeline: '',
        description: '',
      })
      setErrors({})

      // Track analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'services_intake_submitted', {
          serviceType: formData.serviceType,
          source: 'services_page',
        })
      }

      // Reset form after 5 seconds
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred'
      setErrorMessage(message)
      setStatus('error')

      // Track error
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'services_intake_error', {
          error: message,
        })
      }
    }
  }

  return (
    <form
      ref={formRef}
      onSubmit={handleSubmit}
      className="space-y-6 max-w-2xl mx-auto"
    >
      {/* Name Field */}
      <FormInput
        id="name"
        name="name"
        type="text"
        label="Full Name"
        placeholder="Your name"
        value={formData.name}
        onChange={handleChange}
        error={errors.name}
        required
      />

      {/* Email Field */}
      <FormInput
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="your@email.com"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
      />

      {/* Company Field */}
      <FormInput
        id="company"
        name="company"
        type="text"
        label="Company / Organization (Optional)"
        placeholder="Your company name"
        value={formData.company}
        onChange={handleChange}
      />

      {/* Service Type Field */}
      <FormSelect
        id="serviceType"
        name="serviceType"
        label="Service Type"
        value={formData.serviceType}
        onChange={handleChange}
        error={errors.serviceType}
        required
        placeholder="Select the service you're interested in"
        options={[
          {
            value: 'product-development',
            label: 'AI-Accelerated Product Development',
          },
          {
            value: 'consultation',
            label: 'AI Strategy & Systems Consultation',
          },
          {
            value: 'full-execution',
            label: 'Full Project Execution & Delivery',
          },
          {
            value: 'other',
            label: 'Other / Not Sure',
          },
        ]}
      />

      {/* Budget Field */}
      <FormSelect
        id="budget"
        name="budget"
        label="Estimated Budget (Optional)"
        value={formData.budget}
        onChange={handleChange}
        placeholder="Select budget range"
        options={[
          { value: 'under-50k', label: 'Under $50K' },
          { value: '50k-100k', label: '$50K - $100K' },
          { value: '100k-250k', label: '$100K - $250K' },
          { value: '250k-500k', label: '$250K - $500K' },
          { value: '500k-plus', label: '$500K+' },
          { value: 'not-sure', label: 'Not sure yet' },
        ]}
      />

      {/* Timeline Field */}
      <FormSelect
        id="timeline"
        name="timeline"
        label="Project Timeline (Optional)"
        value={formData.timeline}
        onChange={handleChange}
        placeholder="Select desired timeline"
        options={[
          { value: 'immediate', label: 'Immediate / ASAP' },
          { value: '1-3-months', label: '1-3 months' },
          { value: '3-6-months', label: '3-6 months' },
          { value: '6-12-months', label: '6-12 months' },
          { value: 'flexible', label: 'Flexible' },
        ]}
      />

      {/* Description Field */}
      <FormTextarea
        id="description"
        name="description"
        label="Project Description / Consultation Request"
        placeholder="Tell us about your project, goals, and what you're looking to build or optimize..."
        value={formData.description}
        onChange={handleChange}
        error={errors.description}
        required
        rows={5}
        helperText="Minimum 20 characters. Be as specific as possible."
      />

      {/* Status Messages */}
      {status === 'success' && (
        <div className="p-4 rounded-lg bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 flex gap-3">
          <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-green-900 dark:text-green-100">
              Intake form submitted successfully!
            </p>
            <p className="text-sm text-green-800 dark:text-green-200 mt-1">
              We'll review your request and get back to you within 24 hours.
            </p>
          </div>
        </div>
      )}

      {status === 'error' && (
        <div className="p-4 rounded-lg bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 flex gap-3">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-red-900 dark:text-red-100">
              Error submitting form
            </p>
            <p className="text-sm text-red-800 dark:text-red-200 mt-1">
              {errorMessage}
            </p>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="w-full px-8 py-3 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {status === 'loading' ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Intake Form'
        )}
      </button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
        We respect your privacy. Your information will only be used to respond to your inquiry.
      </p>
    </form>
  )
}
