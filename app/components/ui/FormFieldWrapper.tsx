'use client'

interface FormFieldWrapperProps {
  label?: string
  error?: string
  helperText?: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormFieldWrapper({
  label,
  error,
  helperText,
  required,
  children,
  className = '',
}: FormFieldWrapperProps) {
  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="block text-sm font-semibold text-gray-900 dark:text-white">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          {error}
        </p>
      )}
      {helperText && !error && (
        <p className="text-xs text-gray-500 dark:text-gray-400">{helperText}</p>
      )}
    </div>
  )
}