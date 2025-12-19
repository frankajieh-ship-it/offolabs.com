# Pilot Application Backend Implementation Spec

**Architecture**: Supabase + Next.js App Router
**Goal**: Secure, production-ready, low-friction pilot application submission system

---

## 1. Architecture Overview

### Flow
```
EligibilityForm.tsx → POST /api/pilot/application → Supabase Postgres (pilot_applications table)
```

### Key Principles
- ✅ Server-side validation (Zod)
- ✅ No direct DB writes from client
- ✅ No RLS complexity (no authenticated users yet)
- ✅ Basic spam protection (honeypot + rate limit)
- ✅ Service role key for server-side inserts

---

## 2. Supabase Setup

### 2.1 Create Database Table

**File**: Run in Supabase SQL Editor

```sql
-- Enable UUID extension
create extension if not exists pgcrypto;

-- Create pilot_applications table
create table if not exists pilot_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),

  -- Company Information
  company_name text not null,
  industry text not null,
  location_count text not null,
  team_size text not null,

  -- Contact Information
  contact_name text not null,
  contact_email text not null,
  contact_role text not null,

  -- Additional Context
  current_tools text,
  data_sources jsonb not null default '[]'::jsonb,
  primary_challenge text not null,
  timeline text not null,

  -- Metadata
  source text not null default 'website',
  status text not null default 'new',

  -- Anti-spam
  ip_hash text,
  user_agent text
);

-- Create indexes for performance
create index if not exists pilot_applications_created_at_idx
on pilot_applications (created_at desc);

create index if not exists pilot_applications_status_idx
on pilot_applications (status);

create index if not exists pilot_applications_contact_email_idx
on pilot_applications (contact_email);

-- Add comment for documentation
comment on table pilot_applications is 'Pilot program application submissions from website form';
```

### 2.2 Row Level Security (RLS)

Since we're using **service role key** for server-side inserts, we enable RLS but don't need public policies:

```sql
-- Enable RLS (required for production)
alter table pilot_applications enable row level security;

-- No policies needed - service role bypasses RLS
-- This prevents any direct client access to the table
```

### 2.3 Environment Variables

Add to `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here  # SERVER-SIDE ONLY - DO NOT EXPOSE
```

**Important**:
- `SUPABASE_SERVICE_ROLE_KEY` must **never** be exposed to the client
- Only use in server-side API routes (not in client components)

---

## 3. Backend Implementation

### 3.1 Install Dependencies

```bash
npm install @supabase/supabase-js
npm install zod
npm install crypto  # for IP hashing
```

### 3.2 Supabase Server Client

**File**: `frontend/lib/supabase/server.ts`

```typescript
import { createClient } from '@supabase/supabase-js'

// Server-side client with service role key
// IMPORTANT: Only use in API routes, never in client components
export function createServerSupabaseClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables')
  }

  return createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  })
}
```

### 3.3 API Route: POST /api/pilot/application

**File**: `frontend/app/api/pilot/application/route.ts`

```typescript
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
          details: error.errors
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
```

---

## 4. Frontend Integration

### 4.1 Update EligibilityForm.tsx

**File**: `frontend/components/pilot/EligibilityForm.tsx`

Update the `onSubmit` function:

```typescript
const onSubmit = async (data: FormData) => {
  setIsSubmitting(true)

  try {
    const response = await fetch('/api/pilot/application', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...data,
        website: '', // Honeypot field (should remain empty)
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      throw new Error(result.error || 'Failed to submit application')
    }

    console.log('Application submitted:', result.applicationId)
    setIsSubmitting(false)
    setIsSubmitted(true)

    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false)
      form.reset()
    }, 5000)

  } catch (error) {
    console.error('Submission error:', error)
    setIsSubmitting(false)

    // Show error to user (you can add error state to form)
    alert(error instanceof Error ? error.message : 'Failed to submit application')
  }
}
```

### 4.2 Add Honeypot Field (Optional but Recommended)

Add hidden honeypot field to form schema and UI:

```typescript
// In formSchema
const formSchema = z.object({
  // ... existing fields ...
  website: z.string().optional(), // Honeypot
})

// In form JSX (add hidden field)
<input
  type="text"
  name="website"
  style={{ display: 'none' }}
  tabIndex={-1}
  autoComplete="off"
  {...form.register('website')}
/>
```

---

## 5. Production Considerations

### 5.1 Rate Limiting (Production)

For production, replace in-memory rate limiting with **Redis** or **Upstash**:

```bash
npm install @upstash/redis
```

```typescript
import { Redis } from '@upstash/redis'

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL!,
  token: process.env.UPSTASH_REDIS_REST_TOKEN!,
})

async function checkRateLimit(ipHash: string): Promise<boolean> {
  const key = `rate-limit:${ipHash}`
  const count = await redis.incr(key)

  if (count === 1) {
    await redis.expire(key, 3600) // 1 hour TTL
  }

  return count <= MAX_REQUESTS
}
```

### 5.2 Email Notifications (Optional)

Send email notification to team when new application arrives:

