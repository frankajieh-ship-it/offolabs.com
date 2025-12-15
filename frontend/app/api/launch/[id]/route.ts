import { NextRequest, NextResponse } from 'next/server';
import { getLaunchById, getLaunches, saveLaunches } from '@/lib/data/launch-demo';

/**
 * GET /api/launch/[id]
 * Fetches a single launch by ID with full details
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

    // Calculate additional metadata
    const now = new Date();
    const daysUntilOpen = Math.ceil(
      (launch.targetOpenDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24)
    );

    const permitStats = {
      total: launch.permits.length,
      approved: launch.permits.filter(p => p.status === 'approved').length,
      pending: launch.permits.filter(p =>
        p.status !== 'approved' && p.status !== 'rejected'
      ).length,
      critical: launch.permits.filter(p =>
        p.priority === 'critical' && p.status !== 'approved'
      ).length,
      overdue: launch.permits.filter(p => {
        if (p.applicationDeadline && p.status === 'not_started') {
          return p.applicationDeadline < now;
        }
        if (p.inspectionDate && p.status === 'scheduled') {
          return p.inspectionDate < now;
        }
        return false;
      }).length
    };

    return NextResponse.json({
      launch,
      metadata: {
        daysUntilOpen,
        isOverdue: daysUntilOpen < 0,
        permitStats
      }
    });
  } catch (error) {
    console.error('Error fetching launch:', error);
    return NextResponse.json(
      { error: 'Failed to fetch launch' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/launch/[id]
 * Updates launch details
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const launches = getLaunches();
    const launchIndex = launches.findIndex(l => l.id === params.id);

    if (launchIndex === -1) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const currentLaunch = launches[launchIndex];

    // Update launch with new data
    const updatedLaunch = {
      ...currentLaunch,
      name: body.name ?? currentLaunch.name,
      location: body.location ?? currentLaunch.location,
      address: body.address ?? currentLaunch.address,
      type: body.type ?? currentLaunch.type,
      targetOpenDate: body.targetOpenDate
        ? new Date(body.targetOpenDate)
        : currentLaunch.targetOpenDate
    };

    launches[launchIndex] = updatedLaunch;
    saveLaunches(launches);

    return NextResponse.json({ launch: updatedLaunch });
  } catch (error) {
    console.error('Error updating launch:', error);
    return NextResponse.json(
      { error: 'Failed to update launch' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/launch/[id]
 * Deletes a launch and all associated permits
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const launches = getLaunches();
    const launchIndex = launches.findIndex(l => l.id === params.id);

    if (launchIndex === -1) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const deletedLaunch = launches[launchIndex];
    launches.splice(launchIndex, 1);
    saveLaunches(launches);

    return NextResponse.json({
      success: true,
      deletedLaunch: {
        id: deletedLaunch.id,
        name: deletedLaunch.name,
        permitCount: deletedLaunch.permits.length
      }
    });
  } catch (error) {
    console.error('Error deleting launch:', error);
    return NextResponse.json(
      { error: 'Failed to delete launch' },
      { status: 500 }
    );
  }
}
