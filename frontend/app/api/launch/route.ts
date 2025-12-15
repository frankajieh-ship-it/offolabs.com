import { NextRequest, NextResponse } from 'next/server';
import { getLaunches, saveLaunches } from '@/lib/data/launch-demo';
import type { Launch, LaunchType } from '@/lib/types/launch';

/**
 * GET /api/launch
 * Fetches all launches with optional filtering
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') as LaunchType | null;
    const status = searchParams.get('status'); // 'active', 'completed', 'overdue'

    let launches = getLaunches();

    // Filter by type
    if (type) {
      launches = launches.filter(l => l.type === type);
    }

    // Filter by status
    if (status) {
      const now = new Date();
      launches = launches.filter(launch => {
        const isCompleted = launch.permits.every(p => p.status === 'approved');
        const isOverdue = launch.targetOpenDate < now && !isCompleted;

        switch (status) {
          case 'completed':
            return isCompleted;
          case 'overdue':
            return isOverdue;
          case 'active':
            return !isCompleted && !isOverdue;
          default:
            return true;
        }
      });
    }

    // Calculate summary stats
    const stats = {
      total: launches.length,
      active: launches.filter(l =>
        l.permits.some(p => p.status !== 'approved')
      ).length,
      completed: launches.filter(l =>
        l.permits.every(p => p.status === 'approved')
      ).length,
      averageReadiness: launches.length > 0
        ? Math.round(
            launches.reduce((sum, l) => sum + l.readinessScore, 0) / launches.length
          )
        : 0
    };

    return NextResponse.json({
      launches,
      stats
    });
  } catch (error) {
    console.error('Error fetching launches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launches' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/launch
 * Creates a new launch
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate required fields
    const requiredFields = ['name', 'location', 'address', 'type', 'targetOpenDate'];
    for (const field of requiredFields) {
      if (!body[field]) {
        return NextResponse.json(
          { error: `Missing required field: ${field}` },
          { status: 400 }
        );
      }
    }

    const launches = getLaunches();
    const newLaunchId = `launch_${Date.now()}`;
    const now = new Date();

    // Create permits from body if provided
    const permits = (body.permits || []).map((p: any) => ({
      id: `permit_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      launchId: newLaunchId,
      type: p.type,
      title: p.title,
      description: p.description || undefined,
      status: 'not_started',
      statusUpdatedAt: now,
      createdAt: now,
      applicationDeadline: p.applicationDeadline ? new Date(p.applicationDeadline) : undefined,
      inspectionDate: p.inspectionDate ? new Date(p.inspectionDate) : undefined,
      approvalDeadline: p.approvalDeadline ? new Date(p.approvalDeadline) : undefined,
      agency: p.agency || undefined,
      inspectorName: p.inspectorName || undefined,
      inspectorContact: p.inspectorContact || undefined,
      applicationReference: p.applicationReference || undefined,
      priority: p.priority || 'medium',
      estimatedProcessingDays: p.estimatedProcessingDays || 14,
      inspectorNotes: [],
      correctiveActions: []
    }));

    // Group permits by type
    const permitsByType = {
      health: permits.filter((p: any) => p.type === 'health'),
      fire: permits.filter((p: any) => p.type === 'fire'),
      ada: permits.filter((p: any) => p.type === 'ada'),
      license: permits.filter((p: any) => p.type === 'license'),
      zoning: permits.filter((p: any) => p.type === 'zoning'),
      building: permits.filter((p: any) => p.type === 'building')
    };

    // Create new launch
    const newLaunch: Launch = {
      id: newLaunchId,
      name: body.name,
      location: body.location,
      address: body.address,
      type: body.type,
      targetOpenDate: new Date(body.targetOpenDate),
      createdAt: now,
      readinessScore: 0, // New launch starts at 0
      permits,
      permitsByType
    };

    // Save to storage
    saveLaunches([...launches, newLaunch]);

    return NextResponse.json(
      { launch: newLaunch },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating launch:', error);
    return NextResponse.json(
      { error: 'Failed to create launch' },
      { status: 500 }
    );
  }
}
