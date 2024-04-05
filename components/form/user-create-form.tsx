'use client'

import { createUser } from '@/actions/create-user'
import {
  formatFirstName,
  formatLastName,
  generateEmail,
  generateInitials,
} from '@/lib/helper/format'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'
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
import { UserSchema } from '@/data/user/schema'
import { RolesType } from '@/data/role/types'
import { GroupsType } from '@/data/group/types'

interface UserCreateFormProps {
  roles: RolesType
  groups: GroupsType
}

// maybe change zod mode to insta check
function UserCreateForm({ roles, groups }: UserCreateFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      initials: '',
      email: '',
      profilePicture: '',
      roleId: '',
      groupIds: [],
    },
  })

  const firstName = useWatch({
    control: form.control,
    name: 'firstName',
    defaultValue: '',
  })

  const lastName = useWatch({
    control: form.control,
    name: 'lastName',
    defaultValue: '',
  })

  useEffect(() => {
    if (firstName) {
      form.setValue('firstName', formatFirstName(firstName))
    }
    if (lastName) {
      form.setValue('lastName', formatLastName(lastName))
    }
  }, [firstName, lastName, form])

  useEffect(() => {
    form.setValue('email', generateEmail(firstName, lastName))
  }, [firstName, lastName, form])

  const onSubmit = (values: z.infer<typeof UserSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      const initials = generateInitials(values.firstName, values.lastName)
      const valuesWithInitials = { ...values, initials }

      createUser(valuesWithInitials)
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
          <FormInput
            control={form.control}
            className='w-full disabled:opacity-100'
            name='email'
            label='Email'
            placeholder='justin.hoffmann@uhlhorn.de'
            type='email'
            disabled
          />
          <FormSelect
            control={form.control}
            name='roleId'
            label='Rolle'
            placeholder='Rolle auswählen'
            options={roles}
            onValueChange={(value: string) => {
              form.setValue('roleId', value)
            }}
          />
          <FormSelectMultiple
            control={form.control}
            name='groupIds'
            label='Gruppen'
            options={groups}
            placeholder='Gruppen auswählen'
            disabled={isPending}
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

export default UserCreateForm