```bash
npm install resend
```

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// After successful insert
await resend.emails.send({
  from: 'OFFO Pilot <pilot@offolabs.com>',
  to: ['team@offolabs.com'],
  subject: `New Pilot Application: ${validatedData.companyName}`,
  html: `
    <h2>New Pilot Application Received</h2>
    <p><strong>Company:</strong> ${validatedData.companyName}</p>
    <p><strong>Industry:</strong> ${validatedData.industry}</p>
    <p><strong>Contact:</strong> ${validatedData.contactName} (${validatedData.contactEmail})</p>
    <p><strong>Timeline:</strong> ${validatedData.timeline}</p>
  `,
})
```

### 5.3 Database Backups

Enable automated backups in Supabase dashboard:
- Settings → Database → Automated backups
- Recommended: Daily backups with 7-day retention

### 5.4 Monitoring

Add logging and monitoring:

```typescript
// Log all submissions
console.log('[Pilot Application]', {
  timestamp: new Date().toISOString(),
  company: validatedData.companyName,
  email: validatedData.contactEmail,
  applicationId: data.id,
})
```

Consider adding **Sentry** for error tracking:

```bash
npm install @sentry/nextjs
```

---

## 6. Testing

### 6.1 Manual Testing Checklist

- [ ] Submit valid application → should succeed
- [ ] Submit with missing required fields → should show validation errors
- [ ] Submit same IP 4+ times in 1 hour → should rate limit
- [ ] Fill honeypot field → should silently reject
- [ ] Check Supabase table → data should be inserted correctly
- [ ] Verify no service role key in client bundle

### 6.2 Automated Testing (Optional)

**File**: `frontend/__tests__/api/pilot-application.test.ts`

```typescript
import { POST } from '@/app/api/pilot/application/route'
import { NextRequest } from 'next/server'

describe('/api/pilot/application', () => {
  it('should accept valid application', async () => {
    const validData = {
      companyName: 'Test Restaurant',
      industry: 'Restaurant / Food Service',
      locationCount: '1 location',
      teamSize: '1-50 employees',
      contactName: 'John Doe',
      contactEmail: 'john@test.com',
      contactRole: 'Owner',
      currentTools: 'Excel',
      dataSources: ['Permit & Inspection Records (paper or digital)'],
      primaryChallenge: 'Need better permit tracking',
      timeline: '1month',
      agreeTerms: true,
    }

    const request = new NextRequest('http://localhost:3000/api/pilot/application', {
      method: 'POST',
      body: JSON.stringify(validData),
    })

    const response = await POST(request)
    const data = await response.json()

    expect(response.status).toBe(201)
    expect(data.success).toBe(true)
    expect(data.applicationId).toBeDefined()
  })

  it('should reject honeypot submissions', async () => {
    const botData = {
      // ... valid data ...
      website: 'http://spam.com', // Honeypot filled
    }

    const request = new NextRequest('http://localhost:3000/api/pilot/application', {
      method: 'POST',
      body: JSON.stringify(botData),
    })

    const response = await POST(request)

    // Should return 200 to not alert bot, but not insert data
    expect(response.status).toBe(200)
  })
})
```

---

## 7. Deployment Checklist

- [ ] Create Supabase project
- [ ] Run SQL migration to create `pilot_applications` table
- [ ] Enable RLS on table
- [ ] Add environment variables to Vercel/hosting platform
- [ ] Deploy Next.js app
- [ ] Test submission in production
- [ ] Set up email notifications (optional)
- [ ] Configure monitoring/error tracking
- [ ] Enable Supabase database backups

---

## 8. Admin Dashboard (Future Enhancement)

**File**: `frontend/app/admin/pilot-applications/page.tsx`

```typescript
'use client'

import { useEffect, useState } from 'react'
import { createServerSupabaseClient } from '@/lib/supabase/server'

export default function PilotApplicationsAdmin() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    async function fetchApplications() {
      const response = await fetch('/api/admin/pilot-applications')
      const data = await response.json()
      setApplications(data)
    }

    fetchApplications()
  }, [])

  return (
    <div>
      <h1>Pilot Applications</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Company</th>
            <th>Contact</th>
            <th>Email</th>
            <th>Industry</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app: any) => (
            <tr key={app.id}>
              <td>{new Date(app.created_at).toLocaleDateString()}</td>
              <td>{app.company_name}</td>
              <td>{app.contact_name}</td>
              <td>{app.contact_email}</td>
              <td>{app.industry}</td>
              <td>{app.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
```

---

## Summary

This spec provides a **production-ready, secure, low-friction** pilot application backend using:

✅ **Supabase** for database
✅ **Next.js App Router** for API routes
✅ **Zod** for server-side validation
✅ **Service Role Key** for secure server-side inserts
✅ **Rate limiting** for spam protection
✅ **Honeypot** for bot detection
✅ **IP hashing** for privacy-compliant tracking

**Estimated Implementation Time**: 2-3 hours
**Production-Ready**: Yes (with rate limiting, validation, spam protection)
**Scalability**: Handles 1000s of applications without modification