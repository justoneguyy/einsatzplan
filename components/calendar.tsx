'use client'

import {
  getWeek,
  startOfWeek,
  endOfWeek,
  addWeeks,
  subWeeks,
  format,
} from 'date-fns'
import { de } from 'date-fns/locale'

import { useState } from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { weekDaysShort } from '@/_dev/mockdata/constants'

// TODO: maybe I should really add different calendar layouts
// TODO: add go to today button
// TODO: add indicator for year?

function CustomCaption({
  date,
  setDate,
  toggleTable,
}: {
  date: Date
  setDate: (date: Date) => void
  toggleTable: () => void
}) {
  const weekNumber = getWeek(date, { weekStartsOn: 1 })
  const startOfTheWeek = startOfWeek(date, { weekStartsOn: 1 })
  const endOfTheWeek = endOfWeek(date, { weekStartsOn: 1 })

  const nextWeek = () => setDate(addWeeks(date, 1))
  const previousWeek = () => setDate(subWeeks(date, 1))

  return (
    <div className='flex items-center justify-between gap-3'>
      <button
        onClick={previousWeek}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronLeftIcon className='h-4 w-4' />
      </button>
      <Button variant='outline' className='w-48' onClick={toggleTable}>
        {`KW ${weekNumber}, ${format(startOfTheWeek, 'dd.MM')} - ${format(endOfTheWeek, 'dd.MM')}`}
      </Button>
      <button
        onClick={nextWeek}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronRightIcon className='h-4 w-4' />
      </button>
    </div>
  )
}

function CustomHead() {
  const weekdays = weekDaysShort

  return (
    <div className='grid w-full grid-cols-8 gap-1'>
      <div className='col-start-1 w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground'>
        KW
      </div>
      {weekdays.map((weekday, i) => (
        <div
          key={i}
          className='col-start-auto w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground'
        >
          {weekday}
        </div>
      ))}
    </div>
  )
}

