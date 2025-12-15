import { NextRequest, NextResponse } from 'next/server';
import { getLaunchById, saveLaunches, getLaunches } from '@/lib/data/launch-demo';
import type { PermitStatus } from '@/lib/types/launch';

/**
 * Valid status transitions for permit workflow
 * Prevents invalid state changes
 */
const VALID_STATUS_TRANSITIONS: Record<PermitStatus, PermitStatus[]> = {
  not_started: ['application_submitted'],
  application_submitted: ['scheduled', 'rejected'],
  scheduled: ['inspection_passed', 'inspection_failed', 'not_started'],
  inspection_passed: ['approved', 'scheduled'],
  inspection_failed: ['scheduled', 'rejected'],
  approved: [], // Terminal state - no transitions allowed
  rejected: ['not_started'] // Allow restart
};

/**
 * Validates if a status transition is allowed
 */
function isValidTransition(
  currentStatus: PermitStatus,
  newStatus: PermitStatus
): boolean {
  const allowedTransitions = VALID_STATUS_TRANSITIONS[currentStatus];
  return allowedTransitions.includes(newStatus);
}

/**
 * GET /api/launch/[id]/permits/[permitId]
 * Fetches a single permit by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string; permitId: string } }
) {
  try {
    const launch = getLaunchById(params.id);

    if (!launch) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const permit = launch.permits.find(p => p.id === params.permitId);

    if (!permit) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ permit });
  } catch (error) {
    console.error('Error fetching permit:', error);
    return NextResponse.json(
      { error: 'Failed to fetch permit' },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/launch/[id]/permits/[permitId]
 * Updates a permit with validation
 */
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string; permitId: string } }
) {
  try {
    const launches = getLaunches();
    const launch = launches.find(l => l.id === params.id);

    if (!launch) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const permitIndex = launch.permits.findIndex(p => p.id === params.permitId);

    if (permitIndex === -1) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const currentPermit = launch.permits[permitIndex];

    // Validate status transition if status is being updated
    if (body.status && body.status !== currentPermit.status) {
      if (!isValidTransition(currentPermit.status, body.status)) {
        return NextResponse.json(
          {
            error: 'Invalid status transition',
            detail: `Cannot transition from '${currentPermit.status}' to '${body.status}'`,
            allowedTransitions: VALID_STATUS_TRANSITIONS[currentPermit.status]
          },
          { status: 400 }
        );
      }
    }

    // Build updated permit
    const updatedPermit = {
      ...currentPermit,
      ...body,
      statusUpdatedAt: body.status ? new Date() : currentPermit.statusUpdatedAt,
      // Convert date strings to Date objects if provided
      applicationDeadline: body.applicationDeadline
        ? new Date(body.applicationDeadline)
        : currentPermit.applicationDeadline,
      inspectionDate: body.inspectionDate
        ? new Date(body.inspectionDate)
        : currentPermit.inspectionDate,
      approvalDeadline: body.approvalDeadline
        ? new Date(body.approvalDeadline)
        : currentPermit.approvalDeadline
    };

    // Update permit in launch
    launch.permits[permitIndex] = updatedPermit;

    // Recalculate permitsByType
    launch.permitsByType = {
      health: launch.permits.filter(p => p.type === 'health'),
      fire: launch.permits.filter(p => p.type === 'fire'),
      ada: launch.permits.filter(p => p.type === 'ada'),
      license: launch.permits.filter(p => p.type === 'license'),
      zoning: launch.permits.filter(p => p.type === 'zoning'),
      building: launch.permits.filter(p => p.type === 'building')
    };

    // Recalculate readiness score
    const approvedCount = launch.permits.filter(p => p.status === 'approved').length;
    const totalCount = launch.permits.length;
    const criticalApproved = launch.permits.filter(
      p => p.priority === 'critical' && p.status === 'approved'
    ).length;
    const criticalTotal = launch.permits.filter(p => p.priority === 'critical').length;

    // Basic readiness score calculation
    const baseScore = totalCount > 0 ? (approvedCount / totalCount) * 100 : 0;
    const criticalBonus = criticalTotal > 0
      ? (criticalApproved / criticalTotal) * 20
      : 20;

    launch.readinessScore = Math.min(100, Math.round(baseScore * 0.8 + criticalBonus));

    // Save to localStorage
    saveLaunches(launches);

    return NextResponse.json({
      permit: updatedPermit,
      launch: {
        id: launch.id,
        readinessScore: launch.readinessScore
      }
    });
  } catch (error) {
    console.error('Error updating permit:', error);
    return NextResponse.json(
      { error: 'Failed to update permit' },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/launch/[id]/permits/[permitId]
 * Deletes a permit
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string; permitId: string } }
) {
  try {
    const launches = getLaunches();
    const launch = launches.find(l => l.id === params.id);

    if (!launch) {
      return NextResponse.json(
        { error: 'Launch not found' },
        { status: 404 }
      );
    }

    const permitIndex = launch.permits.findIndex(p => p.id === params.permitId);

    if (permitIndex === -1) {
      return NextResponse.json(
        { error: 'Permit not found' },
        { status: 404 }
      );
    }

    // Remove permit
    const deletedPermit = launch.permits[permitIndex];
    launch.permits.splice(permitIndex, 1);

    // Recalculate permitsByType
    launch.permitsByType = {
      health: launch.permits.filter(p => p.type === 'health'),
      fire: launch.permits.filter(p => p.type === 'fire'),
      ada: launch.permits.filter(p => p.type === 'ada'),
      license: launch.permits.filter(p => p.type === 'license'),
      zoning: launch.permits.filter(p => p.type === 'zoning'),
      building: launch.permits.filter(p => p.type === 'building')
    };

    // Recalculate readiness score
    const approvedCount = launch.permits.filter(p => p.status === 'approved').length;
    const totalCount = launch.permits.length;
    launch.readinessScore = totalCount > 0
      ? Math.round((approvedCount / totalCount) * 100)
      : 0;

    // Save to localStorage
    saveLaunches(launches);

    return NextResponse.json({
      success: true,
      deletedPermit,
      launch: {
        id: launch.id,
        readinessScore: launch.readinessScore,
        permitCount: launch.permits.length
      }
    });
  } catch (error) {
    console.error('Error deleting permit:', error);
    return NextResponse.json(
      { error: 'Failed to delete permit' },
      { status: 500 }
    );
  }
}
