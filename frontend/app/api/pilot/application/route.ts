import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { createServerSupabaseClient } from '@/lib/supabase/server'
import crypto from 'crypto'

// Validation schema (matches frontend form)
const applicationSchema = z.object({
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

  // Honeypot field (should be empty)
  website: z.string().optional(),
})

// Rate limiting store (in-memory, replace with Redis in production)
const rateLimitStore = new Map<string, number[]>()
const RATE_LIMIT_WINDOW = 60 * 60 * 1000 // 1 hour
const MAX_REQUESTS = 3 // Max 3 submissions per IP per hour

function hashIP(ip: string): string {
  return crypto.createHash('sha256').update(ip).digest('hex')
}

function checkRateLimit(ipHash: string): boolean {
  const now = Date.now()
  const requests = rateLimitStore.get(ipHash) || []

  // Remove old requests outside the window
  const recentRequests = requests.filter(time => now - time < RATE_LIMIT_WINDOW)

  if (recentRequests.length >= MAX_REQUESTS) {
    return false // Rate limit exceeded
  }

  // Add current request
  recentRequests.push(now)
  rateLimitStore.set(ipHash, recentRequests)

  return true
}

export async function POST(request: NextRequest) {
  try {
    // 1. Parse request body
    const body = await request.json()

    // 2. Honeypot check (spam protection)
    if (body.website && body.website.length > 0) {
      // Bot filled honeypot field - silently reject
      return NextResponse.json(
        { success: true }, // Return success to not alert bot
        { status: 200 }
      )
    }

    // 3. Get IP and user agent
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0] ||
               request.headers.get('x-real-ip') ||
               'unknown'
    const ipHash = hashIP(ip)
    const userAgent = request.headers.get('user-agent') || 'unknown'

    // 4. Rate limiting
    if (!checkRateLimit(ipHash)) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    // 5. Validate data
    const validatedData = applicationSchema.parse(body)

    // 6. Insert into Supabase
    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from('pilot_applications')
      .insert({
        company_name: validatedData.companyName,
        industry: validatedData.industry,
        location_count: validatedData.locationCount,
        team_size: validatedData.teamSize,
        contact_name: validatedData.contactName,
        contact_email: validatedData.contactEmail,
        contact_role: validatedData.contactRole,
        current_tools: validatedData.currentTools || null,
        data_sources: validatedData.dataSources,
        primary_challenge: validatedData.primaryChallenge,
        timeline: validatedData.timeline,
        source: 'website',
        status: 'new',
        ip_hash: ipHash,
        user_agent: userAgent,
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      return NextResponse.json(
        { error: 'Failed to submit application. Please try again.' },
        { status: 500 }
      )
    }

    // 7. Success response
    return NextResponse.json(
      {
        success: true,
        applicationId: data.id
      },
      { status: 201 }
    )

  } catch (error) {
    console.error('Application submission error:', error)

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        {
          error: 'Invalid form data',
          details: error.issues
        },
        { status: 400 }
      )
    }

    // Generic error
    return NextResponse.json(
      { error: 'An error occurred. Please try again.' },
      { status: 500 }
    )
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({ status: 'ok' })
}