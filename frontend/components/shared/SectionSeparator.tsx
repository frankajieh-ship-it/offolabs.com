'use client'

interface SectionSeparatorProps {
  className?: string
}

export default function SectionSeparator({ className = '' }: SectionSeparatorProps) {
  return (
    <div className={`my-12 ${className}`}>
      <div className="h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
    </div>
  )
}
