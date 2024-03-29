'use client'

import { ColumnDef } from '@tanstack/react-table'

import { GetEmployeeTaskType } from '@/actions/get-employee/schema'
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  setDefaultOptions,
  startOfWeek,
} from 'date-fns'
import { de } from 'date-fns/locale'
import { CellEmployee, CellWeekday } from './task-cells'
import {
  DataTableColumnHeaderAscDescReset,
  DataTableColumnHeaderHide,
} from './ui/data-table-column-header'
import { weekdays, weekdaysDE } from '@/_dev/mockdata/constants'
import { HeaderWeekday, HeaderWeekend } from './task-header'
import { DayContent } from 'react-day-picker'

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
    accessorKey: 'id',
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
  // ...daysOfWeek.map((day, index) => {
  //   const formattedDay = format(day, 'EEEE, dd.MM.yyyy')
  //   const isWeekend =
  //     weekdaysDE[index] === 'Samstag' || weekdaysDE[index] === 'Sonntag'
  //   return {
  //     accessorKey: weekdays[index],
  //     meta: weekdaysDE[index],
  //     header: isWeekend ? headerWeekend(formattedDay) : formattedDay,
  //     cell: ({ row }: any) => (
  //       <CellWeekday tasks={row.original.tasks} day={day} />
  //     ),
  //     enableHiding: isWeekend,
  //   }
  // }),
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

  // {
  //   accessorKey: 'monday',
  //   meta: 'Montag',
  //   header: format(daysOfWeek[0], 'EEEE, dd.MM.yyyy'),
  //   cell: ({ row }) => {
  //     // const tasksForTheDay = row.original.tasks.filter((task) => {
  //     //   return (
  //     //     daysOfWeek[0] >= task.task.dateFrom &&
  //     //     daysOfWeek[0] <= task.task.dateTil
  //     //   )
  //     // })
  //     // return <CellWeekday tasks={tasksForTheDay} />
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'tuesday',
  //   meta: 'Dienstag',
  //   header: format(daysOfWeek[1], 'EEEE, dd.MM.yyyy'),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'wednesday',
  //   meta: 'Mittwoch',
  //   header: format(daysOfWeek[2], 'EEEE, dd.MM.yyyy'),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'thursday',
  //   meta: 'Donnerstag',
  //   header: format(daysOfWeek[3], 'EEEE, dd.MM.yyyy'),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'friday',
  //   meta: 'Freitag',
  //   header: format(daysOfWeek[4], 'EEEE, dd.MM.yyyy'),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  //   enableHiding: false,
  // },
  // {
  //   accessorKey: 'saturday',
  //   meta: 'Samstag',
  //   header: ({ column }) => (
  //     <DataTableColumnHeaderHide
  //       column={column}
  //       title={format(daysOfWeek[5], 'EEEE, dd.MM.yyyy')}
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  // },
  // {
  //   accessorKey: 'sunday',
  //   meta: 'Sonntag',
  //   header: ({ column }) => (
  //     <DataTableColumnHeaderHide
  //       column={column}
  //       title={format(daysOfWeek[6], 'EEEE, dd.MM.yyyy')}
  //     />
  //   ),
  //   cell: ({ row }) => {
  //     return <CellWeekday tasks={row.original.tasks} />
  //   },
  // },
]
// 'use client'

// import { ColumnDef } from '@tanstack/react-table'

// import { GetEmployeeTaskType } from '@/actions/get-employee/schema'
// import { CellEmployee, CellWeekday } from './task-cells'
// import {
//   DataTableColumnHeaderAscDescReset,
//   DataTableColumnHeaderHide,
// } from './ui/data-table-column-header'
// import {
//   eachDayOfInterval,
//   endOfWeek,
//   format,
//   setDefaultOptions,
//   startOfWeek,
// } from 'date-fns'
// import { de } from 'date-fns/locale'
// import { weekdays, weekdaysDE } from '@/_dev/mockdata/constants'

// setDefaultOptions({
//   locale: de,
//   weekStartsOn: 1,
// })

// const now = new Date()
// const start = startOfWeek(now)
// const end = endOfWeek(now)

// const weekInterval = { start, end }
// const daysOfWeek = eachDayOfInterval(weekInterval)

