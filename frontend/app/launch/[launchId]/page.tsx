'use client';

import { useState, useEffect, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { getLaunchById } from '@/lib/data/launch-demo';
import type { Launch, Permit, PermitStatus } from '@/lib/types/launch';
import PermitCard from '@/components/launch/PermitCard';
import TimelineView from '@/components/launch/TimelineView';
import MobilePermitView from '@/components/launch/MobilePermitView';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import {
  ArrowLeft,
  Calendar,
  MapPin,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  Filter,
  LayoutGrid,
  ListTree
} from 'lucide-react';

type ViewMode = 'permits' | 'timeline';
type FilterStatus = PermitStatus | 'all';

export default function LaunchDetailPage() {
  const params = useParams();
  const router = useRouter();
  const launchId = params.launchId as string;

  const isMobile = useMediaQuery('(max-width: 768px)');
  const [launch, setLaunch] = useState<Launch | null>(null);
  const [mounted, setMounted] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('permits');
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');

  useEffect(() => {
    setMounted(true);
    const launchData = getLaunchById(launchId);
    if (!launchData) {
      router.push('/launch');
      return;
    }
    setLaunch(launchData);
  }, [launchId, router]);

  const filteredPermits = useMemo(() => {
    if (!launch) return [];
    if (filterStatus === 'all') return launch.permits;
    return launch.permits.filter(p => p.status === filterStatus);
  }, [launch, filterStatus]);

  if (!mounted || !launch) {
    return null; // Prevent hydration mismatch
  }

  const getDaysUntilOpen = (targetDate: Date) => {
    const now = new Date();
    const diff = targetDate.getTime() - now.getTime();
    return Math.ceil(diff / (1000 * 60 * 60 * 24));
  };

  const getReadinessColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-100 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100 border-yellow-200';
    return 'text-red-600 bg-red-100 border-red-200';
  };

  const getReadinessIcon = (score: number) => {
    if (score >= 80) return <CheckCircle className="w-6 h-6" />;
    if (score >= 60) return <TrendingUp className="w-6 h-6" />;
    return <AlertCircle className="w-6 h-6" />;
  };

  const getPermitStatusCounts = () => {
    const counts = {
      approved: 0,
      inspection_passed: 0,
      scheduled: 0,
      application_submitted: 0,
      inspection_failed: 0,
      rejected: 0,
      not_started: 0
    };

    launch.permits.forEach(permit => {
      counts[permit.status]++;
    });

    return counts;
  };

  const statusCounts = getPermitStatusCounts();
  const daysUntil = getDaysUntilOpen(launch.targetOpenDate);
  const criticalPending = launch.permits.filter(
    p => p.priority === 'critical' && p.status !== 'approved'
  ).length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Back Button */}
          <Link
            href="/launch"
            className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Launches
          </Link>

          {/* Launch Title & Info */}
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                {launch.name}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {launch.location}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  Target: {launch.targetOpenDate.toLocaleDateString('en-US', {
                    weekday: 'short',
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                </div>
                <div className="px-2 py-1 bg-gray-100 rounded text-xs font-semibold uppercase text-gray-700">
                  {launch.type}
                </div>
              </div>
            </div>

            {/* Readiness Score */}
            <div className={`flex items-center gap-3 px-5 py-3 rounded-lg border ${getReadinessColor(launch.readinessScore)}`}>
              {getReadinessIcon(launch.readinessScore)}
              <div className="text-right">
                <div className="text-3xl font-bold">{launch.readinessScore}</div>
                <div className="text-xs font-medium uppercase">Readiness</div>
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="w-4 h-4 text-gray-500" />
                <div className="text-sm text-gray-600">Days Until Open</div>
              </div>
              <div className={`text-2xl font-bold ${daysUntil < 30 ? 'text-orange-600' : 'text-gray-900'}`}>
                {daysUntil}
              </div>
            </div>

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <div className="text-sm text-green-700">Approved</div>
              </div>
              <div className="text-2xl font-bold text-green-900">
                {statusCounts.approved} / {launch.permits.length}
              </div>
            </div>

            <div className="bg-red-50 rounded-lg p-4 border border-red-200">
              <div className="flex items-center gap-2 mb-1">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <div className="text-sm text-red-700">Critical Pending</div>
              </div>
              <div className="text-2xl font-bold text-red-900">
                {criticalPending}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="w-4 h-4 text-blue-600" />
                <div className="text-sm text-blue-700">In Progress</div>
              </div>
              <div className="text-2xl font-bold text-blue-900">
                {statusCounts.scheduled + statusCounts.application_submitted + statusCounts.inspection_passed}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* View Mode Toggle & Filter */}
        <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode('permits')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  viewMode === 'permits'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <LayoutGrid className="w-4 h-4" />
                Permits
              </button>
              <button
                onClick={() => setViewMode('timeline')}
                className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm transition-colors ${
                  viewMode === 'timeline'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ListTree className="w-4 h-4" />
                Timeline
              </button>
            </div>

            {/* Filter Dropdown (only for permits view) */}
            {viewMode === 'permits' && (
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-gray-500" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value as FilterStatus)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Permits ({launch.permits.length})</option>
                  <option value="approved">Approved ({statusCounts.approved})</option>
                  <option value="inspection_passed">Inspection Passed ({statusCounts.inspection_passed})</option>
                  <option value="scheduled">Scheduled ({statusCounts.scheduled})</option>
                  <option value="application_submitted">Application Submitted ({statusCounts.application_submitted})</option>
                  <option value="inspection_failed">Inspection Failed ({statusCounts.inspection_failed})</option>
                  <option value="not_started">Not Started ({statusCounts.not_started})</option>
                </select>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        {viewMode === 'permits' ? (
          isMobile ? (
            <MobilePermitView launch={launch} />
          ) : (
            <div className="space-y-4">
              {filteredPermits.length === 0 ? (
                <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                  <Filter className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No Permits Match Filter
                  </h3>
                  <p className="text-gray-600">
                    Try selecting a different status filter
                  </p>
                </div>
              ) : (
                filteredPermits.map(permit => (
                  <PermitCard key={permit.id} permit={permit} />
                ))
              )}
            </div>
          )
        ) : (
          <TimelineView launch={launch} />
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 pt-6 border-t border-gray-300 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8">
          <div className="flex items-center gap-3">
            <p className="text-xs text-gray-600">
              © 2025 <span className="font-semibold">OFFO LAB</span>
            </p>
          </div>
          <div className="text-center sm:text-right">
            <p className="text-sm text-gray-600 font-medium">
              Powered by <span className="text-blue-600 font-bold">OFFO LAB</span> Launch Intelligence · v1.0
            </p>
            <p className="text-xs text-red-600 font-semibold mt-1">
              Confidential
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
