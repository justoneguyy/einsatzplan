'use client'

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'

import { ColumnDef, IdIdentifier } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './data-table-column-header'
import { Task } from '../data/schema'
import { Indicator } from '@/components/ui/indicator'

type ResizableColumnDef<T extends Record<string, unknown>> = ColumnDef<T> & {
  resizableGroup?: string
}

// TODO: set fixed/min width for the specific columns
export const columns: ResizableColumnDef<Task>[] = [
  {
    accessorKey: 'assignedEmployeeName',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    enableHiding: false,
    enableResizing: true,
    // TODO: change minSize (should only show the avatar (and the indicator) when <md)
    minSize: 180,
    maxSize: 200,
  },
  // ger names because I can only seem to access the column.accessorKey in view-options
  {
    accessorKey: 'montag',
    header: 'Montag',
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