// const headerWeekend = (title: string) => {
//   return ({ column }: any) => (
//     <DataTableColumnHeaderHide column={column} title={title} />
//   )
// }

// // TODO: set fixed/min width for the specific columns
// export const TaskColumns: ColumnDef<GetEmployeeTaskType>[] = [
//   {
//     accessorKey: 'id',
//     header: ({ column }) => (
//       // TODO: maybe change to sorting on click (no dropdown)
//       <DataTableColumnHeaderAscDescReset column={column} title='Mitarbeiter' />
//     ),
//     cell: ({ row }) => {
//       return (
//         <CellEmployee
//           firstName={row.original.firstName}
//           lastName={row.original.lastName}
//           initials={row.original.initials}
//           profilePicture={row.original.profilePicture}
//         />
//       )
//     },
//     enableHiding: false,
//     enableResizing: true,
//     // TODO: change minSize (should only show the avatar (and the indicator) when <md)
//     minSize: 200,
//     maxSize: 250,
//   },
//   ...daysOfWeek.map((day, index) => {
//     const formattedDay = format(day, 'EEEE, dd.MM.yyyy')
//     const isWeekend =
//       weekdaysDE[index] === 'Samstag' || weekdaysDE[index] === 'Sonntag'
//     return {
//       accessorKey: weekdays[index],
//       meta: weekdaysDE[index],
//       header: isWeekend ? headerWeekend(formattedDay) : formattedDay,
//       // cell: ({ row }: any) => <CellWeekday tasks={row.original.tasks} />,
//       cell: ({ row }: any) => {
//         const tasksForTheDay = row.original.tasks.filter((task: any) => {
//           return day >= task.task.dateFrom && day <= task.task.dateTil
//         })
//         return <CellWeekday tasks={tasksForTheDay} />
//       },
//       enableHiding: isWeekend,
//     }
//   }),
//   // {
//   //   accessorKey: 'monday',
//   //   meta: 'Montag',
//   //   header: format(daysOfWeek[0], 'EEEE, dd.MM.yyyy'),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[0] >= task.task.dateFrom &&
//   //         daysOfWeek[0] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: 'tuesday',
//   //   meta: 'Dienstag',
//   //   header: format(daysOfWeek[1], 'EEEE, dd.MM.yyyy'),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[1] >= task.task.dateFrom &&
//   //         daysOfWeek[1] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: 'wednesday',
//   //   meta: 'Mittwoch',
//   //   header: format(daysOfWeek[2], 'EEEE, dd.MM.yyyy'),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[2] >= task.task.dateFrom &&
//   //         daysOfWeek[2] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: 'thursday',
//   //   meta: 'Donnerstag',
//   //   header: format(daysOfWeek[3], 'EEEE, dd.MM.yyyy'),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[3] >= task.task.dateFrom &&
//   //         daysOfWeek[3] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: 'friday',
//   //   meta: 'Freitag',
//   //   header: format(daysOfWeek[4], 'EEEE, dd.MM.yyyy'),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[4] >= task.task.dateFrom &&
//   //         daysOfWeek[4] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   //   enableHiding: false,
//   // },
//   // {
//   //   accessorKey: 'saturday',
//   //   meta: 'Samstag',
//   //   header: ({ column }) => (
//   //     <DataTableColumnHeaderHide
//   //       column={column}
//   //       title={format(daysOfWeek[5], 'EEEE, dd.MM.yyyy')}
//   //     />
//   //   ),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[5] >= task.task.dateFrom &&
//   //         daysOfWeek[5] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   // },
//   // {
//   //   accessorKey: 'sunday',
//   //   meta: 'Sonntag',
//   //   header: ({ column }) => (
//   //     <DataTableColumnHeaderHide
//   //       column={column}
//   //       title={format(daysOfWeek[6], 'EEEE, dd.MM.yyyy')}
//   //     />
//   //   ),
//   //   cell: ({ row }) => {
//   //     const tasksForTheDay = row.original.tasks.filter((task) => {
//   //       return (
//   //         daysOfWeek[6] >= task.task.dateFrom &&
//   //         daysOfWeek[6] <= task.task.dateTil
//   //       )
//   //     })
//   //     return <CellWeekday tasks={tasksForTheDay} />
//   //   },
//   // },
// ]
