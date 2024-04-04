'use client'

import { deleteTask } from '@/actions/delete-task'
import { TaskDeleteSchema } from '@/data/task/schema'
import { UserTaskType } from '@/data/user/types'
import { UnwrapArray } from '@/lib/types'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { dialogClose } from '../ui/dialog'
import { Form } from '../ui/form'
import { FormError } from './ui/form-error'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'

interface TaskDeleteFormProps {
  task: UnwrapArray<UserTaskType['tasks']>
}

// TODO: change to reusable component (e.g. share with user-delete-form)
function TaskDeleteForm({ task }: TaskDeleteFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof TaskDeleteSchema>>({
    resolver: zodResolver(TaskDeleteSchema),
    defaultValues: {
      id: task.taskId,
    },
  })

  const onSubmit = (values: z.infer<typeof TaskDeleteSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      deleteTask(values)
        .then((data) => {
          if (data?.error) {
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
        <div className='space-y-4'></div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className='flex justify-end space-x-3'>
          <DialogClose />
          <FormSubmit
            className='w-min'
            title='Bestaetigen'
            disabled={isPending}
          />
        </div>
      </form>
    </Form>
  )
}

export default TaskDeleteForm
