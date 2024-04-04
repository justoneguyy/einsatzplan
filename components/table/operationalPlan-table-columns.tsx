'use client'

import { ColumnDef } from '@tanstack/react-table'

import { OperationalPlanDataType } from '@/actions/aggregate-operationalPlan-data'
import { Weekdays, weekdaysMapping } from '@/data/enums'
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

// I need different Entity because of the holidays and school holidays.
export const OperationalPlanColumns: ColumnDef<OperationalPlanDataType>[] = [
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
          groups={row.original.groups}
          onCallServices={row.original.onCallServices}
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
        <CellWeekday
          index={index}
          rowIndex={row.index}
          tasks={row.original.tasks}
          holidays={row.original.holidays}
          schoolHolidays={row.original.schoolHolidays}
        />
      ),
      // TODO: save the state of this prop. (e.g. in localstorage)
      enableHiding: isWeekend,
    }
  }),
  // ...Object.values(Weekdays).map((day, index) => {
  //   const isWeekend = day === Weekdays.Saturday || day === Weekdays.Sunday
  //   return {
  //     accessorKey: day,
  //     meta: weekdaysMapping[day],
  //     header: isWeekend ? headerWeekend(index) : headerWeekday(index),
  //     cell: ({ row }: any) => (
  //       <CellWeekday
  //         index={index}
  //         tasks={row.original.tasks}
  //         holidays={row.original.holidays}
  //         schoolHolidays={row.original.schoolHolidays}
  //       />
  //     ),
  //     // TODO: save the state of this prop. (e.g. in localstorage)
  //     enableHiding: isWeekend,
  //   }
  // }),
  // TODO: prob rather use this (then we can properly use custom headers with passing the column which is needed to e.g. hide the column)
  // {
  //   accessorKey: Weekdays.Monday,
  //   meta: weekdaysMapping[Weekdays.Monday],
  //   header: headerWeekday(0),
  //   cell: ({ row }: any) => (
  //     <CellWeekday tasks={row.original.tasks} index={0} />
  //   ),
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: Weekdays.Tuesday,
  //   meta: weekdaysMapping[Weekdays.Tuesday],
  //   header: headerWeekday(1),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={1} />,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: Weekdays.Wednesday,
  //   meta: weekdaysMapping[Weekdays.Wednesday],
  //   header: headerWeekday(2),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={2} />,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: Weekdays.Thursday,
  //   meta: weekdaysMapping[Weekdays.Thursday],
  //   header: headerWeekday(3),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={3} />,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: Weekdays.Friday,
  //   meta: weekdaysMapping[Weekdays.Friday],
  //   header: headerWeekday(4),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={4} />,
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: Weekdays.Saturday,
  //   meta: weekdaysMapping[Weekdays.Saturday],
  //   header: headerWeekend(5),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={5} />,
  //   enableHiding: true,
  // },
  // {
  //   accessorKey: Weekdays.Sunday,
  //   meta: weekdaysMapping[Weekdays.Sunday],
  //   header: headerWeekend(6),
  //   cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} index={6} />,
  //   enableHiding: true,
  // },
]
