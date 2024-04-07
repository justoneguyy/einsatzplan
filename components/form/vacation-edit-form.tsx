'use client'

import { VacationDurations, VacationTypes } from '@/data/enums'
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
import { VacationUpdateSchema } from '@/data/vacation/schema'
import { useUserContext } from '@/lib/provider/user-provider'
import { Vacation } from '@prisma/client'
import { updateVacation } from '@/actions/update-vacation'

interface VacationEditFormProps {
  vacation: Vacation
}

export function VacationEditForm({ vacation }: VacationEditFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { _users } = useUserContext()

  const form = useForm<z.infer<typeof VacationUpdateSchema>>({
    resolver: zodResolver(VacationUpdateSchema),
    defaultValues: {
      id: vacation.id,
      type: vacation.type as VacationTypes,
      duration: vacation.duration as VacationDurations,
      userId: vacation.userId as string,
      date: {
        from: vacation.dateFrom,
        to: vacation.dateTo,
      },
    },
  })

  const onSubmit = (values: z.infer<typeof VacationUpdateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateVacation(values)
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
            name='type'
            label='Typ'
            placeholder='Typ auswählen'
            options={VacationTypes}
            isEnum
            onValueChange={(value: string) => {
              form.setValue('type', value as VacationTypes)
            }}
          />
          <FormSelect
            control={form.control}
            name='duration'
            label='Dauer'
            placeholder='Dauer auswählen'
            options={VacationDurations}
            isEnum
            onValueChange={(value: string) => {
              form.setValue('duration', value as VacationDurations)
            }}
          />
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
