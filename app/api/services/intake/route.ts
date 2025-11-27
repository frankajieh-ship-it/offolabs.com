import { NextRequest, NextResponse } from 'next/server'
import { sendUserConfirmationEmail, sendSupportNotificationEmail } from '@/lib/email/sendIntakeEmail'

interface ServicesIntakeRequest {
  name: string
  email: string
  company?: string
  serviceType: string
  budget?: string
  timeline?: string
  description: string
  source?: string
}

interface ServicesIntakeResponse {
  success: boolean
  message: string
  data?: {
    id: string
    email: string
    serviceType: string
    submittedAt: string
  }
  error?: string
}

/**
 * POST /api/services/intake
 *
 * Handle services intake form submissions
 *
 * Body:
 * {
 *   name: string (required)
 *   email: string (required)
 *   company: string (optional)
 *   serviceType: string (required) - 'product-development' | 'consultation' | 'full-execution' | 'other'
 *   budget: string (optional) - 'under-50k' | '50k-100k' | '100k-250k' | '250k-500k' | '500k-plus' | 'not-sure'
 *   timeline: string (optional) - 'immediate' | '1-3-months' | '3-6-months' | '6-12-months' | 'flexible'
 *   description: string (required)
 *   source: string (optional) - e.g., 'services_page'
 * }
 */
export async function POST(
  request: NextRequest
): Promise<NextResponse<ServicesIntakeResponse>> {
  try {
    const body = (await request.json()) as Partial<ServicesIntakeRequest>

    // Validate required fields
    if (!body.name || typeof body.name !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Name is required',
          error: 'INVALID_NAME',
        },
        { status: 400 }
      )
    }

    if (!body.email || typeof body.email !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Email is required',
          error: 'INVALID_EMAIL',
        },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        {
          success: false,
          message: 'Invalid email format',
          error: 'INVALID_EMAIL_FORMAT',
        },
        { status: 400 }
      )
    }

    if (!body.serviceType || typeof body.serviceType !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Service type is required',
          error: 'INVALID_SERVICE_TYPE',
        },
        { status: 400 }
      )
    }

    if (!body.description || typeof body.description !== 'string') {
      return NextResponse.json(
        {
          success: false,
          message: 'Project description is required',
          error: 'INVALID_DESCRIPTION',
        },
        { status: 400 }
      )
    }

    if (body.description.length < 20) {
      return NextResponse.json(
        {
          success: false,
          message: 'Description must be at least 20 characters',
          error: 'DESCRIPTION_TOO_SHORT',
        },
        { status: 400 }
      )
    }

    // Log submission
    console.log('Services intake submission:', {
      name: body.name,
      email: body.email,
      company: body.company,
      serviceType: body.serviceType,
      budget: body.budget,
      timeline: body.timeline,
      description: body.description,
      source: body.source,
      timestamp: new Date().toISOString(),
    })

    // Send emails in parallel (non-blocking)
    const intakeData = {
      name: body.name,
      email: body.email,
      company: body.company,
      serviceType: body.serviceType,
      budget: body.budget,
      timeline: body.timeline,
      description: body.description,
      source: body.source,
    }

    // Send user confirmation email
    const userEmailResult = await sendUserConfirmationEmail(intakeData)
    if (!userEmailResult.success) {
      console.warn('Failed to send user confirmation email:', userEmailResult.error)
    }

    // Send internal support notification
    const supportEmailResult = await sendSupportNotificationEmail(intakeData)
    if (!supportEmailResult.success) {
      console.warn('Failed to send support notification:', supportEmailResult.error)
    }

    // TODO: In production, you would also:
    // 1. Save to database (Supabase, PostgreSQL, etc.)
    // 2. Add to CRM (HubSpot, Pipedrive, Salesforce, etc.)
    // 3. Create internal project/opportunity record
    // 4. Track analytics (amplitude, mixpanel, etc.)
    // 5. Trigger webhooks or automations

    const mockId = `si_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json(
      {
        success: true,
        message: 'Services intake form submitted successfully',
        data: {
          id: mockId,
          email: body.email,
          serviceType: body.serviceType,
          submittedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Services intake API error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to submit intake form',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/services/intake
 *
 * Health check / endpoint info
 */
export async function GET(): Promise<
  NextResponse<{ message: string; endpoint: string }>
> {
  return NextResponse.json({
    message: 'Services Intake API',
    endpoint: 'POST to this endpoint with services intake form data',
  })
}