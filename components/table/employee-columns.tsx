'use client'
import { ColumnDef } from '@tanstack/react-table'

import { GetEmployeeType } from '@/actions/get-employee/schema'
import { EmployeeDataTableRowActions } from './employee-data-table-row-actions'
import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'

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
        // TODO: currently the groups are not sorted asc. when fixed, change it to below header
        // header: ({ column }) => (
        //   <DataTableColumnHeaderAscDescReset column={column} title='Gruppen' />
        // ),
        header: () => <span className='flex'>Gruppe</span>,
        cell: ({ row }) => {
          const groupNames = row.original.groups.map(
            (employeeGroup) => employeeGroup.group.name
          )

          // TODO: refine/style this
          return (
            <div className='flex flex-col'>
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
        accessorKey: 'email',
        meta: 'E-Mail',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='E-Mail' />
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
        <EmployeeDataTableRowActions
          id={row.original.id}
          employee={row.original}
          firstName={row.getValue('firstName')}
          lastName={row.getValue('lastName')}
        />
      )
    },
    maxSize: 50,
  },
]
