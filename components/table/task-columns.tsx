'use client'

import { ColumnDef } from '@tanstack/react-table'

import { weekdays, weekdaysDE } from '@/_dev/mockdata/constants'
import { GetEmployeeTaskType } from '@/actions/get-employee/schema'
import { setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'
import { CellEmployee, CellWeekday } from './task-cells'
import { HeaderWeekday, HeaderWeekend } from './task-header'
import { DataTableColumnHeaderAscDescReset } from './ui/data-table-column-header'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

const headerWeekday = (index: number) => {
  return () => <HeaderWeekday index={index} />
}

const headerWeekend = (index: number) => {
  return () => <HeaderWeekend index={index} />
}

// TODO: set fixed/min width for the specific columns
export const TaskColumns: ColumnDef<GetEmployeeTaskType>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    cell: ({ row }) => {
      return (
        <CellEmployee
          firstName={row.original.firstName}
          lastName={row.original.lastName}
          initials={row.original.initials}
          profilePicture={row.original.profilePicture}
        />
      )
    },
    enableHiding: false,
    enableResizing: true,
    // TODO: change minSize (should only show the avatar (and the indicator) when <md)
    minSize: 200,
    maxSize: 250,
  },
  ...weekdays.map((day, index) => {
    const isWeekend =
      weekdays[index] === 'saturday' || weekdays[index] === 'sunday'
    return {
      accessorKey: weekdays[index],
      meta: weekdaysDE[index],
      header: isWeekend ? headerWeekend(index) : headerWeekday(index),
      cell: ({ row }: any) => (
        <CellWeekday tasks={row.original.tasks} index={index} />
      ),
      enableHiding: isWeekend,
    }
  }),
]
