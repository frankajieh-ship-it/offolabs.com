'use client';

interface RiskScoreGaugeProps {
  score: number;
  category: string;
}

export default function RiskScoreGauge({ score, category }: RiskScoreGaugeProps) {
  // Calculate the rotation for the needle (0-100 maps to -90 to 90 degrees)
  const needleRotation = ((score / 100) * 180) - 90;

  // Determine color based on score
  const getScoreColor = (score: number) => {
    if (score >= 80) return '#10b981'; // green-500
    if (score >= 50) return '#f59e0b'; // yellow-500
    return '#ef4444'; // red-500
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'LOW':
        return 'text-green-700 bg-green-50 border-green-300';
      case 'MODERATE':
        return 'text-yellow-700 bg-yellow-50 border-yellow-300';
      case 'HIGH':
        return 'text-red-700 bg-red-50 border-red-300';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-300';
    }
  };

  const scoreColor = getScoreColor(score);

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Speedometer Arc */}
      <div className="relative w-64 h-32">
        <svg viewBox="0 0 200 100" className="w-full h-full">
          {/* Background Arc - Red Zone (0-49) */}
          <path
            d="M 10 90 A 90 90 0 0 1 65.5 18"
            fill="none"
            stroke="#fecaca"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Yellow Zone (50-79) */}
          <path
            d="M 65.5 18 A 90 90 0 0 1 134.5 18"
            fill="none"
            stroke="#fde68a"
            strokeWidth="20"
            strokeLinecap="round"
          />
          {/* Green Zone (80-100) */}
          <path
            d="M 134.5 18 A 90 90 0 0 1 190 90"
            fill="none"
            stroke="#bbf7d0"
            strokeWidth="20"
            strokeLinecap="round"
          />

          {/* Active Arc - shows the score */}
          <path
            d={`M 10 90 A 90 90 0 ${score > 50 ? '0' : '0'} 1 ${
              10 + (score / 100) * 180
            } ${90 - Math.sin((score / 100) * Math.PI) * 90}`}
            fill="none"
            stroke={scoreColor}
            strokeWidth="22"
            strokeLinecap="round"
            className="transition-all duration-1000"
          />

          {/* Center Circle */}
          <circle cx="100" cy="90" r="8" fill="#374151" />

          {/* Needle */}
          <line
            x1="100"
            y1="90"
            x2="100"
            y2="20"
            stroke="#374151"
            strokeWidth="3"
            strokeLinecap="round"
            transform={`rotate(${needleRotation} 100 90)`}
            className="transition-transform duration-1000 origin-center"
          />

          {/* Tick Marks */}
          {[0, 25, 50, 75, 100].map((tick) => {
            const angle = ((tick / 100) * 180 - 90) * (Math.PI / 180);
            const x1 = 100 + Math.cos(angle) * 75;
            const y1 = 90 + Math.sin(angle) * 75;
            const x2 = 100 + Math.cos(angle) * 85;
            const y2 = 90 + Math.sin(angle) * 85;

            return (
              <g key={tick}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#6b7280"
                  strokeWidth="2"
                />
                <text
                  x={100 + Math.cos(angle) * 65}
                  y={90 + Math.sin(angle) * 65 + 4}
                  textAnchor="middle"
                  fontSize="10"
                  fill="#6b7280"
                  fontWeight="600"
                >
                  {tick}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Score Display */}
      <div className="text-center mt-4">
        <div className="text-6xl font-bold" style={{ color: scoreColor }}>
          {score}
        </div>
        <div className="text-gray-500 text-sm mt-1">out of 100</div>
      </div>

      {/* Category Badge */}
      <div
        className={`mt-4 px-6 py-2 rounded-full font-bold text-lg border-2 ${getCategoryColor(
          category
        )}`}
      >
        {category} RISK
      </div>

      {/* Risk Level Indicators */}
      <div className="mt-6 w-full max-w-xs">
        <div className="flex justify-between text-xs text-gray-600 mb-1">
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-red-400 mr-1"></span>
            High (0-49)
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></span>
            Moderate (50-79)
          </span>
          <span className="flex items-center">
            <span className="w-3 h-3 rounded-full bg-green-400 mr-1"></span>
            Low (80-100)
          </span>
        </div>
      </div>
    </div>
  );
}
