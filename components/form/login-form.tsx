'use client'

import { Form } from '@/components/ui/form'
import { Button } from '@/ui/button'
import { zodResolver } from '@hookform/resolvers/zod'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { CardFormWrapper } from '../card/ui/card-form-wrapper'
import { FormError } from './ui/form-error'
import { FormInput } from './ui/form-input'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'
import { LoginSchema } from '@/data/login/schema'

export function LoginForm() {
  // TOOD: remove searchParams if not needed
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    // TODO: change email to username
    defaultValues: {
      email: '',
      password: '',
    },
  })

  // const onSubmit = (values: z.infer<typeof LoginSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     login(values, callbackUrl)
  //       .then((data) => {
  //         if (data?.error) {
  //           form.reset();
  //           setError(data.error);
  //         }

  //         if (data?.success) {
  //           form.reset();
  //           setSuccess(data.success);
  //         }

  //       })
  //       .catch(() => setError("Something went wrong"));
  //   });
  // };

  return (
    <CardFormWrapper
      headerLabel='Login'
      backButtonLabel='Registrieren'
      backButtonHref='/auth/register'
    >
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(() => {})}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <>
              <FormInput
                control={form.control}
                name='email'
                label='Email'
                placeholder='justin.hoffmann@uhlhorn.de'
                disabled={isPending}
                type='email'
              />
              <FormInput
                control={form.control}
                name='password'
                label='Passwort'
                disabled={isPending}
                placeholder='********'
                type={showPassword ? 'text' : 'password'}
                icon={
                  showPassword ? (
                    <EyeNoneIcon
                      className='h-4 w-4'
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <EyeOpenIcon
                      className='h-4 w-4'
                      onClick={() => setShowPassword(true)}
                    />
                  )
                }
              >
                <Button
                  size='sm'
                  variant='link'
                  asChild
                  className='px-0 font-normal'
                >
                  <Link href='/auth/reset' className='select-none'>
                    Passwort vergessen?
                  </Link>
                </Button>
              </FormInput>
            </>
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <FormSubmit title='Anmelden' disabled={isPending} showIcon />
        </form>
      </Form>
    </CardFormWrapper>
  )
}
