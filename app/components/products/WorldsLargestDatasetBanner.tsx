import { Database } from 'lucide-react'

export default function WorldsLargestDatasetBanner() {
  const datasets = [
    'Passenger vehicles',
    'Heavy-duty trucks',
    'Motorcycles',
    'Industrial machinery',
    'Generator sets',
  ]

  return (
    <section className="relative w-full bg-gradient-to-r from-orange-900 via-orange-800 to-orange-900 dark:from-gray-950 dark:via-orange-950 dark:to-gray-950 overflow-hidden">
      {/* Waveform/Spectrogram Backdrop */}
      <div className="absolute inset-0 opacity-10 dark:opacity-20">
        <svg
          className="w-full h-full"
          viewBox="0 0 1200 300"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Animated Waveform Pattern */}
          <defs>
            <pattern id="waveform" x="0" y="0" width="100" height="300" patternUnits="userSpaceOnUse">
              {/* Vertical frequency bars like a spectrogram */}
              <rect x="0" y="0" width="4" height="50" fill="currentColor" opacity="0.6" />
              <rect x="8" y="30" width="4" height="100" fill="currentColor" opacity="0.8" />
              <rect x="16" y="20" width="4" height="120" fill="currentColor" opacity="0.7" />
              <rect x="24" y="10" width="4" height="140" fill="currentColor" opacity="0.9" />
              <rect x="32" y="40" width="4" height="90" fill="currentColor" opacity="0.6" />
              <rect x="40" y="50" width="4" height="80" fill="currentColor" opacity="0.7" />
              <rect x="48" y="25" width="4" height="110" fill="currentColor" opacity="0.8" />
              <rect x="56" y="35" width="4" height="95" fill="currentColor" opacity="0.65" />
              <rect x="64" y="15" width="4" height="130" fill="currentColor" opacity="0.85" />
              <rect x="72" y="45" width="4" height="85" fill="currentColor" opacity="0.7" />
              <rect x="80" y="30" width="4" height="105" fill="currentColor" opacity="0.75" />
              <rect x="88" y="20" width="4" height="125" fill="currentColor" opacity="0.8" />
              <rect x="96" y="40" width="4" height="92" fill="currentColor" opacity="0.65" />
            </pattern>
          </defs>

          {/* Apply waveform pattern */}
          <rect width="1200" height="300" fill="url(#waveform)" className="text-white" />

          {/* Gradient overlay for depth */}
          <linearGradient id="waveGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="white" stopOpacity="0.15" />
            <stop offset="50%" stopColor="white" stopOpacity="0.05" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </linearGradient>
          <rect width="1200" height="300" fill="url(#waveGradient)" />
        </svg>
      </div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
        {/* Header Badge */}
        <div className="flex items-center justify-center mb-6">
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm">
            <Database className="w-4 h-4 text-white" />
            <span className="text-sm font-semibold text-white">Acoustic Intelligence</span>
          </div>
        </div>

        {/* Main Title */}
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white text-center mb-6 tracking-tight">
          World&apos;s Largest Non-OEM Acoustic Database
        </h2>

        {/* Body Copy */}
        <p className="text-lg sm:text-xl text-white/90 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
          Engine Acoustic AI is actively building the world&apos;s largest non-OEM acoustic dataset for:
        </p>

        {/* Dataset Categories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-12 max-w-4xl mx-auto">
          {datasets.map((dataset, index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-lg bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 backdrop-blur-sm text-center text-white font-medium hover:bg-white/20 dark:hover:bg-white/10 transition-colors duration-300"
            >
              {dataset}
            </div>
          ))}
        </div>

        {/* Key Message */}
        <div className="text-center">
          <p className="text-lg sm:text-xl text-white/95 max-w-3xl mx-auto">
            This comprehensive foundation powers more accurate diagnostics than OEM tools that only cover manufacturer-specific ranges.
          </p>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-b from-transparent to-white dark:to-gray-900/50" />
    </section>
  )
}
