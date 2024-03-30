'use client'
import { ColumnDef } from '@tanstack/react-table'

import { GetUserType } from '@/actions/get-user/schema'
import {
  TableColumnHeaderAscDescReset,
  TableColumnHeaderHide,
} from './ui/table-column-header'

// TODO: set fixed/min width for the specific columns
export const UserColumns: ColumnDef<GetUserType>[] = [
  // add profilePicture?
  {
    header: 'Name',
    columns: [
      {
        accessorKey: 'firstName',
        meta: 'Vorname',
        header: ({ column }) => (
          <TableColumnHeaderAscDescReset column={column} title='Vorname' />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'lastName',
        meta: 'Nachname',
        header: ({ column }) => (
          <TableColumnHeaderAscDescReset column={column} title='Nachname' />
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
          return row.groups.map((userGroup) => userGroup.group.name).join(' ')
        },
        meta: 'Gruppe',
        // TODO: currently the groups are not sorted asc. when fixed, change it to below header
        // header: ({ column }) => (
        //   <TableColumnHeaderAscDescReset column={column} title='Gruppen' />
        // ),
        header: () => <span className='flex'>Gruppe</span>,
        cell: ({ row }) => {
          const groupNames = row.original.groups.map(
            (userGroup) => userGroup.group.name
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
          <TableColumnHeaderHide column={column} title='Rolle' />
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
          <TableColumnHeaderHide column={column} title='Benutzername' />
        ),
      },
      {
        accessorKey: 'email',
        meta: 'E-Mail',
        header: ({ column }) => (
          <TableColumnHeaderHide column={column} title='E-Mail' />
        ),
      },
      {
        accessorKey: 'initials',
        meta: 'Initialien',
        header: ({ column }) => (
          <TableColumnHeaderHide column={column} title='Initialien' />
        ),
        maxSize: 50,
      },
    ],
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      return (
        <User
          id={row.original.id}
          user={row.original}
          firstName={row.getValue('firstName')}
          lastName={row.getValue('lastName')}
        />
      )
    },
    maxSize: 50,
  },
]
