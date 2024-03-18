'use client'

import { ColumnDef } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'
import { CellEmployee, CellWeekday } from './task-cells'
import { Task } from '@prisma/client'
import { TasksType } from '@/actions/get-task/types'

// TODO: set fixed/min width for the specific columns
export const TaskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'employees',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    // cell: ({ row }) => {
    //   return <CellEmployee assignedEmployeeName={row.getValue('')} />
    // },
    enableHiding: false,
    enableResizing: true,
    // TODO: change minSize (should only show the avatar (and the indicator) when <md)
    minSize: 150,
    maxSize: 250,
  },
  {
    accessorKey: 'montag',
    meta: 'Montag',
    header: 'Montag',
    cell: ({ row }) => {
      return (
        <CellWeekday id={row.getValue('id')} title={row.getValue('title')} />
      )
    },
    enableHiding: false,
  },
  {
    accessorKey: 'dienstag',
    meta: 'Dienstag',
    header: 'Dienstag',
    enableHiding: false,
  },
  {
    accessorKey: 'mittwoch',
    meta: 'Mittwoch',
    header: 'Mittwoch',
    enableHiding: false,
  },
  {
    accessorKey: 'donnerstag',
    meta: 'Donnerstag',
    header: 'Donnerstag',
    enableHiding: false,
  },
  {
    accessorKey: 'freitag',
    meta: 'Freitag',
    header: 'Freitag',
    enableHiding: false,
  },
  {
    accessorKey: 'samstag',
    meta: 'Samstag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Samstag' />
    ),
  },
  {
    accessorKey: 'sonntag',
    meta: 'Sonntag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Sonntag' />
    ),
  },
]
