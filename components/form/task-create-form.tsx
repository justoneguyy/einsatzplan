'use client'

import { createTask } from '@/actions/create-task'
import { UsersTypeName } from '@/actions/get-user/types'
import { TaskSchema } from '@/schemas'
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
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'

interface TaskCreateFormProps {
  users: UsersTypeName
}

function TaskCreateForm({ users }: TaskCreateFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof TaskSchema>>({
    resolver: zodResolver(TaskSchema),
    // TODO: currently if e.g. the date is not set in the defaultValues, the custom error message isnt being passed. change this behaviour
    defaultValues: {
      title: '',
      description: '',
      timeFrom: '',
      timeTo: '',
    },
  })

  const onSubmit = (values: z.infer<typeof TaskSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      createTask(values)
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
          <FormInput
            control={form.control}
            name='title'
            label='Titel'
            placeholder='Projektarbeit'
            disabled={isPending}
          />
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            disabled={isPending}
          />
          {/* TODO: add custom time picker with a dropdown menu starting at 06:00 and ending at 20:00 */}
          <div className='flex gap-4'>
            <FormInput
              control={form.control}
              name='timeFrom'
              label='Zeit von'
              placeholder='08:00'
              optional
            />
            <FormInput
              control={form.control}
              name='timeTo'
              label='Zeit bis'
              placeholder='10:00'
              optional
            />
          </div>
          {/* TODO: add groups */}
          <FormSelectMultiple
            control={form.control}
            name='userIds'
            label='Mitarbeiter'
            options={users}
            placeholder='Mitarbeiter auswählen'
            disabled={isPending}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className='flex justify-end space-x-3 pt-6'>
          <DialogClose />
          <FormSubmit className='w-min' title='Anlegen' disabled={isPending} />
        </div>
      </form>
    </Form>
  )
}

export default TaskCreateForm
