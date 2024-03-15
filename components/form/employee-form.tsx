'use client'

import { createEmployee } from '@/actions/create-employee'
import { useAction } from '@/lib/hooks/useAction'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { toast } from 'sonner'

function EmployeeForm({ roles, groups }: { roles: any[]; groups: any[] }) {
  const router = useRouter()

  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [initials, setInitials] = useState('')
  const [profilePicture, setProfilePicture] = useState('')
  const [roleId, setRoleId] = useState('')
  const [groupId, setGroupId] = useState('')

  const { execute, fieldErrors } = useAction(createEmployee, {
    onSuccess: () => {
      // TODO: make toast clickable so it goes away
      toast('Mitarbeiter erstellt', {
        description: 'Der Mitarbeiter wurde erfolgreich erstellt.',
        duration: 5000,
      })
      router.push('/settings/employee-administration')
    },
    onError: (error) => {
      toast('Der Mitarbeiter konnte nicht erstellt werden', {
        description: error,
        duration: 5000,
      })
    },
  })

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault() // Prevent the form from submitting normally
    const formData = new FormData(event.currentTarget)

    const username = formData.get('username') as string
    const firstName = formData.get('firstName') as string
    const lastName = formData.get('lastName') as string
    const initials = formData.get('initials') as string
    const profilePicture = formData.get('profilePicture') as string
    const roleId = formData.get('roleId') as string
    const groupId = formData.get('groupId') as string

    console.log(formData)

    execute({
      username,
      firstName,
      lastName,
      initials,
      profilePicture,
      roleId,
      groupId,
    })
  }

  return (
    <form onSubmit={onSubmit}>
      <div className='flex flex-col space-y-2'>
        <label>
          Username:
          <input
            name='username'
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label>
          First Name:
          <input
            name='firstName'
            type='text'
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </label>
        <label>
          Last Name:
          <input
            name='lastName'
            type='text'
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </label>
        <label>
          Initials:
          <input
            name='initials'
            type='text'
            value={initials}
            onChange={(e) => setInitials(e.target.value)}
          />
        </label>
        <label>
          Profile Picture:
          <input
            name='profilePicture'
            type='text'
            value={profilePicture}
            onChange={(e) => setProfilePicture(e.target.value)}
          />
        </label>
        <label>
          Role:
          <select
            name='roleId'
            value={roleId}
            onChange={(e) => setRoleId(e.target.value)}
          >
            {roles.map((role) => (
              <option key={role.id} value={role.id}>
                {role.name}
              </option>
            ))}
          </select>
        </label>
        <label>
          Group:
          <select
            name='groupId'
            value={groupId}
            onChange={(e) => setGroupId(e.target.value)}
          >
            {groups.map((group) => (
              <option key={group.id} value={group.id}>
                {group.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      <button type='submit'>Create Employee</button>
    </form>
  )
}

export default EmployeeForm
