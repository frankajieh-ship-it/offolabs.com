'use client';

import { useMemo } from 'react';
import type { Launch, Permit } from '@/lib/types/launch';
import { Calendar, CheckCircle2, Clock, AlertTriangle, Flag } from 'lucide-react';

interface TimelineViewProps {
  launch: Launch;
}

interface TimelineEvent {
  id: string;
  date: Date;
  title: string;
  type: 'target' | 'deadline' | 'inspection' | 'approval' | 'milestone';
  status: 'completed' | 'upcoming' | 'overdue';
  permitId?: string;
  permitTitle?: string;
  permitType?: string;
  description?: string;
}

export default function TimelineView({ launch }: TimelineViewProps) {
  const timelineEvents = useMemo(() => {
    const events: TimelineEvent[] = [];
    const today = new Date();

    // Add target open date
    events.push({
      id: 'target_open',
      date: launch.targetOpenDate,
      title: 'Target Opening Date',
      type: 'target',
      status: launch.targetOpenDate > today ? 'upcoming' : 'overdue',
      description: 'Planned launch date for ' + launch.name
    });

    // Add permit events
    launch.permits.forEach(permit => {
      // Application deadline
      if (permit.applicationDeadline) {
        events.push({
          id: `${permit.id}_app_deadline`,
          date: permit.applicationDeadline,
          title: 'Application Deadline',
          type: 'deadline',
          status: permit.status === 'application_submitted' || permit.status === 'approved'
            ? 'completed'
            : permit.applicationDeadline > today
              ? 'upcoming'
              : 'overdue',
          permitId: permit.id,
          permitTitle: permit.title,
          permitType: permit.type,
          description: `Submit ${permit.title} application`
        });
      }

      // Inspection date
      if (permit.inspectionDate) {
        events.push({
          id: `${permit.id}_inspection`,
          date: permit.inspectionDate,
          title: 'Inspection Scheduled',
          type: 'inspection',
          status: permit.status === 'inspection_passed' || permit.status === 'approved'
            ? 'completed'
            : permit.inspectionDate > today
              ? 'upcoming'
              : permit.status === 'inspection_failed'
                ? 'overdue'
                : 'upcoming',
          permitId: permit.id,
          permitTitle: permit.title,
          permitType: permit.type,
          description: `${permit.title} inspection with ${permit.inspectorName || 'inspector'}`
        });
      }

      // Approval deadline
      if (permit.approvalDeadline) {
        events.push({
          id: `${permit.id}_approval`,
          date: permit.approvalDeadline,
          title: 'Approval Expected',
          type: 'approval',
          status: permit.status === 'approved'
            ? 'completed'
            : permit.approvalDeadline > today
              ? 'upcoming'
              : 'overdue',
          permitId: permit.id,
          permitTitle: permit.title,
          permitType: permit.type,
          description: `Expected approval for ${permit.title}`
        });
      }
    });

    // Sort by date
    return events.sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [launch]);

  const getEventIcon = (type: string, status: string) => {
    if (status === 'completed') {
      return <CheckCircle2 className="w-5 h-5 text-green-600" />;
    }

    switch (type) {
      case 'target':
        return <Flag className="w-5 h-5 text-blue-600" />;
      case 'inspection':
        return <Calendar className="w-5 h-5 text-purple-600" />;
      case 'deadline':
        return status === 'overdue'
          ? <AlertTriangle className="w-5 h-5 text-red-600" />
          : <Clock className="w-5 h-5 text-orange-600" />;
      case 'approval':
        return <CheckCircle2 className="w-5 h-5 text-green-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getEventColor = (type: string, status: string) => {
    if (status === 'completed') {
      return 'border-green-200 bg-green-50';
    }
    if (status === 'overdue') {
      return 'border-red-200 bg-red-50';
    }

    switch (type) {
      case 'target':
        return 'border-blue-200 bg-blue-50';
      case 'inspection':
        return 'border-purple-200 bg-purple-50';
      case 'deadline':
        return 'border-orange-200 bg-orange-50';
      case 'approval':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-green-100 text-green-800">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        );
      case 'overdue':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-800">
            <AlertTriangle className="w-3 h-3" />
            Overdue
          </span>
        );
      case 'upcoming':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3" />
            Upcoming
          </span>
        );
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));

    if (days < 0) return `${Math.abs(days)} days ago`;
    if (days === 0) return 'Today';
    if (days === 1) return 'Tomorrow';
    return `in ${days} days`;
  };

  const getTypeColor = (type?: string) => {
    if (!type) return 'bg-gray-100 text-gray-800';

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

  const currentDate = new Date();
  const upcomingEvents = timelineEvents.filter(e => e.date >= currentDate && e.status !== 'completed');
  const pastEvents = timelineEvents.filter(e => e.date < currentDate || e.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Timeline Header */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-900">Launch Timeline</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Calendar className="w-4 h-4" />
            {timelineEvents.length} events tracked
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4 border border-green-200">
            <div className="text-sm text-green-600 mb-1">Completed</div>
            <div className="text-2xl font-bold text-green-900">
              {pastEvents.filter(e => e.status === 'completed').length}
            </div>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
            <div className="text-sm text-blue-600 mb-1">Upcoming</div>
            <div className="text-2xl font-bold text-blue-900">
              {upcomingEvents.length}
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 border border-red-200">
            <div className="text-sm text-red-600 mb-1">Overdue</div>
            <div className="text-2xl font-bold text-red-900">
              {timelineEvents.filter(e => e.status === 'overdue').length}
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events */}
      {upcomingEvents.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Events</h3>
          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={event.id}
                className={`relative p-4 rounded-lg border ${getEventColor(event.type, event.status)}`}
              >
                {/* Connecting line */}
                {index < upcomingEvents.length - 1 && (
                  <div className="absolute left-8 top-full w-0.5 h-4 bg-gray-300" />
                )}

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getEventIcon(event.type, event.status)}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div>
                        <h4 className="font-bold text-gray-900">{event.title}</h4>
                        {event.permitTitle && (
                          <div className="flex items-center gap-2 mt-1">
                            <span className={`text-xs font-semibold px-2 py-1 rounded uppercase ${getTypeColor(event.permitType)}`}>
                              {event.permitType}
                            </span>
                            <span className="text-sm text-gray-700">{event.permitTitle}</span>
                          </div>
                        )}
                      </div>
                      {getStatusBadge(event.status)}
                    </div>

                    {event.description && (
                      <p className="text-sm text-gray-600 mb-2">{event.description}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm">
                      <div className="font-semibold text-gray-900">
                        {formatDate(event.date)}
                      </div>
                      <div className="text-gray-600">
                        {getDaysUntil(event.date)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Past Events */}
      {pastEvents.length > 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Past Events</h3>
          <div className="space-y-3">
            {pastEvents.map((event) => (
              <div
                key={event.id}
                className="flex items-start gap-4 p-3 rounded-lg bg-gray-50 border border-gray-200"
              >
                {/* Icon */}
                <div className="flex-shrink-0 mt-1">
                  {getEventIcon(event.type, event.status)}
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900">{event.title}</h4>
                      {event.permitTitle && (
                        <span className="text-sm text-gray-600">{event.permitTitle}</span>
                      )}
                    </div>
                    <div className="text-xs text-gray-500 whitespace-nowrap">
                      {formatDate(event.date)}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* No Events Message */}
      {timelineEvents.length === 0 && (
        <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
          <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            No Timeline Events Yet
          </h3>
          <p className="text-gray-600">
            Add permits with dates to see them in the timeline
          </p>
        </div>
      )}
    </div>
  );
}
