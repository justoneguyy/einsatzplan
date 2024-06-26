'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { Form } from '../ui/form'
import { FormDateRangePicker } from './ui/form-date-range-picker'
import { FormError } from './ui/form-error'
import { FormSelect } from './ui/form-select'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'
import { dialogClose } from '../ui/dialog'
import { toast } from 'sonner'
import { OnCallServiceSchema } from '@/data/onCallService/schema'
import { createOnCallService } from '@/actions/create-onCallService'
import { useUserContext } from '@/lib/provider/user-provider'
import { OptionType } from '@/data/schema'

interface OnCallServiceFormProps {
  date?: Date
  user?: OptionType
}

export function OnCallServiceForm({ date, user }: OnCallServiceFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { _usersOnCallService = [] } = useUserContext()

  const form = useForm<z.infer<typeof OnCallServiceSchema>>({
    resolver: zodResolver(OnCallServiceSchema),
    defaultValues: {
      userId: user?.value,
      date: {
        from: date,
        to: date,
      },
    },
  })

  const onSubmit = (values: z.infer<typeof OnCallServiceSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createOnCallService(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            dialogClose()
            toast.success(`${data.success}`)
          }
        })
        .catch(() => setError('Etwas ist schief gelaufen'))
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-4'>
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            numberOfMonths={2}
            disabled={isPending}
          />
          <FormSelect
            control={form.control}
            name='userId'
            label='Mitarbeiter'
            placeholder='Mitarbeiter auswählen'
            options={_usersOnCallService}
            onValueChange={(value: string) => {
              form.setValue('userId', value)
            }}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className='flex justify-end space-x-3'>
          <DialogClose />
          <FormSubmit className='w-min' title='Anlegen' disabled={isPending} />
        </div>
      </form>
    </Form>
  )
}
