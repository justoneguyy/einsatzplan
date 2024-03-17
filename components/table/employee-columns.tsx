'use client'
import { ColumnDef } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'
import { GetEmployeeType } from '@/actions/get-employee/schema'
import { EmployeeDataTableRowActions } from './employee-data-table-row-actions'
import { RolesType } from '@/actions/get-role/type'
import { GroupsType } from '@/actions/get-group/types'
import { EmployeeRowActionsCell } from './employee-cells'

interface EmployeeColumnProps {
  roles: RolesType
  groups: GroupsType
}

// TODO: set fixed/min width for the specific columns
export const EmployeeColumns: ColumnDef<GetEmployeeType>[] = [
  // add profilePicture?
  {
    header: 'Name',
    columns: [
      {
        accessorKey: 'firstName',
        meta: 'Vorname',
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Vorname' />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'lastName',
        meta: 'Nachname',
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Nachname' />
        ),
        enableHiding: false,
      },
    ],
    enableResizing: true,
  },
  {
    // might need to change this name
    header: 'Rechte',
    columns: [
      {
        accessorKey: 'groups',
        accessorFn: (row) => {
          return row.groups
            .map((employeeGroup) => employeeGroup.group.name)
            .join(' ')
        },
        meta: 'Gruppe',
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Gruppen' />
        ),
        cell: ({ row }) => {
          const groupNames = row.original.groups.map(
            (employeeGroup) => employeeGroup.group.name
          )

          return (
            <div className='flex w-[100px] items-center'>
              {groupNames.map((name, index) => (
                <span key={index}>{name}</span>
              ))}
            </div>
          )
        },
        filterFn: (row, id, value) => {
          return (row.getValue(id) as string).includes(value)
        },
      },
      {
        accessorKey: 'role',
        accessorFn: (row) => {
          return row.role.name
        },
        meta: 'Rolle',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Rolle' />
        ),
        cell: ({ row }) => {
          const roleName = row.original.role.name
          return (
            <div className='flex items-center'>
              <span>{roleName}</span>
            </div>
          )
        },
        filterFn: (row, id, value) => {
          return value.includes(row.getValue(id))
        },
      },
    ],
  },
  {
    header: 'Sonstige Infos',
    columns: [
      {
        accessorKey: 'username',
        meta: 'Benutzername',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Benutzername' />
        ),
      },
      {
        accessorKey: 'initials',
        meta: 'Initialien',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Initialien' />
        ),
        maxSize: 50,
      },
    ],
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        // <EmployeeRowActionsCell
        //   id={row.getValue('id')}
        //   employee={row.original}
        //   firstName={row.getValue('firstName')}
        //   lastName={row.getValue('lastName')}
        // />
        <EmployeeDataTableRowActions
          id={row.getValue('id')}
          employee={row.original}
          firstName={row.getValue('firstName')}
          lastName={row.getValue('lastName')}
        />
      )
    },
    maxSize: 50,
  },
]
