'use client'

import * as React from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectContextValue {
  value: string
  onValueChange: (value: string) => void
  open: boolean
  setOpen: (open: boolean) => void
}

const SelectContext = React.createContext<SelectContextValue | undefined>(undefined)

interface SelectProps {
  value: string
  onValueChange: (value: string) => void
  children: React.ReactNode
}

const Select = ({ value, onValueChange, children }: SelectProps) => {
  const [open, setOpen] = React.useState(false)

  return (
    <SelectContext.Provider value={{ value, onValueChange, open, setOpen }}>
      <div className="relative">{children}</div>
    </SelectContext.Provider>
  )
}

const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { children?: React.ReactNode }
>(({ className = '', children, ...props }, ref) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectTrigger must be used within Select')

  return (
    <button
      ref={ref}
      type="button"
      className={`w-full flex items-center justify-between rounded-lg border border-gray-300 px-4 py-2.5 text-left focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-colors ${className}`}
      onClick={() => context.setOpen(!context.open)}
      {...props}
    >
      {children}
      <ChevronDown className="h-4 w-4 text-gray-400" />
    </button>
  )
})
SelectTrigger.displayName = 'SelectTrigger'

const SelectValue = ({ placeholder }: { placeholder?: string }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectValue must be used within Select')

  return (
    <span className={context.value ? 'text-gray-900' : 'text-gray-500'}>
      {context.value || placeholder}
    </span>
  )
}

const SelectContent = ({ children }: { children: React.ReactNode }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectContent must be used within Select')

  if (!context.open) return null

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={() => context.setOpen(false)}
      />
      <div className="absolute z-50 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-auto">
        {children}
      </div>
    </>
  )
}

const SelectItem = ({ value, children }: { value: string; children: React.ReactNode }) => {
  const context = React.useContext(SelectContext)
  if (!context) throw new Error('SelectItem must be used within Select')

  return (
    <button
      type="button"
      className={`w-full text-left px-4 py-2.5 hover:bg-gray-100 transition-colors ${
        context.value === value ? 'bg-blue-50 text-blue-600' : 'text-gray-900'
      }`}
      onClick={() => {
        context.onValueChange(value)
        context.setOpen(false)
      }}
    >
      {children}
    </button>
  )
}

export { Select, SelectTrigger, SelectValue, SelectContent, SelectItem }
