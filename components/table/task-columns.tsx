'use client'

import { ColumnDef } from '@tanstack/react-table'

import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'
import { TasksType } from '@/actions/get-task/types'

// TODO: set fixed/min width for the specific columns
export const TaskColumns: ColumnDef<TasksType>[] = [
  // export const TaskColumns: ColumnDef<GetEmployeeTaskType, GetTaskType>[] = [
  {
    accessorKey: 'id',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    // cell: ({ row }) => {
    //   return (
    //     <CellEmployee
    //       firstName=
    //       lastName=
    //       initials=
    //       profilePicture=
    //     />
    //   )
    // },
    enableHiding: false,
    enableResizing: true,
    // TODO: change minSize (should only show the avatar (and the indicator) when <md)
    minSize: 200,
    maxSize: 250,
  },
  {
    accessorKey: 'monday',
    meta: 'Montag',
    header: 'Montag',
    // cell: ({ row }) => {
    //   return (
    //     <CellWeekday
    //       tasks={row.original.tasks.filter(
    //         (item) => item.task.dateFrom.getDay() === 1)}
    //     />
    //   )
    // },
    enableHiding: false,
  },
  {
    accessorKey: 'tueday',
    meta: 'Dienstag',
    header: 'Dienstag',
    enableHiding: false,
  },
  {
    accessorKey: 'wednesday',
    meta: 'Mittwoch',
    header: 'Mittwoch',
    enableHiding: false,
  },
  {
    accessorKey: 'thursday',
    meta: 'Donnerstag',
    header: 'Donnerstag',
    enableHiding: false,
  },
  {
    accessorKey: 'friday',
    meta: 'Freitag',
    header: 'Freitag',
    enableHiding: false,
  },
  {
    accessorKey: 'saturday',
    meta: 'Samstag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Samstag' />
    ),
  },
  {
    accessorKey: 'sunday',
    meta: 'Sonntag',
    header: ({ column }) => (
      <DataTableColumnHeaderHide column={column} title='Sonntag' />
    ),
  },
]
// 'use client'

// import { ColumnDef } from '@tanstack/react-table'

// import {
//   DataTableColumnHeaderAscDescReset,
//   DataTableColumnHeaderHide,
// } from './ui/data-table-column-header'

// // TODO: set fixed/min width for the specific columns
// export const TaskColumns: ColumnDef<??>[] = [
//   // export const TaskColumns: ColumnDef<GetEmployeeTaskType, GetTaskType>[] = [
//   {
//     accessorKey: 'id',
//     header: ({ column }) => (
//       // TODO: maybe change to sorting on click (no dropdown)
//       <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
//     ),
//     // cell: ({ row }) => {
//     //   return (
//     //     <CellEmployee
//     //       firstName={row.original.firstName}
//     //       lastName={row.original.lastName}
//     //       initials={row.original.initials}
//     //       profilePicture={row.original.profilePicture}
//     //     />
//     //   )
//     // },
//     enableHiding: false,
//     enableResizing: true,
//     // TODO: change minSize (should only show the avatar (and the indicator) when <md)
//     minSize: 200,
//     maxSize: 250,
//   },
//   {
//     accessorKey: 'monday',
//     meta: 'Montag',
//     header: 'Montag',
//     // cell: ({ row }) => {
//     //   return (
//     //     <CellWeekday
//     //       tasks={row.original.tasks.filter(
//     //         (item) => item.task.dateFrom.getDay() === 1)}
//     //     />
//     //   )
//     // },
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'tueday',
//     meta: 'Dienstag',
//     header: 'Dienstag',
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'wednesday',
//     meta: 'Mittwoch',
//     header: 'Mittwoch',
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'thursday',
//     meta: 'Donnerstag',
//     header: 'Donnerstag',
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'friday',
//     meta: 'Freitag',
//     header: 'Freitag',
//     enableHiding: false,
//   },
//   {
//     accessorKey: 'saturday',
//     meta: 'Samstag',
//     header: ({ column }) => (
//       <DataTableColumnHeaderHide column={column} title='Samstag' />
//     ),
//   },
//   {
//     accessorKey: 'sunday',
//     meta: 'Sonntag',
//     header: ({ column }) => (
//       <DataTableColumnHeaderHide column={column} title='Sonntag' />
//     ),
//   },
// ]
