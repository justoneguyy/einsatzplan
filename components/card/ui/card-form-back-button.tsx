'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface CardFormBackButtonProps {
  href: string
  label: string
}

export const CardFormBackButton = ({
  href,
  label,
}: CardFormBackButtonProps) => {
  return (
    <Button variant='link' className='w-full font-normal' size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
