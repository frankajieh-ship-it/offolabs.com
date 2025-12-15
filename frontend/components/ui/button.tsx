import * as React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost'
  size?: 'default' | 'sm' | 'lg'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = '', variant = 'default', size = 'default', asChild = false, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
      default: 'bg-blue-600 text-white hover:bg-blue-700',
      outline: 'border-2 border-gray-300 text-gray-700 hover:bg-gray-50',
      ghost: 'text-gray-700 hover:bg-gray-100'
    }

    const sizes = {
      default: 'px-6 py-2.5 text-sm',
      sm: 'px-4 py-2 text-xs',
      lg: 'px-8 py-3 text-base'
    }

    const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`

    if (asChild && React.isValidElement(children)) {
      return React.cloneElement(children as React.ReactElement<any>, {
        className: classes,
        ...props
      })
    }

    return (
      <button
        ref={ref}
        className={classes}
        {...props}
      >
        {children}
      </button>
    )
  }
)
Button.displayName = 'Button'

export { Button }
