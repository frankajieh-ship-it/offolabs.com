import { NextRequest, NextResponse } from 'next/server'

interface TalentNetworkRequest {
  email: string
  name: string
  linkedinUrl?: string
  message?: string
  source?: string
}

interface TalentNetworkResponse {
  success: boolean
  message: string
  data?: {
    id: string
    email: string
    name: string
    addedAt: string
  }
  error?: string
}

/**
 * POST /api/talent-network
 *
 * Add candidate to talent network
 *
 * Body:
 * {
 *   email: string (required)
 *   name: string (required)
 *   linkedinUrl: string (optional)
 *   message: string (optional)
 *   source: string (optional, e.g., "careers_page")
 * }
 */
export async function POST(request: NextRequest): Promise<NextResponse<TalentNetworkResponse>> {
  try {
    const body = await request.json() as Partial<TalentNetworkRequest>

    // Validate required fields
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

    // Basic email validation
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

    // TODO: Replace with actual database/email service call
    // For now, just log and return success
    console.log('Talent network signup:', {
      email: body.email,
      name: body.name,
      linkedinUrl: body.linkedinUrl,
      message: body.message,
      source: body.source,
      timestamp: new Date().toISOString(),
    })

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to mailing list (Mailchimp, ConvertKit, etc.)
    // 4. Track analytics
    // 5. Create candidate profile record

    const mockId = `tn_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json(
      {
        success: true,
        message: 'Successfully joined talent network',
        data: {
          id: mockId,
          email: body.email,
          name: body.name,
          addedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Talent network API error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to join talent network',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/talent-network
 *
 * Health check / endpoint info
 */
export async function GET(): Promise<NextResponse<{ message: string; endpoint: string }>> {
  return NextResponse.json({
    message: 'Talent Network API',
    endpoint: 'POST to this endpoint with email and name to join talent network',
  })
}