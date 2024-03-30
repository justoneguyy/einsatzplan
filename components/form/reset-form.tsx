'use client'

import * as z from 'zod'
import { useForm } from 'react-hook-form'
import { useState, useTransition } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'

import { ResetSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { FormError } from './ui/form-error'
import { FormSuccess } from './ui/form-success'
import { MailIcon } from 'lucide-react'
import { CardFormWrapper } from '../card/ui/card-form-wrapper'

export const ResetForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: '',
    },
  })

  // const onSubmit = (values: z.infer<typeof ResetSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     reset(values)
  //       .then((data) => {
  //         setError(data?.error);
  //         setSuccess(data?.success);
  //       });
  //   });
  // };

  return (
    <CardFormWrapper
      headerLabel='Passwort vergessen?'
      backButtonLabel='Zurück zum Login'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          className='space-y-6'
        >
          <div className='space-y-4'>
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
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            <MailIcon className='mr-2 h-4 w-4' />
            Reset Link senden
          </Button>
        </form>
      </Form>
    </CardFormWrapper>
  )
}
