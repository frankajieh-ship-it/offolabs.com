'use client'

interface ContentBlockProps {
  title: string
  subtitle: string
  icon: string
  description?: string
}

export default function ContentBlock({ title, subtitle, icon, description }: ContentBlockProps) {
  return (
    <div className="max-w-4xl mx-auto text-center px-4">
      <div className="text-6xl mb-6">{icon}</div>
      <h2 className="text-3xl md:text-4xl font-bold mb-4 text-offo-navy">{title}</h2>
      <p className="text-xl md:text-2xl text-gray-700 mb-4">{subtitle}</p>
      {description && (
        <p className="text-base md:text-lg text-gray-600 mt-6 max-w-3xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </div>
  )
}
