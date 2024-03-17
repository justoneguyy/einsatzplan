'use client'

import { getRoles } from '@/actions/get-role'
import {
  DataTableRowActionsProps,
  EmployeeDataTableRowActions,
} from './employee-data-table-row-actions'
import { getGroups } from '@/actions/get-group'
import { useEffect, useState } from 'react'
import { Group, Role } from '@prisma/client'

interface EmployeeRowActionsCellProps
  extends Omit<DataTableRowActionsProps, 'roles' | 'groups'> {}

export function EmployeeRowActionsCell({
  employee,
  id,
  firstName,
  lastName,
}: EmployeeRowActionsCellProps) {
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
      <EmployeeDataTableRowActions
        employee={employee}
        id={id}
        firstName={firstName}
        lastName={lastName}
      />
    </div>
  )
}
