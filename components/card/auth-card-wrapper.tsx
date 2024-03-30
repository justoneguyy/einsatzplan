'use client'

import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { AuthCardHeader } from './auth-card-header'
import { AuthCardBackButton } from './auth-card-back-button'
import { cn } from '@/lib/utils'

interface AuthCardWrapperProps {
  children: React.ReactNode
  className?: string
  headerLabel: string
  backButtonLabel: string
  backButtonHref: string
}

export const AuthCardWrapper = ({
  children,
  className,
  headerLabel,
  backButtonLabel,
  backButtonHref,
}: AuthCardWrapperProps) => {
  return (
    <Card className={cn('w-[400px] shadow-md', className)}>
      <CardHeader>
        <AuthCardHeader label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>
      <CardFooter>
        <AuthCardBackButton label={backButtonLabel} href={backButtonHref} />
      </CardFooter>
    </Card>
  )
}
