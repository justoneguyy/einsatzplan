'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DialogClose } from '@/components/dialog/ui/dialog-cancel'
import { dialogClose } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { FormError } from '@/components/form/ui/form-error'
import { FormSubmit } from '@/components/form/ui/form-submit'
import { FormSuccess } from '@/components/form/ui/form-success'
import { Vacation } from '@prisma/client'
import { VacationDeleteSchema } from '@/data/vacation/schema'
import { deleteVaction } from '@/actions/delete-vacation'

interface VacationDeleteFormProps {
  vacation: Vacation
}

// TODO: change to reusable component (e.g. share with user-delete-form)
function VacationDeleteForm({ vacation }: VacationDeleteFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof VacationDeleteSchema>>({
    resolver: zodResolver(VacationDeleteSchema),
    defaultValues: {
      id: vacation.id,
    },
  })

  const onSubmit = (values: z.infer<typeof VacationDeleteSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      deleteVaction(values)
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

export default VacationDeleteForm
