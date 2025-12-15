import { NextRequest, NextResponse } from 'next/server';
import { getLaunchById } from '@/lib/data/launch-demo';

/**
 * GET /api/launch/[id]/permits
 * Fetches all permits for a specific launch
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const launch = getLaunchById(params.id);

    if (!launch) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    // Return permits with metadata
    return NextResponse.json({
      permits: launch.permits,
      metadata: {
        total: launch.permits.length,
        approved: launch.permits.filter(p => p.status === 'approved').length,
        pending: launch.permits.filter(p =>
          p.status !== 'approved' && p.status !== 'rejected'
        ).length,
        critical: launch.permits.filter(p =>
          p.priority === 'critical' && p.status !== 'approved'
        ).length
      }
    });
  } catch (error) {
    console.error('Error fetching permits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permits' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/launch/[id]/permits
 * Creates a new permit for a launch
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const launch = getLaunchById(params.id);

    if (!launch) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = ['type', 'title', 'priority', 'estimatedProcessingDays'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    // Create new permit
    const newPermit = {
      id: `permit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      launchId: params.id,
      type: body.type,
      title: body.title,
      description: body.description || undefined,
      status: 'not_started',
      statusUpdatedAt: new Date(),
      createdAt: new Date(),
      applicationDeadline: body.applicationDeadline ? new Date(body.applicationDeadline) : undefined,
      inspectionDate: body.inspectionDate ? new Date(body.inspectionDate) : undefined,
      approvalDeadline: body.approvalDeadline ? new Date(body.approvalDeadline) : undefined,
      agency: body.agency || undefined,
      inspectorName: body.inspectorName || undefined,
      inspectorContact: body.inspectorContact || undefined,
      applicationReference: body.applicationReference || undefined,
      priority: body.priority,
      estimatedProcessingDays: body.estimatedProcessingDays,
      inspectorNotes: [],
      correctiveActions: []
    };

    // In production, save to database
    // For now, we'll return the created permit
    // The client will handle updating localStorage

    return NextResponse.json(
      { permit: newPermit },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating permit:', error);
    return NextResponse.json(
      { error: 'Failed to create permit' },
      { status: 500 }
    );
  }
}
