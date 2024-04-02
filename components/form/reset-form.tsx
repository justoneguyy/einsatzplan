'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { Form } from '@/components/ui/form'
import { ResetSchema } from '@/data/reset/schema'
import { MailIcon } from 'lucide-react'
import { CardFormWrapper } from '../card/ui/card-form-wrapper'
import { FormError } from './ui/form-error'
import { FormInput } from './ui/form-input'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'

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
            <FormInput
              control={form.control}
              name='email'
              label='Email'
              disabled={isPending}
              placeholder='justin.hoffmann@uhlhorn.de'
              type='email'
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormSubmit
            title='Reset Link senden'
            showIcon
            icon={<MailIcon className='mr-2 h-4 w-4' />}
          />
        </form>
      </Form>
    </CardFormWrapper>
  )
}
