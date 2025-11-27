'use client'

import { FormFieldWrapper } from './FormFieldWrapper'

interface SegmentedOption {
  value: string
  label: string
}

interface SegmentedControlProps {
  name: string
  label?: string
  options: SegmentedOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  size?: 'sm' | 'md' | 'lg'
  fullWidth?: boolean
  className?: string
}

export function SegmentedControl({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
  size = 'md',
  fullWidth = false,
  className = '',
}: SegmentedControlProps) {
  const sizeClasses = {
    sm: 'px-3 py-1 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  }

  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <div
        className={`inline-flex rounded-lg border border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-700 p-1 ${
          fullWidth ? 'w-full' : ''
        } ${className}`}
      >
        {options.map((option) => (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={`${sizeClasses[size]} font-medium rounded-md transition-all flex-1 ${
              value === option.value
                ? 'bg-white dark:bg-gray-800 text-blue-600 dark:text-blue-400 shadow-sm'
                : 'text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </FormFieldWrapper>
  )
}