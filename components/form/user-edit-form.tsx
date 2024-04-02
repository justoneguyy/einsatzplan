'use client'

import { generateEmail, generateInitials } from '@/lib/helper/format'
import { useGroupContext } from '@/lib/provider/group-provider'
import { useRoleContext } from '@/lib/provider/role-provider'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { dialogClose } from '../ui/dialog'
import { Form } from '../ui/form'
import { FormError } from './ui/form-error'
import { FormInput } from './ui/form-input'
import { FormSelect } from './ui/form-select'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'
import { updateUser } from '@/actions/update-user'
import { UserType } from '@/actions/get-user/types'
import { UserUpdateSchema } from '@/data/user/schema'

interface UserEditFormProps {
  user: UserType
}

function UserEditForm({ user }: UserEditFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const { _roles } = useRoleContext()
  const { _groups } = useGroupContext()

  const form = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      initials: user.initials,
      email: user.email,
      profilePicture: user.profilePicture,
      roleId: user.roleId,
      groupIds: user.groups.map((group) => ({
        value: group.group.id,
        label: group.group.name,
      })),
    },
  })

  const onSubmit = (values: z.infer<typeof UserUpdateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      const initials = generateInitials(values.firstName, values.lastName)
      const email = generateEmail(values.firstName, values.lastName)
      const values_ = { ...values, initials, email }

      updateUser(values_)
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
        <div className='space-y-4'>
          <FormInput
            control={form.control}
            name='firstName'
            label='Vorname'
            placeholder='Justin'
          />
          <FormInput
            control={form.control}
            name='lastName'
            label='Nachname'
            placeholder='Hoffmann'
          />
          <FormSelect
            control={form.control}
            name='roleId'
            label='Rolle'
            placeholder='Rolle auswählen'
            options={_roles}
            onValueChange={(value: string) => {
              form.setValue('roleId', value)
            }}
          />
          <FormSelectMultiple
            control={form.control}
            name='groupIds'
            label='Gruppen'
            options={_groups}
            placeholder='Gruppen auswählen'
            disabled={isPending}
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

export default UserEditForm
