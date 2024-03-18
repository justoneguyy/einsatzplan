'use client'

import { createEmployee } from '@/actions/create-employee'
import { GroupsType } from '@/actions/get-group/types'
import { RolesType } from '@/actions/get-role/type'
import { useAction } from '@/lib/hooks/useAction'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelect from './ui/form-select'
import { FormSubmit } from './ui/form-submit'
import FormSelectMultiple from './ui/form-select-multiple'
import {
  formatFirstName,
  formatLastName,
  generateInitials,
  generateUsername,
} from '@/lib/helper/format'

interface EmployeeCreateFormProps {
  roles: RolesType
  groups: GroupsType
  onCreate: () => void
  onCancel: () => void
}

// maybe change zod mode to insta check
function EmployeeCreateForm({
  roles,
  groups,
  onCreate,
  onCancel,
}: EmployeeCreateFormProps) {
  const [roleId, setRoleId] = useState('')
  const [groupIds, setGroupIds] = useState<string[]>([])

  const { execute, fieldErrors } = useAction(createEmployee, {
    onSuccess: (employee) => {
      CustomToast({
        title: `Mitarbeiter ${employee.firstName} ${employee.lastName} erstellt`,
        description: `Der Mitarbeiter ${employee.firstName} ${employee.lastName} wurde erfolgreich erstellt.`,
      })()
      onCreate()
    },
    onError: (error) => {
      CustomToast({
        title: `Mitarbeiter konnte nicht erstellt werden`,
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
      username,
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
          label='Vorname'
          type='text'
          autocomplete='given-name'
          errors={fieldErrors}
        />
        <FormInput
          id='lastName'
          label='Nachname'
          type='text'
          autocomplete='family-name'
          errors={fieldErrors}
        />
        <FormSelect
          id='roleId'
          label='Rolle'
          placeholder='Wähle eine Rolle aus'
          options={roles}
          value={roleId}
          onValueChange={setRoleId}
          errors={fieldErrors}
        />
        <FormSelectMultiple
          deleteButton
          id='groupId'
          name='groupId'
          label='Gruppe'
          placeholder='Wähle eine Gruppe aus'
          values={groupIds}
          onValuesChange={setGroupIds}
          options={groups}
          errors={fieldErrors}
        />
      </div>
      <div className='!mt-8 flex justify-end space-x-3'>
        <Button type='button' onClick={onCancel}>
          Abbrechen
        </Button>
        <FormSubmit>Anlegen</FormSubmit>
      </div>
    </form>
  )
}

export default EmployeeCreateForm
