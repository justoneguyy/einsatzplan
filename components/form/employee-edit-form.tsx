'use client'

import { GetEmployeeType } from '@/actions/get-employee/schema'
import { updateEmployee } from '@/actions/update-employee'
import { useAction } from '@/lib/hooks/useAction'
import { useGroupContext } from '@/lib/provider/group-provider'
import { useRoleContext } from '@/lib/provider/role-provider'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelect from './ui/form-select'
import { FormSubmit } from './ui/form-submit'
import FormSelectMultiple from './ui/form-select-multiple'

export interface EmployeeEditFormProps {
  employee: GetEmployeeType
  onCreate: () => void
  onCancel: () => void
}

// maybe change zod mode to insta check
// TODO: make this form more dynamic & sharable. e.g. this can be shared with employee-create-form
function EmployeeEditForm({
  employee,
  onCreate,
  onCancel,
}: EmployeeEditFormProps) {
  const firstName = employee.firstName
  const lastName = employee.lastName
  const [roleId, setRoleId] = useState(employee.roleId)
  const [groupIds, setGroupIds] = useState(
    employee.groups.map((group) => group.group.id)
  )

  const { _roles } = useRoleContext()
  const { _groups } = useGroupContext()

  const { execute, fieldErrors } = useAction(updateEmployee, {
    onSuccess: (employee) => {
      CustomToast({
        title: `Mitarbeiter ${employee.firstName} ${employee.lastName} bearbeitet`,
        description: `Der Mitarbeiter ${employee.firstName} ${employee.lastName} wurde erfolgreich bearbeitet.`,
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

    // TODO: add validation for a lastName which contains a space (e.g. if double lastName von user)

    const formattedFirstName =
      firstName.charAt(0).toUpperCase() + firstName.slice(1)
    const formattedLastName =
      lastName.charAt(0).toUpperCase() + lastName.slice(1)

    const username = firstName.toLowerCase() + '.' + lastName.toLowerCase()
    const initials = formattedFirstName.charAt(0) + formattedLastName.charAt(0)

    execute({
      id: employee.id,
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
          values={groupIds}
          onValuesChange={setGroupIds}
          options={_groups}
          errors={fieldErrors}
        />
      </div>
      <div className='!mt-8 flex justify-end space-x-3'>
        <Button type='button' onClick={onCancel}>
          Abbrechen
        </Button>
        <FormSubmit>Updaten</FormSubmit>
      </div>
    </form>
  )
}

export default EmployeeEditForm
