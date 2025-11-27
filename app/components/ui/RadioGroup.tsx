'use client'

import { FormFieldWrapper } from './FormFieldWrapper'

interface RadioOption {
  value: string
  label: string
  description?: string
}

interface RadioGroupProps {
  name: string
  label?: string
  options: RadioOption[]
  value: string
  onChange: (value: string) => void
  error?: string
  required?: boolean
  vertical?: boolean
  className?: string
}

export function RadioGroup({
  name,
  label,
  options,
  value,
  onChange,
  error,
  required,
  vertical = true,
  className = '',
}: RadioGroupProps) {
  return (
    <FormFieldWrapper label={label} error={error} required={required}>
      <fieldset className={className}>
        <div className={`flex ${vertical ? 'flex-col' : 'flex-row'} gap-4`}>
          {options.map((option) => (
            <label
              key={option.value}
              className="flex items-start gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={(e) => onChange(e.target.value)}
                className="mt-1 w-4 h-4 text-blue-600 border-gray-300 focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-400 cursor-pointer"
              />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {option.label}
                </span>
                {option.description && (
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {option.description}
                  </span>
                )}
              </div>
            </label>
          ))}
        </div>
      </fieldset>
    </FormFieldWrapper>
  )
}