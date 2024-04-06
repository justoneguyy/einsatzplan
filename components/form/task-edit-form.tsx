'use client'

import { updateTask } from '@/actions/update-task'
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
import { TaskUpdateSchema } from '@/data/task/schema'
import { useUserContext } from '@/lib/provider/user-provider'
import { UserTaskType } from '@/data/user/types'
import { UnwrapArray } from '@/lib/types'

interface TaskEditFormProps {
  task: UnwrapArray<UserTaskType['tasks']>
}

function TaskEditForm({ task }: TaskEditFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof TaskUpdateSchema>>({
    resolver: zodResolver(TaskUpdateSchema),
    // TODO: currently if e.g. the date is not set in the defaultValues, the custom error message isnt being passed. change this behaviour
    defaultValues: {
      id: task.taskId,
      title: task.task.title,
      description: task.task.description,
      date: {
        from: task.task.dateFrom,
        to: task.task.dateTo,
      },
      userIds: task.task.users.map((user) => ({
        value: user.user.id,
        label: `${user.user.firstName} ${user.user.lastName}`,
      })),
    },
  })

  const onSubmit = (values: z.infer<typeof TaskUpdateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateTask(values)
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

  const { _users } = useUserContext()

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
            time
            disabled={isPending}
          />
          {/* TODO: add groups */}
          <FormSelectMultiple
            control={form.control}
            name='userIds'
            label='Mitarbeiter'
            options={_users}
            placeholder='Mitarbeiter auswählen'
            disabled={isPending}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className='flex justify-end space-x-3 pt-6'>
          <DialogClose />
          <FormSubmit className='w-min' title='Updaten' disabled={isPending} />
        </div>
      </form>
    </Form>
  )
}

export default TaskEditForm
