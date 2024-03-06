'use client'

import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'
import { DateRange, DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/ui/button'
import { de } from 'date-fns/locale'
import { Select } from './select'

// function CustomDropdown({ children, ...props }) {
//   return (
//     <Select onValueChange={field.onChange} defaultValue={field.value}>
//     <FormControl>
//       <SelectTrigger>
//         <SelectValue placeholder='Wähle eine verifizierte E-Mail aus.' />
//       </SelectTrigger>
//     </FormControl>
//     <SelectContent>
//       <SelectItem value='m@example.com'>m@example.com</SelectItem>
//       <SelectItem value='m@google.com'>m@google.com</SelectItem>
//       <SelectItem value='m@support.com'>m@support.com</SelectItem>
//     </SelectContent>
//   </Select>
//   )
// }

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      locale={de}
      ISOWeek={true}
      showOutsideDays={showOutsideDays}
      className={cn('p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        vhidden: 'hidden', // hides the month and year label beside the dropdowns
        caption_dropdowns: 'flex space-x-1',
        dropdown: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 px-1 py-0 bg-background',
          '*:bg-background' // idk how to access other props than background and text of the option elements inside the dropdown menu. will stay like this for now
        ),
        dropdown_month: 'text-sm font-medium',
        dropdown_year: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        ),
        nav_button_previous: 'absolute left-1',
        nav_button_next: 'absolute right-1',
        table: 'w-full border-collapse space-y-1',
        head_row: 'flex ml-2',
        head_cell:
          'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
        row: 'flex w-full mt-2 group',
        cell: cn(
          'relative p-0 text-center text-sm focus-within:relative focus-within:z-20 cursor-pointer',
          '[&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/70'
          // '[&:has([aria-selected].day-today)]:bg-primary/50 [&:has([aria-selected].day-today)]:text-primary-foreground/80'
          // props.mode === 'range'
          //   ? '[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
          //   : 'first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
        ),
        // TODO: the border should only be shown on first and last day (weeknumber not included). fix this or just remove the border..
        day: cn(
          buttonVariants({ variant: 'ghost' }),
          'h-8 w-8 p-0 font-normal aria-selected:opacity-100',
          'rounded-none',
          'group-hover:bg-accent [&:has([aria-selected].day-outside)]:group-hover:bg-accent/50 group-hover:text-accent-foreground'
        ),
        day_today:
          '!bg-primary !text-primary-foreground !font-semibold opacity-100 rounded-md',
        day_outside:
          'day-outside text-muted-foreground opacity-50  aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_start: 'day-range-start',
        day_range_end: 'day-range-end',
        day_range_middle:
          'aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        weeknumber:
          'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 h-8 w-8 p-0 font-normal aria-selected:opacity-100 text-muted-foreground border-r-2 mr-2',
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
        IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
      }}
      {...props}
    />
  )
}

Calendar.displayName = 'Calendar'

export { Calendar }
