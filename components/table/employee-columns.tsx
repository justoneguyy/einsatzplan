'use client'
import { ColumnDef } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'
import { GetEmployeeType } from '@/actions/get-employee/schema'
import { EmployeeDataTableRowActions } from './employee-data-table-row-actions'

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
    header: 'Rechte',
    columns: [
      {
        accessorKey: 'groups',
        meta: 'Gruppe',
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Gruppen' />
        ),
        cell: ({ row }) => {
          return (
            <>
              {row.original.groups.map((employeeGroup) => (
                <div key={employeeGroup.id}>{employeeGroup.group.name}</div>
              ))}
            </>
          )
        },
      },
      {
        accessorKey: 'role',
        meta: 'Rolle',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Rolle' />
        ),
        cell: ({ row }) => {
          return (
            <div className=''>
              {/* {role.icon && <role.icon className='mr-2 h-4 w-4 text-muted-foreground' />} */}
              {row.original.role.name}
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
      },
    ],
  },
  {
    id: 'actions',
    cell: ({ row }) => (
      <EmployeeDataTableRowActions
        id={row.original.id}
        firstName={row.original.firstName}
        lastName={row.original.lastName}
      />
    ),
    maxSize: 50,
  },
]
