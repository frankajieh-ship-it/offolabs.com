'use client';

interface Driver {
  label: string;
  impact: 'positive' | 'neutral' | 'negative';
  description: string;
}

interface DriversOfRiskProps {
  drivers: Driver[];
}

export default function DriversOfRisk({ drivers }: DriversOfRiskProps) {
  if (!drivers || drivers.length === 0) {
    return (
      <div className="flex items-center justify-center h-32 text-gray-500">
        <p>No risk drivers identified</p>
      </div>
    );
  }

  const getImpactChip = (impact: 'positive' | 'neutral' | 'negative') => {
    const styles = {
      positive: 'bg-green-100 text-green-700 border-green-300',
      neutral: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      negative: 'bg-red-100 text-red-700 border-red-300',
    };

    const icons = {
      positive: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
      ),
      neutral: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      ),
      negative: (
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
            clipRule="evenodd"
          />
        </svg>
      ),
    };

    const labels = {
      positive: 'Positive',
      neutral: 'Neutral',
      negative: 'Negative',
    };

    return (
      <span
        className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold border ${styles[impact]}`}
      >
        {icons[impact]}
        {labels[impact]}
      </span>
    );
  };

  return (
    <div className="space-y-4">
      {drivers.map((driver, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-gray-300 transition"
        >
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900">{driver.label}</h3>
            {getImpactChip(driver.impact)}
          </div>
          <p className="text-sm text-gray-600">{driver.description}</p>
        </div>
      ))}

      {/* Summary */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm text-gray-600">
          <span>
            Positive:{' '}
            <span className="font-semibold text-green-700">
              {drivers.filter((d) => d.impact === 'positive').length}
            </span>
          </span>
          <span>
            Neutral:{' '}
            <span className="font-semibold text-yellow-700">
              {drivers.filter((d) => d.impact === 'neutral').length}
            </span>
          </span>
          <span>
            Negative:{' '}
            <span className="font-semibold text-red-700">
              {drivers.filter((d) => d.impact === 'negative').length}
            </span>
          </span>
        </div>
      </div>
    </div>
  );
}
