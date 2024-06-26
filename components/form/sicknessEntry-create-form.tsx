'use client'

import { createSicknessEntry } from '@/actions/create-sicknessEntry'
import { SicknessEntryTitles } from '@/data/enums'
import { SicknessEntryCreateSchema } from '@/data/sicknessEntry/schema'
import { useUserContext } from '@/lib/provider/user-provider'
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
import { OptionType } from '@/data/schema'

interface SicknessEntryCreateFormProps {
  date?: Date
  user?: OptionType
}

export function SicknessEntryCreateForm({
  date,
  user,
}: SicknessEntryCreateFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { _users } = useUserContext()

  const form = useForm<z.infer<typeof SicknessEntryCreateSchema>>({
    resolver: zodResolver(SicknessEntryCreateSchema),
    defaultValues: {
      title: SicknessEntryTitles.Krank,
      userId: user?.value,
      date: {
        from: date,
        to: date,
      },
    },
  })

  const onSubmit = (values: z.infer<typeof SicknessEntryCreateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createSicknessEntry(values)
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
          <FormSelect
            control={form.control}
            name='title'
            label='Titel'
            placeholder='Titel auswählen'
            options={SicknessEntryTitles}
            isEnum
            onValueChange={(value: string) => {
              form.setValue('title', value as SicknessEntryTitles)
            }}
          />
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            time
            numberOfMonths={2}
            disabled={isPending}
          />
          <FormSelect
            control={form.control}
            name='userId'
            label='Mitarbeiter'
            placeholder='Mitarbeiter auswählen'
            options={_users}
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
