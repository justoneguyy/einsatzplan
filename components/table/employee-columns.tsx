'use client'
import { ColumnDef } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from '../ui/data-table-column-header'
import { InputType } from '@/actions/get-employee/types'
import { Employee } from '@prisma/client'

// TODO: set fixed/min width for the specific columns
export const EmployeeColumns: ColumnDef<Employee>[] = [
  // export const EmployeeColumns: ColumnDef<InputType>[] = [
  {
    header: 'Name',
    columns: [
      {
        accessorKey: 'firstName',
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Vorname' />
        ),
        enableHiding: false,
      },
      {
        accessorKey: 'lastName',
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
        header: ({ column }) => (
          <DataTableColumnHeaderAscDescReset column={column} title='Gruppen' />
        ),
      },
      {
        accessorKey: 'role',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Rolle' />
        ),
      },
    ],
  },
  {
    header: 'Sonstige Infos',
    columns: [
      {
        accessorKey: 'username',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Benutzername' />
        ),
      },
      {
        accessorKey: 'initials',
        header: ({ column }) => (
          <DataTableColumnHeaderHide column={column} title='Initialien' />
        ),
      },
    ],
  },
]
