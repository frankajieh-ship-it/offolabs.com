'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { FormFieldWrapper } from './FormFieldWrapper'

interface MultiSelectOption {
  value: string
  label: string
}

interface MultiSelectProps {
  name: string
  label?: string
  options: MultiSelectOption[]
  value: string[]
  onChange: (values: string[]) => void
  error?: string
  required?: boolean
  placeholder?: string
  maxSelections?: number
  className?: string
  variant?: 'checkbox' | 'tag'
}

export function MultiSelect({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
  placeholder = 'Select options...',
  maxSelections,
  className = '',
  variant = 'checkbox',
}: MultiSelectProps) {
  const [searchTerm, setSearchTerm] = useState('')

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleChange = (optionValue: string) => {
    const newValue = value.includes(optionValue)
      ? value.filter((v) => v !== optionValue)
      : maxSelections && value.length >= maxSelections
        ? value
        : [...value, optionValue]

    onChange(newValue)
  }

  const handleRemove = (optionValue: string) => {
    onChange(value.filter((v) => v !== optionValue))
  }

  if (variant === 'tag') {
    return (
      <FormFieldWrapper label={label} error={error} required={required}>
        <div className={`space-y-3 ${className}`}>
          <div className="flex flex-wrap gap-2">
            {value.map((v) => {
              const option = options.find((o) => o.value === v)
              return (
                <div
                  key={v}
                  className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                >
                  <span className="text-sm font-medium">{option?.label}</span>
                  <button
                    type="button"
                    onClick={() => handleRemove(v)}
                    className="hover:text-blue-900 dark:hover:text-blue-100"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )
            })}
          </div>
          <input
            type="text"
            placeholder={placeholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {filteredOptions.map((option) => (
              <label
                key={option.value}
                className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              >
                <input
                  type="checkbox"
                  name={name}
                  value={option.value}
                  checked={value.includes(option.value)}
                  onChange={() => handleChange(option.value)}
                  disabled={
                    maxSelections ? value.length >= maxSelections && !value.includes(option.value) : false
                  }
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                />
                <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
              </label>
            ))}
          </div>
        </div>
      </FormFieldWrapper>
    )
  }

  // Default checkbox variant
  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <div className={`space-y-3 ${className}`}>
        <input
          type="text"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {filteredOptions.map((option) => (
            <label
              key={option.value}
              className="flex items-center gap-2 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={value.includes(option.value)}
                onChange={() => handleChange(option.value)}
                disabled={
                  maxSelections ? value.length >= maxSelections && !value.includes(option.value) : false
                }
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
              />
              <span className="text-sm text-gray-900 dark:text-white">{option.label}</span>
            </label>
          ))}
        </div>
        {value.length > 0 && (
          <button
            type="button"
            onClick={() => onChange([])}
            className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
    </FormFieldWrapper>
  )
}