'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Weekdays, WeekdaysDE, weekdaysMapping } from '@/data/enums'
import { GetUserTaskType } from '@/actions/get-user/schema'
import { setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'
import { CellUser, CellWeekday } from './operationalPlan-table-cells'
import { HeaderWeekday, HeaderWeekend } from './operationalPlan-table-header'
import { TableColumnHeaderAscDescReset } from './ui/table-column-header'

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
export const OperationalPlanColumns: ColumnDef<GetUserTaskType>[] = [
  {
    accessorKey: 'firstName',
    header: ({ column }) => (
      // TODO: maybe change to sorting on click (no dropdown)
      <TableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
    ),
    cell: ({ row }) => {
      return (
        <CellUser
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
  // ...weekdays.map((day, index) => {
  //   const isWeekend =
  //     weekdays[index] === 'saturday' || weekdays[index] === 'sunday'
  //   return {
  //     accessorKey: weekdays[index],
  //     meta: weekdaysDE[index],
  //     header: isWeekend ? headerWeekend(index) : headerWeekday(index),
  //     cell: ({ row }: any) => (
  //       <CellWeekday tasks={row.original.tasks} index={index} />
  //     ),
  //     // TODO: save the state of this prop. (e.g. in localstorage)
  //     enableHiding: isWeekend,
  //   }
  ...Object.values(Weekdays).map((day, index) => {
    const isWeekend = day === Weekdays.Saturday || day === Weekdays.Sunday
    return {
      accessorKey: day,
      meta: weekdaysMapping[day],
      header: isWeekend ? headerWeekend(index) : headerWeekday(index),
      cell: ({ row }: any) => (
        <CellWeekday tasks={row.original.tasks} index={index} />
      ),
      enableHiding: isWeekend,
    }
  }),
]
