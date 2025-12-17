// server/src/services/scheduler.js
import { syncAllActivePermits } from './integrationService.js';
import Inspection from '../models/Inspection.js';
import Permit from '../models/Permit.js';

/**
 * Schedule all background tasks
 */
export function scheduleTasks() {
  console.log('⏰ Background tasks scheduler initialized');

  // Sync permits with government systems every 6 hours
  const PERMIT_SYNC_INTERVAL = 6 * 60 * 60 * 1000; // 6 hours
  setInterval(async () => {
    console.log('📋 Starting scheduled permit sync...');
    try {
      const result = await syncAllActivePermits();
      console.log(`✅ Permit sync completed:`, result);
    } catch (error) {
      console.error('❌ Permit sync failed:', error.message);
    }
  }, PERMIT_SYNC_INTERVAL);

  // Check for upcoming inspections every hour
  const INSPECTION_CHECK_INTERVAL = 60 * 60 * 1000; // 1 hour
  setInterval(async () => {
    console.log('🔍 Checking for upcoming inspections...');
    try {
      await checkUpcomingInspections();
    } catch (error) {
      console.error('❌ Inspection check failed:', error.message);
    }
  }, INSPECTION_CHECK_INTERVAL);

  // Check for expiring permits daily
  const EXPIRY_CHECK_INTERVAL = 24 * 60 * 60 * 1000; // 24 hours
  setInterval(async () => {
    console.log('📅 Checking for expiring permits...');
    try {
      await checkExpiringPermits();
    } catch (error) {
      console.error('❌ Expiry check failed:', error.message);
    }
  }, EXPIRY_CHECK_INTERVAL);

  console.log('✅ All scheduled tasks configured:');
  console.log('   - Permit sync: Every 6 hours');
  console.log('   - Inspection alerts: Every hour');
  console.log('   - Expiry checks: Daily');
}

/**
 * Check for upcoming inspections (within 24-48 hours)
 * Send notifications to users
 */
async function checkUpcomingInspections() {
  const now = new Date();
  const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
  const dayAfterTomorrow = new Date(now.getTime() + 48 * 60 * 60 * 1000);

  const upcomingInspections = await Inspection.find({
    scheduledDate: {
      $gte: tomorrow,
      $lte: dayAfterTomorrow
    },
    status: 'scheduled'
  })
    .populate('permit')
    .populate('attendees.user');

  console.log(`Found ${upcomingInspections.length} upcoming inspections`);

  // In production, this would send notifications via email/SMS
  // For now, just log them
  upcomingInspections.forEach(inspection => {
    console.log(`  - Inspection for ${inspection.permit.name} scheduled for ${inspection.scheduledDate}`);
  });

  return upcomingInspections.length;
}

/**
 * Check for permits expiring within 30 days
 * Send renewal reminders
 */
async function checkExpiringPermits() {
  const now = new Date();
  const thirtyDaysFromNow = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

  const expiringPermits = await Permit.find({
    'timeline.expiryDate': {
      $gte: now,
      $lte: thirtyDaysFromNow
    },
    status: { $in: ['approved', 'renewal_required'] }
  }).populate('project');

  console.log(`Found ${expiringPermits.length} permits expiring within 30 days`);

  // Mark permits as requiring renewal
  for (const permit of expiringPermits) {
    if (permit.status !== 'renewal_required') {
      permit.status = 'renewal_required';
      await permit.save();
      console.log(`  - Marked ${permit.name} as requiring renewal (expires ${permit.timeline.expiryDate})`);
    }
  }

  return expiringPermits.length;
}

/**
 * Run initial checks on startup
 */
export async function runInitialChecks() {
  console.log('🚀 Running initial background checks...');

  try {
    await checkUpcomingInspections();
    await checkExpiringPermits();
    console.log('✅ Initial checks completed');
  } catch (error) {
    console.error('❌ Initial checks failed:', error.message);
  }
}
