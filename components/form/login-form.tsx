'use client'

import { cn } from '@/lib/utils'
import { Button } from '@/ui/button'
import { Input } from '@/ui/input'
import { Loader2, MailIcon } from 'lucide-react'
import { useState, useTransition } from 'react'
import { FormInput } from './ui/form-input'
import { FormSubmit } from './ui/form-submit'
import { Separator } from '../ui/separator'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { FormError } from './ui/form-error'
import { FormSuccess } from './ui/form-success'
import { useSearchParams } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { LoginSchema } from '@/schemas'
import { CardFormWrapper } from '../card/ui/card-form-wrapper'

export function LoginForm() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl')
  const urlError =
    searchParams.get('error') === 'OAuthAccountNotLinked'
      ? 'Email already in use with different provider!'
      : ''

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

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
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='justin.hoffmann@uhlhorn.de'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='password'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passwort</FormLabel>
                    <FormControl>
                      <div className='relative'>
                        <Input
                          {...field}
                          disabled={isPending}
                          placeholder='********'
                          type={showPassword ? 'text' : 'password'}
                        />
                        <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                          {/* TODO: add tooltip? */}
                          {showPassword ? (
                            <EyeNoneIcon
                              className='h-4 w-4'
                              onClick={() => setShowPassword(false)}
                            />
                          ) : (
                            <EyeOpenIcon
                              className='h-4 w-4'
                              onClick={() => setShowPassword(true)}
                            />
                          )}
                        </div>
                      </div>
                    </FormControl>
                    <FormMessage />
                    <Button
                      size='sm'
                      variant='link'
                      asChild
                      className='px-0 font-normal'
                    >
                      <Link href='/auth/reset'>Passwort vergessen?</Link>
                    </Button>
                  </FormItem>
                )}
              />
            </>
          </div>
          <FormError message={error || urlError} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            {isPending && <Loader2 className='mr-2 h-4 w-4 animate-spin' />}
            Anmelden
          </Button>
        </form>
      </Form>
    </CardFormWrapper>
  )
}
