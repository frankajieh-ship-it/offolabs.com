import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase/server'

// GET all pilot applications
export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()

    // Get query parameters for filtering
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const industry = searchParams.get('industry')
    const search = searchParams.get('search')

    // Build query
    let query = supabase
      .from('pilot_applications')
      .select('*')
      .order('created_at', { ascending: false })

    // Apply filters
    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    if (industry && industry !== 'all') {
      query = query.eq('industry', industry)
    }

    if (search) {
      query = query.or(`company_name.ilike.%${search}%,contact_name.ilike.%${search}%,contact_email.ilike.%${search}%`)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching applications:', error)
      return NextResponse.json(
        { error: 'Failed to fetch applications' },
        { status: 500 }
      )
    }

    return NextResponse.json({ applications: data }, { status: 200 })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}

// PATCH to update application status
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, status } = body

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing id or status' },
        { status: 400 }
      )
    }

    // Validate status
    const validStatuses = ['new', 'reviewing', 'accepted', 'rejected', 'on-hold']
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()

    const { data, error } = await supabase
      .from('pilot_applications')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) {
      console.error('Error updating application:', error)
      return NextResponse.json(
        { error: 'Failed to update application' },
        { status: 500 }
      )
    }

    return NextResponse.json({ application: data }, { status: 200 })

  } catch (error) {
    console.error('Admin API error:', error)
    return NextResponse.json(
      { error: 'An error occurred' },
      { status: 500 }
    )
  }
}
