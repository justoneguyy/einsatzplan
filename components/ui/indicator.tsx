'use client'

import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '@/lib/utils'

const Indicator = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value = 100, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      'relative h-1 w-full overflow-hidden rounded-full',
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator className='bg-blue-500 h-full w-full' />
  </ProgressPrimitive.Root>
))
Indicator.displayName = ProgressPrimitive.Root.displayName

export { Indicator }
