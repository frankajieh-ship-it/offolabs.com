'use client'

import { forwardRef } from 'react'
import { FormFieldWrapper } from './FormFieldWrapper'

interface InputTextProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
}

export const InputText = forwardRef<HTMLInputElement, InputTextProps>(
  ({ label, error, required, helperText, className = '', ...props }, ref) => (
    <FormFieldWrapper label={label} error={error} required={required} helperText={helperText}>
      <input
        ref={ref}
        className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
          error ? 'border-red-500 focus:ring-red-500' : ''
        } ${className}`}
        {...props}
      />
    </FormFieldWrapper>
  )
)
InputText.displayName = 'InputText'