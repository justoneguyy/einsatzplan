'use client'

import Link from 'next/link'

import { Button } from '@/components/ui/button'

interface AuthCardBackButtonProps {
  href: string
  label: string
}

export const AuthCardBackButton = ({
  href,
  label,
}: AuthCardBackButtonProps) => {
  return (
    <Button variant='link' className='w-full font-normal' size='sm' asChild>
      <Link href={href}>{label}</Link>
    </Button>
  )
}
