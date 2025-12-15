'use client';

import { useState } from 'react';
import type { Permit } from '@/lib/types/launch';
import {
  Calendar,
  User,
  Building2,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

interface PermitCardProps {
  permit: Permit;
  onStatusChange?: (permitId: string, newStatus: string) => void;
}

export default function PermitCard({ permit, onStatusChange }: PermitCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Status configuration
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'approved':
        return {
          label: 'Approved',
          color: 'bg-green-100 text-green-800 border-green-200',
          icon: CheckCircle2,
          iconColor: 'text-green-600'
        };
      case 'inspection_passed':
        return {
          label: 'Inspection Passed',
          color: 'bg-blue-100 text-blue-800 border-blue-200',
          icon: CheckCircle2,
          iconColor: 'text-blue-600'
        };
      case 'scheduled':
        return {
          label: 'Scheduled',
          color: 'bg-purple-100 text-purple-800 border-purple-200',
          icon: Calendar,
          iconColor: 'text-purple-600'
        };
      case 'application_submitted':
        return {
          label: 'Application Submitted',
          color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
          icon: Clock,
          iconColor: 'text-yellow-600'
        };
      case 'inspection_failed':
        return {
          label: 'Inspection Failed',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      case 'rejected':
        return {
          label: 'Rejected',
          color: 'bg-red-100 text-red-800 border-red-200',
          icon: XCircle,
          iconColor: 'text-red-600'
        };
      case 'not_started':
      default:
        return {
          label: 'Not Started',
          color: 'bg-gray-100 text-gray-800 border-gray-200',
          icon: Clock,
          iconColor: 'text-gray-600'
        };
    }
  };

  // Priority configuration
  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case 'critical':
        return {
          label: 'Critical',
          color: 'bg-red-50 text-red-700 border-red-200',
          dotColor: 'bg-red-500'
        };
      case 'high':
        return {
          label: 'High',
          color: 'bg-orange-50 text-orange-700 border-orange-200',
          dotColor: 'bg-orange-500'
        };
      case 'medium':
        return {
          label: 'Medium',
          color: 'bg-yellow-50 text-yellow-700 border-yellow-200',
          dotColor: 'bg-yellow-500'
        };
      case 'low':
      default:
        return {
          label: 'Low',
          color: 'bg-gray-50 text-gray-700 border-gray-200',
          dotColor: 'bg-gray-500'
        };
    }
  };

  // Type badge color
  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      health: 'bg-green-100 text-green-800',
      fire: 'bg-red-100 text-red-800',
      ada: 'bg-blue-100 text-blue-800',
      license: 'bg-purple-100 text-purple-800',
      zoning: 'bg-yellow-100 text-yellow-800',
      building: 'bg-gray-100 text-gray-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const statusConfig = getStatusConfig(permit.status);
  const priorityConfig = getPriorityConfig(permit.priority);
  const StatusIcon = statusConfig.icon;

  const formatDate = (date?: Date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date?: Date) => {
    if (!date) return null;
    const now = new Date();
    const target = new Date(date);
    const diff = target.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `${Math.abs(days)} days overdue`;
    if (days === 0) return 'Today';
    if (days === 1) return '1 day';
    return `${days} days`;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-all">
      {/* Card Header */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-3">
          {/* Title and Type */}
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-semibold px-2 py-1 rounded uppercase ${getTypeColor(permit.type)}`}>
                {permit.type}
              </span>
              <span className={`flex items-center gap-1 text-xs font-medium px-2 py-1 rounded border ${priorityConfig.color}`}>
                <span className={`w-2 h-2 rounded-full ${priorityConfig.dotColor}`}></span>
                {priorityConfig.label}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-900">{permit.title}</h3>
            {permit.description && (
              <p className="text-sm text-gray-600 mt-1">{permit.description}</p>
            )}
          </div>

          {/* Status Badge */}
          <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${statusConfig.color} ml-4`}>
            <StatusIcon className={`w-4 h-4 ${statusConfig.iconColor}`} />
            <span className="text-sm font-semibold whitespace-nowrap">{statusConfig.label}</span>
          </div>
        </div>

        {/* Key Info Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
          {/* Agency */}
          {permit.agency && (
            <div className="flex items-start gap-2">
              <Building2 className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Agency</div>
                <div className="text-sm font-medium text-gray-900">{permit.agency}</div>
              </div>
            </div>
          )}

          {/* Inspector */}
          {permit.inspectorName && (
            <div className="flex items-start gap-2">
              <User className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Inspector</div>
                <div className="text-sm font-medium text-gray-900">{permit.inspectorName}</div>
              </div>
            </div>
          )}

          {/* Inspection Date */}
          {permit.inspectionDate && (
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-xs text-gray-500">Inspection Date</div>
                <div className="text-sm font-medium text-gray-900">{formatDate(permit.inspectionDate)}</div>
                {getDaysUntil(permit.inspectionDate) && (
                  <div className="text-xs text-gray-600">({getDaysUntil(permit.inspectionDate)})</div>
                )}
              </div>
            </div>
          )}

          {/* Processing Time */}
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <div>
              <div className="text-xs text-gray-500">Est. Processing</div>
              <div className="text-sm font-medium text-gray-900">{permit.estimatedProcessingDays} days</div>
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        {(permit.inspectorNotes?.length || permit.correctiveActions?.length || permit.applicationReference) && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            {isExpanded ? (
              <>
                <ChevronUp className="w-4 h-4" />
                Hide Details
              </>
            ) : (
              <>
                <ChevronDown className="w-4 h-4" />
                Show Details
              </>
            )}
          </button>
        )}
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-gray-200 p-4 bg-gray-50">
          {/* Application Reference */}
          {permit.applicationReference && (
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <FileText className="w-4 h-4 text-gray-600" />
                <h4 className="text-sm font-semibold text-gray-900">Application Reference</h4>
              </div>
              <p className="text-sm text-gray-700 font-mono bg-white px-3 py-2 rounded border border-gray-200">
                {permit.applicationReference}
              </p>
            </div>
          )}

          {/* Inspector Contact */}
          {permit.inspectorContact && (
            <div className="mb-4">
              <div className="text-xs text-gray-500 mb-1">Inspector Contact</div>
              <a
                href={`mailto:${permit.inspectorContact}`}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {permit.inspectorContact}
              </a>
            </div>
          )}

          {/* Inspector Notes */}
          {permit.inspectorNotes && permit.inspectorNotes.length > 0 && (
            <div className="mb-4">
              <h4 className="text-sm font-semibold text-gray-900 mb-2">Inspector Notes</h4>
              <ul className="space-y-2">
                {permit.inspectorNotes.map((note, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 flex-shrink-0"></span>
                    {note}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Corrective Actions */}
          {permit.correctiveActions && permit.correctiveActions.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <AlertTriangle className="w-4 h-4 text-orange-600" />
                <h4 className="text-sm font-semibold text-gray-900">Corrective Actions Required</h4>
              </div>
              <ul className="space-y-2">
                {permit.correctiveActions.map((action, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 bg-orange-50 px-3 py-2 rounded border border-orange-200">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500 mt-1.5 flex-shrink-0"></span>
                    {action}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Dates Summary */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-xs font-semibold text-gray-700 mb-2 uppercase">Timeline</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-xs">
              <div>
                <div className="text-gray-500 mb-1">Created</div>
                <div className="font-medium text-gray-900">{formatDate(permit.createdAt)}</div>
              </div>
              {permit.applicationDeadline && (
                <div>
                  <div className="text-gray-500 mb-1">App Deadline</div>
                  <div className="font-medium text-gray-900">{formatDate(permit.applicationDeadline)}</div>
                </div>
              )}
              {permit.approvalDeadline && (
                <div>
                  <div className="text-gray-500 mb-1">Approval Deadline</div>
                  <div className="font-medium text-gray-900">{formatDate(permit.approvalDeadline)}</div>
                </div>
              )}
              <div>
                <div className="text-gray-500 mb-1">Last Updated</div>
                <div className="font-medium text-gray-900">{formatDate(permit.statusUpdatedAt)}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
