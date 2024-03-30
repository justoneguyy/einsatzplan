'use client'

import { getRoles } from '@/actions/get-role'
import {
  TableRowActionsProps,
  UserTableRowActions,
} from './user-table-row-actions'
import { getGroups } from '@/actions/get-group'
import { useEffect, useState } from 'react'
import { Group, Role } from '@prisma/client'

interface UserRowActionsCellProps
  extends Omit<TableRowActionsProps, 'roles' | 'groups'> {}

export function UserRowActionsCell({
  user,
  id,
  firstName,
  lastName,
}: UserRowActionsCellProps) {
  const [roles, setRoles] = useState<Role[] | null>(null)
  const [groups, setGroups] = useState<Group[] | null>(null)

  useEffect(() => {
    async function fetchData() {
      const fetchedRoles = await getRoles()
      const fetchedGroups = await getGroups()

      setRoles(fetchedRoles)
      setGroups(fetchedGroups)
    }

    fetchData()
  }, [])

  if (!roles || !groups) {
    return null // or a loading spinner
  }

  return (
    <div>
      <UserTableRowActions
        user={user}
        id={id}
        firstName={firstName}
        lastName={lastName}
      />
    </div>
  )
}
