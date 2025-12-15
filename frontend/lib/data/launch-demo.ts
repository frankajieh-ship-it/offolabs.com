// OFFO Launch™ - Demo Data
// Static demo data for MVP testing

import type { Launch, Permit, PermitType } from '../types/launch';

// Helper to create dates relative to today
const daysFromNow = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

const daysAgo = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

// Demo Permits for Restaurant Launch
const restaurantPermits: Permit[] = [
  {
    id: 'permit_001',
    launchId: 'launch_001',
    type: 'health',
    title: 'Health Department Permit',
    description: 'Food service health inspection and certification',
    status: 'inspection_passed',
    statusUpdatedAt: daysAgo(2),
    createdAt: daysAgo(45),
    applicationDeadline: daysAgo(30),
    inspectionDate: daysAgo(5),
    approvalDeadline: daysFromNow(10),
    inspectorName: 'Maria Chen',
    inspectorContact: 'mchen@countyhealth.gov',
    agency: 'County Health Department',
    applicationReference: 'HD-2025-0123',
    inspectorNotes: [
      'Kitchen equipment meets standards',
      'Proper food storage temperatures verified',
      'Handwashing stations compliant'
    ],
    correctiveActions: [],
    priority: 'critical',
    estimatedProcessingDays: 14
  },
  {
    id: 'permit_002',
    launchId: 'launch_001',
    type: 'fire',
    title: 'Fire Safety Inspection',
    description: 'Fire suppression system and emergency exit compliance',
    status: 'scheduled',
    statusUpdatedAt: daysAgo(1),
    createdAt: daysAgo(40),
    inspectionDate: daysFromNow(7),
    agency: 'City Fire Department',
    inspectorName: 'John Rodriguez',
    inspectorContact: 'jrodriguez@cityfire.gov',
    applicationReference: 'FIRE-2025-0456',
    priority: 'critical',
    estimatedProcessingDays: 10
  },
  {
    id: 'permit_003',
    launchId: 'launch_001',
    type: 'license',
    title: 'Business Operating License',
    description: 'General business license for restaurant operations',
    status: 'approved',
    statusUpdatedAt: daysAgo(10),
    createdAt: daysAgo(60),
    approvalDeadline: daysAgo(8),
    agency: 'City Clerk Office',
    applicationReference: 'BUS-2025-7890',
    priority: 'high',
    estimatedProcessingDays: 21
  },
  {
    id: 'permit_004',
    launchId: 'launch_001',
    type: 'ada',
    title: 'ADA Compliance Certification',
    description: 'Americans with Disabilities Act accessibility review',
    status: 'inspection_failed',
    statusUpdatedAt: daysAgo(3),
    createdAt: daysAgo(35),
    inspectionDate: daysAgo(4),
    agency: 'Building & Safety Dept',
    inspectorName: 'Sarah Williams',
    inspectorContact: 'swilliams@citybldg.gov',
    applicationReference: 'ADA-2025-0234',
    correctiveActions: [
      'Install accessible door hardware on restroom entrance',
      'Add tactile signage for restroom doors',
      'Adjust counter height at payment area to 34 inches'
    ],
    inspectorNotes: [
      'Parking spaces compliant',
      'Ramp slope within tolerance',
      'Minor adjustments needed inside'
    ],
    priority: 'high',
    estimatedProcessingDays: 15
  },
  {
    id: 'permit_005',
    launchId: 'launch_001',
    type: 'building',
    title: 'Building Occupancy Permit',
    description: 'Certificate of occupancy for commercial food service',
    status: 'application_submitted',
    statusUpdatedAt: daysAgo(5),
    createdAt: daysAgo(25),
    applicationDeadline: daysAgo(3),
    agency: 'Building & Safety Dept',
    applicationReference: 'COO-2025-1122',
    priority: 'critical',
    estimatedProcessingDays: 20
  },
  {
    id: 'permit_006',
    launchId: 'launch_001',
    type: 'zoning',
    title: 'Zoning Variance Approval',
    description: 'Commercial zoning verification for restaurant use',
    status: 'approved',
    statusUpdatedAt: daysAgo(50),
    createdAt: daysAgo(90),
    approvalDeadline: daysAgo(45),
    agency: 'Planning Department',
    applicationReference: 'ZON-2024-9876',
    priority: 'high',
    estimatedProcessingDays: 30
  }
];

// Demo Launch
export const demoLaunches: Launch[] = [
  {
    id: 'launch_001',
    name: 'Ember & Oak Restaurant',
    location: 'Downtown San Francisco',
    address: '245 Market Street, San Francisco, CA 94105',
    type: 'restaurant',
    targetOpenDate: daysFromNow(45),
    createdAt: daysAgo(90),
    readinessScore: 68,
    permits: restaurantPermits,
    permitsByType: {
      health: restaurantPermits.filter(p => p.type === 'health'),
      fire: restaurantPermits.filter(p => p.type === 'fire'),
      ada: restaurantPermits.filter(p => p.type === 'ada'),
      license: restaurantPermits.filter(p => p.type === 'license'),
      zoning: restaurantPermits.filter(p => p.type === 'zoning'),
      building: restaurantPermits.filter(p => p.type === 'building')
    }
  }
];

// localStorage key
export const LAUNCH_STORAGE_KEY = 'offo_launch_data_v1';

// Get launches from localStorage or return demo data
export function getLaunches(): Launch[] {
  if (typeof window === 'undefined') return demoLaunches;

  const stored = localStorage.getItem(LAUNCH_STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      return parsed.map((launch: any) => ({
        ...launch,
        targetOpenDate: new Date(launch.targetOpenDate),
        createdAt: new Date(launch.createdAt),
        permits: launch.permits.map((permit: any) => ({
          ...permit,
          statusUpdatedAt: new Date(permit.statusUpdatedAt),
          createdAt: new Date(permit.createdAt),
          applicationDeadline: permit.applicationDeadline ? new Date(permit.applicationDeadline) : undefined,
          inspectionDate: permit.inspectionDate ? new Date(permit.inspectionDate) : undefined,
          approvalDeadline: permit.approvalDeadline ? new Date(permit.approvalDeadline) : undefined
        }))
      }));
    } catch (e) {
      console.warn('Failed to parse launch data from localStorage', e);
    }
  }

  return demoLaunches;
}

// Save launches to localStorage
export function saveLaunches(launches: Launch[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LAUNCH_STORAGE_KEY, JSON.stringify(launches));
}

// Get single launch by ID
export function getLaunchById(id: string): Launch | undefined {
  return getLaunches().find(l => l.id === id);
}
