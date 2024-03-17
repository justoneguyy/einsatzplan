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

    // TODO: add validation for a lastName which contains a space (e.g. if double lastName von user)

    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1)

    const username = firstName.toLowerCase() + '.' + lastName.toLowerCase()
    const initials = formattedFirstName.charAt(0) + formattedLastName.charAt(0)

    console.log(formData)

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
          errors={fieldErrors}
        />
        <FormInput
          id='lastName'
          label='Nachname'
          type='text'
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
          id='groupId'
          name='groupId'
          label='Gruppe'
          placeholder='Wähle eine Gruppe aus'
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
