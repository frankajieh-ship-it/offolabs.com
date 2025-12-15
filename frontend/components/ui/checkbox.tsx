'use client'

import * as React from 'react'
import { Check } from 'lucide-react'

interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ className = '', checked, onCheckedChange, ...props }, ref) => {
    return (
      <div className="relative inline-flex items-center">
        <input
          ref={ref}
          type="checkbox"
          checked={checked}
          onChange={(e) => onCheckedChange?.(e.target.checked)}
          className="sr-only"
          {...props}
        />
        <div
          className={`h-5 w-5 rounded border-2 flex items-center justify-center transition-colors cursor-pointer ${
            checked
              ? 'bg-blue-600 border-blue-600'
              : 'bg-white border-gray-300 hover:border-gray-400'
          } ${className}`}
          onClick={() => onCheckedChange?.(!checked)}
        >
          {checked && <Check className="h-3.5 w-3.5 text-white" />}
        </div>
      </div>
    )
  }
)
Checkbox.displayName = 'Checkbox'

export { Checkbox }
