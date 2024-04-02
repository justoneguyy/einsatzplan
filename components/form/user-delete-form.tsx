'use client'

import { deleteUser } from '@/actions/delete-user'
import { GetUserType } from '@/actions/get-user/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { dialogClose } from '../ui/dialog'
import { toast } from 'sonner'
import { FormError } from './ui/form-error'
import { FormSuccess } from './ui/form-success'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { FormSubmit } from './ui/form-submit'
import { Form } from '../ui/form'
import { UserDeleteSchema } from '@/data/user/schema'

interface UserDeleteFormProps {
  user: GetUserType
}

function UserDeleteForm({ user }: UserDeleteFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UserDeleteSchema>>({
    resolver: zodResolver(UserDeleteSchema),
    defaultValues: {
      id: user.id,
    },
  })

  const onSubmit = (values: z.infer<typeof UserDeleteSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      deleteUser(values)
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

export default UserDeleteForm