export function CalendarWeek({
  className,
  classNames,
  // mode = 'range',
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [date, setDate] = useState(new Date())
  const [showTable, setShowTable] = useState(false)

  const toggleTable = () => setShowTable(!showTable)

  const currentWeekStart = startOfWeek(date, { weekStartsOn: 1 })
  const currentWeekEnd = endOfWeek(date, { weekStartsOn: 1 })

  // TODO: add "Go to today" button
  // TODO: add dropdown (or any option to faster navigate)
  // TODO:highlight current week
  return (
    <DayPicker
      locale={de}
      ISOWeek={true}
      showOutsideDays={showOutsideDays}
      showWeekNumber={true}
      month={date}
      // onWeekNumberClick={}
      // selected={{ from: currentWeekStart, to: currentWeekEnd }}
      className={cn('w-[310px] p-3', className)}
      classNames={{
        month: 'space-y-4',
        table: showTable
          ? 'w-full border-collapse space-y-1 cursor-default'
          : 'hidden',
        head_row: 'grid grid-cols-8 gap-1 w-full',
        head_cell:
          'col-start-auto text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'grid grid-cols-8 gap-1 w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        weeknumber:
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground border-r-2',
        ...classNames,
      }}
      components={{
        Caption: () => (
          <CustomCaption
            date={date}
            setDate={setDate}
            toggleTable={toggleTable}
          />
        ),
        // TODO: maybe implement this later
        // Head: () => <CustomHead />,
      }}
      {...props}
    />
  )
}

function CalendarFull({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={de}
      showOutsideDays={showOutsideDays}
      // TODO: add weeknumbers?
      // TODO: add disabled / custom modifier which disables/higlights holidays
      className={cn('p-3', className)}
      classNames={{
        // TODO: search for better width handling
        // caption: 'hidden',
        caption: 'w-56 flex justify-center relative items-center',
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        // table: 'hidden',
        table: 'w-56 border-collapse space-y-1',
        head_row: 'flex',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
          props.mode === 'range'
            ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
            : '[&:has([aria-selected])]:rounded-md'
        ),
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
        ),
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_selected:
          'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
        day_today: 'bg-accent text-accent-foreground',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      components={{
        // Caption: CustomCaption,
        IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
      }}
      {...props}
    />
  )
}
CalendarFull.displayName = 'CalendarFull'

export { CalendarFull }
// 'use client'

// import {
//   getWeek,
//   startOfWeek,
//   endOfWeek,
//   addWeeks,
//   subWeeks,
//   format,
// } from 'date-fns'
// import { de } from 'date-fns/locale'

// import { useState } from 'react'

// import { Button, buttonVariants } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
// import { weekDaysShort } from '@/_dev/mockdata/constants'

// function CustomCaption({
//   date,
//   setDate,
//   toggleTable,
// }: {
//   date: Date
//   setDate: (date: Date) => void
//   toggleTable: () => void
// }) {
//   const weekNumber = getWeek(date, { weekStartsOn: 1 })
//   const startOfTheWeek = startOfWeek(date, { weekStartsOn: 1 })
//   const endOfTheWeek = endOfWeek(date, { weekStartsOn: 1 })

//   const nextWeek = () => setDate(addWeeks(date, 1))
//   const previousWeek = () => setDate(subWeeks(date, 1))

//   return (
//     <div className='flex items-center justify-between gap-3'>
//       <button
//         onClick={previousWeek}
//         className={cn(
//           buttonVariants({ variant: 'outline' }),
//           'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//         )}
//       >
//         <ChevronLeftIcon className='h-4 w-4' />
//       </button>
//       <Button variant='outline' className='w-48' onClick={toggleTable}>
//         {`KW ${weekNumber}, ${format(startOfTheWeek, 'dd.MM')} - ${format(endOfTheWeek, 'dd.MM')}`}
//       </Button>
//       <button
//         onClick={nextWeek}
//         className={cn(
//           buttonVariants({ variant: 'outline' }),
//           'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//         )}
//       >
//         <ChevronRightIcon className='h-4 w-4' />
//       </button>
//     </div>
//   )
// }

// function CustomHead() {
//   const weekdays = weekDaysShort

//   return (
//     <div className='grid w-full grid-cols-8 gap-1'>
//       <div className='col-start-1 w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground'>
//         KW
//       </div>
//       {weekdays.map((weekday, i) => (
//         <div
//           key={i}
//           className='col-start-auto w-8 rounded-md text-[0.8rem] font-normal text-muted-foreground'
//         >
//           {weekday}
//         </div>
//       ))}
//     </div>
//   )
// }

// export function CalendarWeek({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   const [date, setDate] = useState(new Date())
//   const [showTable, setShowTable] = useState(false)

//   const toggleTable = () => setShowTable(!showTable)

//   // TODO: add "Go to today" button
//   // TODO: add dropdown (or any option to faster navigate)
//   return (
//     <DayPicker
//       locale={de}
//       ISOWeek={true}
//       showOutsideDays={showOutsideDays}
//       showWeekNumber={true}
//       // onWeekNumberClick={}
//       className={cn('w-[310px] rounded-md border p-3 shadow', className)}
//       classNames={{
//         month: 'space-y-4',
//         table: showTable ? 'w-full border-collapse space-y-1' : 'hidden',
//         head_row: 'grid grid-cols-8 gap-1 w-full',
//         head_cell:
//           'col-start-auto text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
//         row: 'grid grid-cols-8 gap-1 w-full mt-2',
//         cell: cn(
//           'cursor-default relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
//           props.mode === 'range'
//             ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
//             : '[&:has([aria-selected])]:rounded-md'
//         ),
//         day: cn(
//           buttonVariants({ variant: 'ghost' }),
//           'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
//         ),
//         day_range_start: 'day-range-start',
//         day_range_end: 'day-range-end',
//         day_selected:
//           'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
//         day_today: 'bg-accent text-accent-foreground',
//         day_outside:
//           'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
//         day_disabled: 'text-muted-foreground opacity-50',
//         day_range_middle:
//           'aria-selected:bg-accent aria-selected:text-accent-foreground',
//         day_hidden: 'invisible',
//         weeknumber:
//           'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground border-r-2',
//         ...classNames,
//       }}
//       components={{
//         Caption: () => (
//           <CustomCaption
//             date={date}
//             setDate={setDate}
//             toggleTable={toggleTable}
//           />
//         ),
//         // TODO: maybe implement this later
//         // Head: () => <CustomHead />,
//       }}
//       {...props}
//     />
//   )
// }

// function CalendarFull({
//   className,
//   classNames,
//   showOutsideDays = true,
//   ...props
// }: CalendarProps) {
//   return (
//     <DayPicker
//       locale={de}
//       showOutsideDays={showOutsideDays}
//       // TODO: add weeknumbers?
//       // TODO: add disabled / custom modifier which disables/higlights holidays
//       className={cn('p-3', className)}
//       classNames={{
//         // TODO: search for better width handling
//         // caption: 'hidden',
//         caption: 'w-56 flex justify-center relative items-center',
//         months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
//         month: 'space-y-4',
//         caption_label: 'text-sm font-medium',
//         nav: 'space-x-1 flex items-center',
//         nav_button: cn(
//           buttonVariants({ variant: 'outline' }),
//           'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//         ),
//         nav_button_previous: 'absolute left-1',
//         nav_button_next: 'absolute right-1',
//         // table: 'hidden',
//         table: 'w-56 border-collapse space-y-1',
//         head_row: 'flex',
//         head_cell:
//           'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
//         row: 'flex w-full mt-2',
//         cell: cn(
//           'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md',
//           props.mode === 'range'
//             ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
//             : '[&:has([aria-selected])]:rounded-md'
//         ),
//         day: cn(
//           buttonVariants({ variant: 'ghost' }),
//           'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
//         ),
//         day_range_start: 'day-range-start',
//         day_range_end: 'day-range-end',
//         day_selected:
//           'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
//         day_today: 'bg-accent text-accent-foreground',
//         day_outside:
//           'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
//         day_disabled: 'text-muted-foreground opacity-50',
//         day_range_middle:
//           'aria-selected:bg-accent aria-selected:text-accent-foreground',
//         day_hidden: 'invisible',
//         ...classNames,
//       }}
//       components={{
//         // Caption: CustomCaption,
//         IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
//         IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
//       }}
//       {...props}
//     />
//   )
// }
// CalendarFull.displayName = 'CalendarFull'

// export { CalendarFull }
