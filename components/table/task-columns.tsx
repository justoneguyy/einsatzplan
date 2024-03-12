'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Task } from './data/schema'
import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from '../ui/data-table-column-header'
import { CellEmployee, CellWeekday } from './task-cells'

// TODO: set fixed/min width for the specific columns
export const TaskColumns: ColumnDef<Task>[] = [
  {
    accessorKey: 'assignedEmployeeName',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    cell: ({ row }) => {
      return (
        // TOOD: in real db change this to e.g.
        <CellEmployee
          assignedEmployeeName={row.getValue('assignedEmployeeName')}
          // onCall={row.getValue('onCall')}
        />
      )
    },
    enableHiding: false,
    enableResizing: true,
    // TODO: change minSize (should only show the avatar (and the indicator) when <md)
    minSize: 150,
    maxSize: 250,
  },
  // ger names because I can only seem to access the column.accessorKey in view-options
  {
    accessorKey: 'montag',
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
    header: 'Dienstag',
    enableHiding: false,
  },
  {
    accessorKey: 'mittwoch',
    header: 'Mittwoch',
    enableHiding: false,
  },
  {
    accessorKey: 'donnerstag',
    header: 'Donnerstag',
    enableHiding: false,
  },
  {
    accessorKey: 'freitag',
    header: 'Freitag',
    enableHiding: false,
  },
  {
    accessorKey: 'samstag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Samstag' />
    ),
  },
  {
    accessorKey: 'sonntag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Sonntag' />
    ),
  },
]
