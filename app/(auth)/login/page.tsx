import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/button'
import { UserAuthForm } from './components/user-auth-form'

export default function LoginPage() {
  return (
    // TODO: maybe dont use this but rather a split view (left: image -> maybe ai generated from uhlhorn image, right: form)
    // TODO: add gradient as background
    <div className='flex h-full w-full items-center justify-center bg-primary-foreground'>
      <div className='mx-auto flex w-full flex-col justify-center space-y-6 rounded-md bg-background p-8 sm:w-[400px]'>
        <h1 className='text-center text-2xl font-semibold tracking-tight'>
          Anmelden
        </h1>
        <UserAuthForm />
      </div>
    </div>
  )
}
