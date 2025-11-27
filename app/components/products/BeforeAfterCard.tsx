import Image from 'next/image'

interface BeforeAfterCardProps {
  label: string
  beforeImageSrc: string
  afterImageSrc: string
  beforeLabel?: string
  afterLabel?: string
  isConceptOnly?: boolean
}

export default function BeforeAfterCard({
  label,
  beforeImageSrc,
  afterImageSrc,
  beforeLabel = 'Before',
  afterLabel = 'After',
  isConceptOnly = true
}: BeforeAfterCardProps) {
  return (
    <div className="group overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 transition-all duration-300 hover:shadow-offo-lg">
      {/* Title */}
      <div className="bg-white dark:bg-gray-900/50 px-6 py-4 border-b border-gray-200 dark:border-gray-800">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          {label}
        </h3>
      </div>

      {/* Images Container - Side by side on desktop, stacked on mobile */}
      <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50 dark:bg-gray-900/30">
        {/* Before Image */}
        <div className="relative aspect-square md:aspect-auto md:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={beforeImageSrc}
            alt={`${label} - ${beforeLabel}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Before Label Overlay */}
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-white font-semibold text-sm">
              {beforeLabel}
            </span>
          </div>
        </div>

        {/* After Image */}
        <div className="relative aspect-square md:aspect-auto md:h-auto overflow-hidden bg-gray-100 dark:bg-gray-800">
          <Image
            src={afterImageSrc}
            alt={`${label} - ${afterLabel}`}
            fill
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* After Label Overlay */}
          <div className="absolute inset-0 flex items-end p-4 bg-gradient-to-t from-black/60 to-transparent">
            <span className="text-white font-semibold text-sm">
              {afterLabel}
            </span>
          </div>

          {/* Concept Badge (if applicable) */}
          {isConceptOnly && (
            <div className="absolute top-4 right-4">
              <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 dark:bg-amber-900/40 text-amber-800 dark:text-amber-200 border border-amber-300 dark:border-amber-700">
                Concept Preview
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
