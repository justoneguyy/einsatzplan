'use client'

import { deleteSicknessEntry } from '@/actions/delete-sicknessEntry'
import { DialogClose } from '@/components/dialog/ui/dialog-cancel'
import { FormError } from '@/components/form/ui/form-error'
import { FormSubmit } from '@/components/form/ui/form-submit'
import { FormSuccess } from '@/components/form/ui/form-success'
import { dialogClose } from '@/components/ui/dialog'
import { Form } from '@/components/ui/form'
import { SicknessEntryDeleteSchema } from '@/data/sicknessEntry/schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { SicknessEntry } from '@prisma/client'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'

interface SicknessEntryDeleteFormProps {
  sicknessEntry: SicknessEntry
}

// TODO: change to reusable component (e.g. share with user-delete-form)
function SicknessEntryDeleteForm({
  sicknessEntry,
}: SicknessEntryDeleteFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof SicknessEntryDeleteSchema>>({
    resolver: zodResolver(SicknessEntryDeleteSchema),
    defaultValues: {
      id: sicknessEntry.id,
    },
  })

  const onSubmit = (values: z.infer<typeof SicknessEntryDeleteSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      deleteSicknessEntry(values)
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

export default SicknessEntryDeleteForm
