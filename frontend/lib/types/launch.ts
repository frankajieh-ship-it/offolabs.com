// OFFO Launch™ - Type Definitions
// Permit & Inspection Tracker Data Model

export type PermitType = 'health' | 'fire' | 'ada' | 'license' | 'zoning' | 'building';

export type PermitStatus =
  | 'not_started'
  | 'application_submitted'
  | 'scheduled'
  | 'inspection_passed'
  | 'inspection_failed'
  | 'approved'
  | 'rejected';

export type PermitPriority = 'low' | 'medium' | 'high' | 'critical';

export interface EvidenceFile {
  id: string;
  name: string;
  url: string;
  uploadedAt: Date;
}

export interface Permit {
  id: string;
  launchId: string;
  type: PermitType;
  title: string;
  description?: string;

  // Status Tracking
  status: PermitStatus;
  statusUpdatedAt: Date;

  // Dates
  createdAt: Date;
  applicationDeadline?: Date;
  inspectionDate?: Date;
  approvalDeadline?: Date;

  // Entities
  inspectorName?: string;
  inspectorContact?: string;
  agency?: string; // e.g., "CA Health Dept"

  // Evidence
  applicationReference?: string;
  inspectorNotes?: string[];
  correctiveActions?: string[];
  evidenceFiles?: EvidenceFile[];

  // Metadata
  priority: PermitPriority;
  estimatedProcessingDays: number;
}

export type LaunchType = 'retail' | 'restaurant' | 'medical' | 'fitness';

export interface Launch {
  id: string;
  name: string;
  location: string;
  address: string;
  type: LaunchType;
  targetOpenDate: Date;
  createdAt: Date;

  // Readiness Score (simple MVP version)
  readinessScore: number; // 0-100

  // Permits
  permits: Permit[];
  permitsByType: Record<PermitType, Permit[]>;
}

// Utility type for permit counts by status
export interface PermitStatusCounts {
  not_started: number;
  application_submitted: number;
  scheduled: number;
  inspection_passed: number;
  inspection_failed: number;
  approved: number;
  rejected: number;
  total: number;
}

// Utility type for readiness calculation
export interface ReadinessBreakdown {
  score: number;
  permitsApproved: number;
  permitsTotal: number;
  criticalPermitsPending: number;
  daysUntilTarget: number;
  onTrack: boolean;
}
