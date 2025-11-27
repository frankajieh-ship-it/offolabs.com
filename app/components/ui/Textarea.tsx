'use client'

import { forwardRef, useState } from 'react'
import { FormFieldWrapper } from './FormFieldWrapper'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  error?: string
  required?: boolean
  helperText?: string
  maxLength?: number
  showCharCount?: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      label,
      error,
      required,
      helperText,
      maxLength,
      showCharCount = false,
      className = '',
      value = '',
      ...props
    },
    ref
  ) => {
    const [charCount, setCharCount] = useState(String(value).length)

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setCharCount(e.target.value.length)
      props.onChange?.(e)
    }

    return (
      <FormFieldWrapper
        label={label}
        error={error}
        required={required}
        helperText={helperText}
      >
        <div>
          <textarea
            ref={ref}
            className={`w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none ${
              error ? 'border-red-500 focus:ring-red-500' : ''
            } ${className}`}
            maxLength={maxLength}
            value={value}
            onChange={handleChange}
            {...props}
          />
          {showCharCount && maxLength && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {charCount} / {maxLength}
            </p>
          )}
        </div>
      </FormFieldWrapper>
    )
  }
)
Textarea.displayName = 'Textarea'