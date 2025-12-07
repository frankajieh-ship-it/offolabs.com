'use client';

interface RecommendedActionsProps {
  actions: string[];
  category: string;
}

export default function RecommendedActions({ actions, category }: RecommendedActionsProps) {
  // Default actions based on category if none provided
  const getDefaultActions = (category: string): string[] => {
    switch (category) {
      case 'LOW':
        return [
          'Continue current compliance practices',
          'Maintain regular monitoring and reviews',
          'Share successful strategies across organization',
          'Document best practices for future reference',
        ];
      case 'MODERATE':
        return [
          'Review and address areas scoring below 70',
          'Increase monitoring frequency',
          'Implement corrective action plans',
          'Schedule follow-up assessment within 30 days',
          'Provide additional training where needed',
        ];
      case 'HIGH':
        return [
          'Initiate immediate remediation plan',
          'Conduct comprehensive compliance audit',
          'Assign dedicated compliance resources',
          'Weekly monitoring and reporting required',
          'Escalate to management for review',
          'Prioritize overdue tasks and training',
        ];
      default:
        return ['No specific actions recommended at this time'];
    }
  };

  const displayActions = actions && actions.length > 0 ? actions : getDefaultActions(category);

  const getPriorityIcon = (index: number) => {
    // First 2 actions are high priority for HIGH risk, first 1 for MODERATE
    const isHighPriority =
      (category === 'HIGH' && index < 2) || (category === 'MODERATE' && index < 1);

    if (isHighPriority) {
      return (
        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
          !
        </span>
      );
    }

    return (
      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
        {index + 1}
      </span>
    );
  };

  const getCategoryInfo = (category: string) => {
    switch (category) {
      case 'LOW':
        return {
          title: 'Maintain Excellence',
          color: 'text-green-700',
          bgColor: 'bg-green-50',
          borderColor: 'border-green-200',
        };
      case 'MODERATE':
        return {
          title: 'Improvement Needed',
          color: 'text-yellow-700',
          bgColor: 'bg-yellow-50',
          borderColor: 'border-yellow-200',
        };
      case 'HIGH':
        return {
          title: 'Urgent Action Required',
          color: 'text-red-700',
          bgColor: 'bg-red-50',
          borderColor: 'border-red-200',
        };
      default:
        return {
          title: 'Actions',
          color: 'text-gray-700',
          bgColor: 'bg-gray-50',
          borderColor: 'border-gray-200',
        };
    }
  };

  const categoryInfo = getCategoryInfo(category);

  return (
    <div>
      {/* Category Header */}
      <div
        className={`mb-4 p-3 rounded-lg border ${categoryInfo.bgColor} ${categoryInfo.borderColor}`}
      >
        <h3 className={`font-semibold ${categoryInfo.color}`}>{categoryInfo.title}</h3>
      </div>

      {/* Actions List */}
      <div className="space-y-3">
        {displayActions.map((action, index) => (
          <div
            key={index}
            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition"
          >
            {getPriorityIcon(index)}
            <p className="text-sm text-gray-700 flex-1">{action}</p>
          </div>
        ))}
      </div>

      {/* Action Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Total Actions:</span>
          <span className="font-semibold text-gray-900">{displayActions.length}</span>
        </div>
        {category === 'HIGH' && (
          <div className="mt-2 flex items-center gap-2 text-sm text-red-600">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span className="font-semibold">Immediate attention required</span>
          </div>
        )}
      </div>
    </div>
  );
}
