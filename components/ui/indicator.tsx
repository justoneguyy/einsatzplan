'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

interface IndicatorProps extends React.HTMLAttributes<HTMLSpanElement> {
  orientation?: 'horizontal' | 'vertical'
}

const Indicator = React.forwardRef<HTMLSpanElement, IndicatorProps>(
  ({ orientation = 'horizontal', className, ...props }, ref) => {
    const containerClasses = cn(
      'rounded-full bg-blue-500',
      orientation === 'horizontal' ? 'h-1 w-full' : 'h-full w-1',
      className
    )

    return <span ref={ref} className={containerClasses} {...props} />
  }
)

export { Indicator }
