import { NextRequest, NextResponse } from 'next/server'

interface WaitlistRequest {
  email: string
  product?: string
  name?: string
  source?: string
}

interface WaitlistResponse {
  success: boolean
  message: string
  data?: {
    id: string
    email: string
    product: string
    addedAt: string
  }
  error?: string
}

/**
 * POST /api/waitlist
 *
 * Add email to product waitlist
 *
 * Body:
 * {
 *   email: string (required)
 *   product: string (optional, default: "general")
 *   name: string (optional)
 *   source: string (optional, e.g., "hero_cta", "footer", "popup")
 * }
 *
 * Query params:
 * ?product=codecrack (optional alternative to body)
 */
export async function POST(request: NextRequest): Promise<NextResponse<WaitlistResponse>> {
  try {
    const body = await request.json() as Partial<WaitlistRequest>
    const product = request.nextUrl.searchParams.get('product') || body.product || 'general'

    // Validate email
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
    console.log('Waitlist signup:', {
      email: body.email,
      product,
      name: body.name,
      source: body.source,
      timestamp: new Date().toISOString(),
    })

    // In production, you would:
    // 1. Save to database
    // 2. Send confirmation email
    // 3. Add to mailing list (Mailchimp, ConvertKit, etc.)
    // 4. Track analytics

    const mockId = `wl_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    return NextResponse.json(
      {
        success: true,
        message: `Successfully added to ${product} waitlist`,
        data: {
          id: mockId,
          email: body.email,
          product,
          addedAt: new Date().toISOString(),
        },
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Waitlist API error:', error)

    return NextResponse.json(
      {
        success: false,
        message: 'Failed to add to waitlist',
        error: 'INTERNAL_ERROR',
      },
      { status: 500 }
    )
  }
}

/**
 * GET /api/waitlist
 *
 * Health check / endpoint info
 */
export async function GET(): Promise<NextResponse<{ message: string; endpoint: string }>> {
  return NextResponse.json({
    message: 'Waitlist API',
    endpoint: 'POST to this endpoint with email to join waitlist',
  })
}
