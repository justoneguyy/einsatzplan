'use client'

import { ColumnDef } from '@tanstack/react-table'

import { Weekdays, weekdaysMapping } from '@/data/enums'
import { UserTaskType } from '@/data/user/types'
import { setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'
import { CellUser, CellWeekday } from './operationalPlan-table-cells'
import { HeaderWeekday, HeaderWeekend } from './operationalPlan-table-header'
import { TableColumnHeaderAscDescReset } from './ui/table-column-header'
import { HolidayType } from '@/data/holiday/types'
import { SchoolHolidayType } from '@/data/schoolHoliday/types'

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

export type OperationalPlanType = UserTaskType &
  HolidayType &
  SchoolHolidayType & {}

// I need different Entity because of the holidays and school holidays.
export const OperationalPlanColumns: ColumnDef<UserTaskType>[] = [
  // TODO: set fixed/min width for the specific columns
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
  ...Object.values(Weekdays).map((day, index) => {
    const isWeekend = day === Weekdays.Saturday || day === Weekdays.Sunday
    return {
      accessorKey: day,
      meta: weekdaysMapping[day],
      header: isWeekend ? headerWeekend(index) : headerWeekday(index),
      cell: ({ row }: any) => (
        <CellWeekday tasks={row.original.tasks} index={index} />
      ),
      // TODO: save the state of this prop. (e.g. in localstorage)
      enableHiding: isWeekend,
    }
  }),
]
