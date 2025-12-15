'use client';

import { useState, useMemo } from 'react';
import type { Launch, Permit, PermitStatus } from '@/lib/types/launch';
import {
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronRight,
  Filter,
  X
} from 'lucide-react';

interface MobilePermitViewProps {
  launch: Launch;
}

type FilterStatus = PermitStatus | 'all';

export default function MobilePermitView({ launch }: MobilePermitViewProps) {
  const [selectedPermit, setSelectedPermit] = useState<Permit | null>(null);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('all');
  const [showFilter, setShowFilter] = useState(false);

  const filteredPermits = useMemo(() => {
    if (filterStatus === 'all') return launch.permits;
    return launch.permits.filter(p => p.status === filterStatus);
  }, [launch.permits, filterStatus]);

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          color: 'bg-green-100 text-green-800',
          icon: CheckCircle2,
          iconColor: 'text-green-600',
          dotColor: 'bg-green-500'
        };
      case 'inspection_passed':
        return {
          label: 'Inspection Passed',
          color: 'bg-blue-100 text-blue-800',
          icon: CheckCircle2,
          iconColor: 'text-blue-600',
          dotColor: 'bg-blue-500'
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color: 'bg-purple-100 text-purple-800',
          icon: Clock,
          iconColor: 'text-purple-600',
          dotColor: 'bg-purple-500'
        };
      case 'application_submitted':
        return {
          label: 'Submitted',
          color: 'bg-yellow-100 text-yellow-800',
          icon: Clock,
          iconColor: 'text-yellow-600',
          dotColor: 'bg-yellow-500'
        };
      case 'inspection_failed':
        return {
          label: 'Failed',
          color: 'bg-red-100 text-red-800',
          icon: AlertTriangle,
          iconColor: 'text-red-600',
          dotColor: 'bg-red-500'
        };
      default:
        return {
          label: 'Not Started',
          color: 'bg-gray-100 text-gray-800',
          icon: Clock,
          iconColor: 'text-gray-600',
          dotColor: 'bg-gray-500'
        };
    }
  };

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      health: 'bg-green-600',
      fire: 'bg-red-600',
      ada: 'bg-blue-600',
      license: 'bg-purple-600',
      zoning: 'bg-yellow-600',
      building: 'bg-gray-600'
    };
    return colors[type] || 'bg-gray-600';
  };

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  const statusCounts = useMemo(() => {
    const counts = {
      all: launch.permits.length,
      approved: 0,
      inspection_passed: 0,
      scheduled: 0,
      application_submitted: 0,
      inspection_failed: 0,
      not_started: 0,
      rejected: 0
    };

    launch.permits.forEach(permit => {
      counts[permit.status]++;
    });

    return counts;
  }, [launch.permits]);

  if (selectedPermit) {
    const statusConfig = getStatusConfig(selectedPermit.status);
    const StatusIcon = statusConfig.icon;

    return (
      <div className="fixed inset-0 bg-white z-50 overflow-y-auto">
        {/* Mobile Detail Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3">
          <button
            onClick={() => setSelectedPermit(null)}
            className="flex items-center gap-2 text-blue-600 font-medium text-sm mb-2"
          >
            <X className="w-4 h-4" />
            Back to Permits
          </button>
          <div className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${getTypeColor(selectedPermit.type)}`} />
            <h2 className="text-lg font-bold text-gray-900">{selectedPermit.title}</h2>
          </div>
        </div>

        {/* Detail Content */}
        <div className="p-4 space-y-4">
          {/* Status Badge */}
          <div className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg ${statusConfig.color}`}>
            <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
            <span className="text-sm font-semibold">{statusConfig.label}</span>
          </div>

          {/* Description */}
          {selectedPermit.description && (
            <div>
              <h3 className="text-sm font-semibold text-gray-700 mb-1">Description</h3>
              <p className="text-sm text-gray-600">{selectedPermit.description}</p>
            </div>
          )}

          {/* Key Info */}
          <div className="space-y-3">
            {selectedPermit.agency && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Agency</div>
                <div className="text-sm font-medium text-gray-900">{selectedPermit.agency}</div>
              </div>
            )}

            {selectedPermit.inspectorName && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Inspector</div>
                <div className="text-sm font-medium text-gray-900">{selectedPermit.inspectorName}</div>
                {selectedPermit.inspectorContact && (
                  <a
                    href={`mailto:${selectedPermit.inspectorContact}`}
                    className="text-xs text-blue-600"
                  >
                    {selectedPermit.inspectorContact}
                  </a>
                )}
              </div>
            )}

            {selectedPermit.inspectionDate && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Inspection Date</div>
                <div className="text-sm font-medium text-gray-900">
                  {formatDate(selectedPermit.inspectionDate)}
                </div>
              </div>
            )}

            {selectedPermit.applicationReference && (
              <div>
                <div className="text-xs text-gray-500 mb-1">Reference Number</div>
                <div className="text-sm font-mono font-medium text-gray-900">
                  {selectedPermit.applicationReference}
                </div>
              </div>
            )}
          </div>

          {/* Inspector Notes */}
          {selectedPermit.inspectorNotes && selectedPermit.inspectorNotes.length > 0 && (
            <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-900 mb-2">Inspector Notes</h3>
              <ul className="space-y-2">
                {selectedPermit.inspectorNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-blue-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Corrective Actions */}
          {selectedPermit.correctiveActions && selectedPermit.correctiveActions.length > 0 && (
            <div className="bg-orange-50 rounded-lg p-3 border border-orange-200">
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <h3 className="text-sm font-semibold text-orange-900">Corrective Actions</h3>
              </div>
              <ul className="space-y-2">
                {selectedPermit.correctiveActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-orange-800">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Timeline */}
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
            <h3 className="text-xs font-semibold text-gray-700 mb-3 uppercase">Timeline</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Created</span>
                <span className="font-medium text-gray-900">{formatDate(selectedPermit.createdAt)}</span>
              </div>
              {selectedPermit.applicationDeadline && (
                <div className="flex justify-between">
                  <span className="text-gray-600">App Deadline</span>
                  <span className="font-medium text-gray-900">{formatDate(selectedPermit.applicationDeadline)}</span>
                </div>
              )}
              {selectedPermit.approvalDeadline && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Approval Deadline</span>
                  <span className="font-medium text-gray-900">{formatDate(selectedPermit.approvalDeadline)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600">Last Updated</span>
                <span className="font-medium text-gray-900">{formatDate(selectedPermit.statusUpdatedAt)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Filter Bar */}
      <div className="bg-white rounded-lg border border-gray-200 p-3">
        <button
          onClick={() => setShowFilter(!showFilter)}
          className="flex items-center justify-between w-full"
        >
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-600" />
            <span className="text-sm font-medium text-gray-900">
              Filter: {filterStatus === 'all' ? 'All Permits' : getStatusConfig(filterStatus).label}
            </span>
          </div>
          <ChevronRight className={`w-4 h-4 text-gray-400 transition-transform ${showFilter ? 'rotate-90' : ''}`} />
        </button>

        {showFilter && (
          <div className="mt-3 pt-3 border-t border-gray-200 space-y-2">
            <button
              onClick={() => {
                setFilterStatus('all');
                setShowFilter(false);
              }}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                filterStatus === 'all'
                  ? 'bg-blue-50 text-blue-900'
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              All Permits ({statusCounts.all})
            </button>
            {(['approved', 'inspection_passed', 'scheduled', 'application_submitted', 'inspection_failed', 'not_started'] as PermitStatus[]).map(status => {
              const count = statusCounts[status];
              if (count === 0) return null;

              const config = getStatusConfig(status);
              return (
                <button
                  key={status}
                  onClick={() => {
                    setFilterStatus(status);
                    setShowFilter(false);
                  }}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    filterStatus === status
                      ? 'bg-blue-50 text-blue-900'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{config.label}</span>
                    <span className="text-xs text-gray-500">({count})</span>
                  </div>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Permit List */}
      <div className="space-y-3">
        {filteredPermits.length === 0 ? (
          <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
            <Filter className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600">No permits match this filter</p>
          </div>
        ) : (
          filteredPermits.map(permit => {
            const statusConfig = getStatusConfig(permit.status);
            const StatusIcon = statusConfig.icon;

            return (
              <button
                key={permit.id}
                onClick={() => setSelectedPermit(permit)}
                className="w-full bg-white rounded-lg border border-gray-200 p-4 text-left active:bg-gray-50 transition-colors"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2 flex-1">
                    <div className={`w-3 h-3 rounded-full ${getTypeColor(permit.type)}`} />
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{permit.title}</h3>
                  </div>
                  <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
                </div>

                <div className="flex items-center gap-2 mb-2">
                  <div className={`inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold ${statusConfig.color}`}>
                    <span className={`w-1.5 h-1.5 rounded-full ${statusConfig.dotColor}`} />
                    {statusConfig.label}
                  </div>
                  {permit.priority === 'critical' && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 rounded text-xs font-semibold bg-red-100 text-red-800">
                      Critical
                    </span>
                  )}
                </div>

                {permit.agency && (
                  <p className="text-xs text-gray-600">{permit.agency}</p>
                )}

                {permit.inspectionDate && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="flex items-center gap-2 text-xs text-gray-600">
                      <Clock className="w-3 h-3" />
                      Inspection: {formatDate(permit.inspectionDate)}
                    </div>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
}
