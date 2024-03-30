'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { CardFormBackButton } from './card-form-back-button'
import { CardFormHeader } from './card-form-header'

interface CardFormWrapperProps {
  children: React.ReactNode
  className?: string
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
}

export const CardFormWrapper = ({
  children,
  className,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: CardFormWrapperProps) => {
  return (
    <Card className={cn('w-[400px] shadow-md', className)}>
      <CardHeader>
        <CardFormHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <CardFormBackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
