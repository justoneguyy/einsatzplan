'use client'

import { GetUserType } from '@/actions/get-user/schema'
import { updateUser } from '@/actions/update-user'
import { useAction } from '@/lib/hooks/useAction'
import { useGroupContext } from '@/lib/provider/group-provider'
import { useRoleContext } from '@/lib/provider/role-provider'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toast'
import { FormInput } from './ui_alt/form-input'
import FormSelect from './ui_alt/form-select'
import { FormSubmit } from './ui_alt/form-submit'
import FormSelectMultiple from './ui_alt/form-select-multiple'
import {
  formatFirstName,
  formatLastName,
  generateInitials,
  generateUsername,
} from '@/lib/helper/format'
import { DialogClose } from '../dialog/ui/dialog-cancel'

export interface UserEditFormProps {
  user: GetUserType
  onCreate: () => void
}

// maybe change zod mode to insta check
// TODO: make this form more dynamic & sharable. e.g. this can be shared with user-create-form
function UserEditForm({ user, onCreate }: UserEditFormProps) {
  const firstName = user.firstName
  const lastName = user.lastName
  const [roleId, setRoleId] = useState(user.roleId)
  const [groupIds, setGroupIds] = useState(
    user.groups.map((group) => group.group.id)
  )

  const { _roles } = useRoleContext()
  const { _groups } = useGroupContext()

  const { execute, fieldErrors } = useAction(updateUser, {
    onSuccess: (user) => {
      CustomToast({
        title: `Mitarbeiter ${user.firstName} ${user.lastName} bearbeitet`,
        description: `Der Mitarbeiter ${user.firstName} ${user.lastName} wurde erfolgreich bearbeitet.`,
      })()
      onCreate()
    },
    onError: (error) => {
      CustomToast({
        title: `Mitarbeiter konnte nicht bearbeitet werden`,
        description: error,
        duration: 15000,
      })()
    },
  })

  // TODO: consider using entries method: https://developer.mozilla.org/en-US/docs/Web/API/FormData/entries
  const onSubmit = (formData: FormData) => {
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const roleId = formData.get('roleId') as string
    const formGroupIds = formData.getAll('groupId') as string[]

    const formattedFirstName = formatFirstName(firstName)
    const formattedLastName = formatLastName(lastName)
    const username = generateUsername(firstName, lastName)
    const initials = generateInitials(formattedFirstName, formattedLastName)

    execute({
      id: user.id,
      firstName: formattedFirstName,
      lastName: formattedLastName,
      initials,
      roleId,
      groupIds: formGroupIds,
    })
  }

  return (
    <form action={onSubmit} className='space-y-4'>
      <div className='flex flex-col space-y-2'>
        <FormInput
          id='firstName'
          defaultValue={firstName}
          label='Vorname'
          type='text'
          autocomplete='given-name'
          errors={fieldErrors}
        />
        <FormInput
          id='lastName'
          defaultValue={lastName}
          label='Nachname'
          type='text'
          autocomplete='family-name'
          errors={fieldErrors}
        />
        <FormSelect
          id='roleId'
          label='Rolle'
          placeholder='Wähle eine Rolle aus'
          options={_roles}
          value={roleId}
          defaultValue={roleId}
          onValueChange={setRoleId}
          errors={fieldErrors}
        />
        <FormSelectMultiple
          deleteButton
          id='groupId'
          name='groupId'
          label='Gruppe'
          placeholder='Wähle eine Gruppe aus'
          options={_groups}
          values={groupIds}
          onValuesChange={setGroupIds}
          errors={fieldErrors}
        />
      </div>
      <div className='!mt-8 flex justify-end space-x-3'>
        <DialogClose />
        <FormSubmit>Updaten</FormSubmit>
      </div>
    </form>
  )
}

export default UserEditForm
