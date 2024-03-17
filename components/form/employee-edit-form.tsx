'use client'

import { GroupsType } from '@/actions/get-group/types'
import { RolesType } from '@/actions/get-role/type'
import { useAction } from '@/lib/hooks/useAction'
import { ElementRef, useEffect, useRef, useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelect from './ui/form-select'
import { FormSubmit } from './ui/form-submit'
import FormSelectMultiple from './ui/form-select-multiple'
import { updateEmployee } from '@/actions/update-employee'
import { Employee, Group, Role } from '@prisma/client'
import { getRoles } from '@/actions/get-role'
import { getGroups } from '@/actions/get-group'

export interface EmployeeEditFormProps {
  employee: Employee
  // roles: RolesType
  // groups: GroupsType
  onCreate: () => void
  onCancel: () => void
}

// maybe change zod mode to insta check
function EmployeeEditForm({
  employee,
  onCreate,
  onCancel,
}: EmployeeEditFormProps) {
  const [firstName, setFirstName] = useState(employee.firstName)
  const [lastName, setLastName] = useState(employee.lastName)
  const [roleId, setRoleId] = useState(employee.roleId)

  // TODO: somehow call this from within the server.
  // const [roles, setRoles] = useState<Role[]>()
  // const [groups, setGroups] = useState<Group[]>()

  // useEffect(() => {
  //   getRoles().then((data) => setRoles(data))
  //   getGroups().then((data) => setGroups(data))
  // }, [])

  const { execute, fieldErrors } = useAction(updateEmployee, {
    onSuccess: (employee) => {
      CustomToast({
        title: `Mitarbeiter ${employee.firstName} ${employee.lastName} bearbeitet`,
        description: `Der Mitarbeiter ${employee.firstName} ${employee.lastName} wurde erfolgreich bearbeitet.`,
      })()
      onCreate()
      setFirstName(employee.firstName)
      setLastName(employee.lastName)
    },
    onError: (error) => {
      CustomToast({
        title: `Mitarbeiter konnte nicht bearbeitet werden`,
        description: error,
        duration: 15000,
      })()
    },
  })

  const formRef = useRef<ElementRef<'form'>>(null)
  const inputRef = useRef<ElementRef<'input'>>(null)
  const [isEditing, setIsEditing] = useState(false)

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
          errors={fieldErrors}
        />
        <FormInput
          id='lastName'
          defaultValue={lastName}
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
          defaultValue={roleId}
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
        <FormSubmit>Updaten</FormSubmit>
      </div>
    </form>
  )
}

export default EmployeeEditForm
