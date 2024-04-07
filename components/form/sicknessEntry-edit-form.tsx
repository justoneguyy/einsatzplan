'use client'

import { SicknessEntryTitles } from '@/data/enums'
import { SicknessEntryUpdateSchema } from '@/data/sicknessEntry/schema'
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
import { updateSicknessEntry } from '@/actions/update-sicknessEntry'
import { SicknessEntry } from '@prisma/client'

interface SicknessEntryEditFormProps {
  sicknessEntry: SicknessEntry
}

export function SicknessEntryEditForm({
  sicknessEntry,
}: SicknessEntryEditFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { _users } = useUserContext()

  const form = useForm<z.infer<typeof SicknessEntryUpdateSchema>>({
    resolver: zodResolver(SicknessEntryUpdateSchema),
    defaultValues: {
      id: sicknessEntry.id,
      title: sicknessEntry.title as SicknessEntryTitles,
      userId: sicknessEntry.userId as string,
      date: {
        from: sicknessEntry.dateFrom,
        to: sicknessEntry.dateTo,
      },
    },
  })

  const onSubmit = (values: z.infer<typeof SicknessEntryUpdateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateSicknessEntry(values)
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
          {/* TODO: add duration with preset time? */}
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            time
            // TODO: currently the daterangepicker with time isnt well styled if more than 1 month is shown. fix this
            numberOfMonths={1}
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
          <FormSubmit className='w-min' title='Updaten' disabled={isPending} />
        </div>
      </form>
    </Form>
  )
}
