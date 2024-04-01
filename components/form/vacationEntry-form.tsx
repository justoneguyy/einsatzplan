'use client'

import { createVacationEntry } from '@/actions/create-vacationEntry'
import { UsersTypeName } from '@/actions/get-user/types'
import { VacationEntryDurations, VacationEntryTypes } from '@/data/enums'
import { VacationEntrySchema } from '@/schemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { dialogClose } from '../ui/dialog'
import { Form } from '../ui/form'
import { FormDateRangePicker } from './ui/form-date-range-picker'
import { FormError } from './ui/form-error'
import { FormSelect } from './ui/form-select'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'

interface VacationEntryFormProps {
  users: UsersTypeName
}

export function VacationEntryForm({ users }: VacationEntryFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof VacationEntrySchema>>({
    resolver: zodResolver(VacationEntrySchema),
    defaultValues: {
      type: VacationEntryTypes.Urlaub,
      duration: VacationEntryDurations.Ganztags,
      date: {
        from: new Date(),
        to: new Date(),
      },
      userId: '',
    },
  })

  const onSubmit = (values: z.infer<typeof VacationEntrySchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createVacationEntry(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
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
          <FormSelect
            control={form.control}
            name='type'
            label='Typ'
            placeholder='Typ auswählen'
            options={VacationEntryTypes}
            isEnum
            onValueChange={(value: string) => {
              form.setValue('type', value as VacationEntryTypes)
            }}
          />
          <FormSelect
            control={form.control}
            name='duration'
            label='Dauer'
            placeholder='Dauer auswählen'
            options={VacationEntryDurations}
            isEnum
            onValueChange={(value: string) => {
              form.setValue('duration', value as VacationEntryDurations)
            }}
          />
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            disabled={isPending}
          />
          <FormSelect
            control={form.control}
            name='userId'
            label='Mitarbeiter'
            placeholder='Mitarbeiter auswählen'
            options={users}
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
