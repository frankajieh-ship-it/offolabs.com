import * as React from 'react'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: string
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          ref={ref}
          className={`w-full rounded-lg border ${
            error ? 'border-red-300 focus:border-red-500 focus:ring-red-500/20' : 'border-gray-300 focus:border-blue-600 focus:ring-blue-600/20'
          } px-4 py-2.5 focus:ring-2 outline-none transition-colors resize-none ${className}`}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-600 mt-1">{error}</p>
        )}
      </div>
    )
  }
)
Textarea.displayName = 'Textarea'

export { Textarea }
