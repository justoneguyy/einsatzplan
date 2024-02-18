'use client'

import { format } from 'date-fns'
import { de } from 'date-fns/locale'
import * as React from 'react'

import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

// add others for weeks, months
function CustomCaption(props: CaptionProps) {
  const { goToMonth, nextMonth, previousMonth } = useNavigation()
  return (
    // <h2>
    //   {format(props.displaymonth, 'MMM yyy')}
    //   <button
    //     disabled={!previousMonth}
    //     onClick={() => previousMonth && goToMonth(previousMonth)}
    //   >
    //     Previous
    //   </button>
    //   <button
    //     disabled={!nextMonth}
    //     onClick={() => nextMonth && goToMonth(nextMonth)}
    //   >
    //     Next
    //   </button>
    // </h2>
    <div className='relative flex w-56 items-center justify-center pt-1'>
      <div className='absolute left-1'>
        <button
          disabled={!previousMonth}
          onClick={() => previousMonth && goToMonth(previousMonth)}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
        >
          <ChevronLeftIcon className='h-4 w-4' />
        </button>
      </div>
      {/* <div className='text-sm font-medium'>as</div> */}
      <Button variant='outline' className='w-32'>
        {/* for months */}
        {format(props.displayMonth, 'MMMM yyyy', { locale: de })}
        {/* maybe this should be shown somewhere else and months should always be shown? would probably make more sense. not sure yet */}
        {/* {format(new Date(), 'dd.MM.yyyy')} */}
      </Button>
      <div className='absolute right-1'>
        <button
          disabled={!nextMonth}
          onClick={() => nextMonth && goToMonth(nextMonth)}
          className={cn(
            buttonVariants({ variant: 'outline' }),
            'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
          )}
        >
          <ChevronRightIcon className='h-4 w-4' />
        </button>
      </div>
    </div>
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
        caption: 'w-56 flex justify-center pt-1 relative items-center',
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
        Caption: CustomCaption,
        // IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
        // IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
      }}
      {...props}
    />
  )
}
CalendarFull.displayName = 'CalendarFull'

export { CalendarFull }

function CalendarCaption({
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
      className={cn('border-none px-2 py-1', className)}
      classNames={{
        // TODO: search for better width handling
        // caption: 'hidden',
        caption: 'w-56 flex justify-center pt-1 relative items-center',
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
        table: 'hidden',
        ...classNames,
      }}
      components={{
        Caption: CustomCaption,
      }}
      {...props}
    />
  )
}
CalendarCaption.displayName = 'CalendarCaption'

export { CalendarCaption }

// 'use client'

// import { format } from 'date-fns'
// import { de } from 'date-fns/locale'
// import * as React from 'react'

// import { Button, buttonVariants } from '@/components/ui/button'
// import { cn } from '@/lib/utils'

// export type CalendarProps = React.ComponentProps<typeof DayPicker>

// import { CaptionProps, DayPicker, useNavigation } from 'react-day-picker'
// import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

// // add others for weeks, months
// function CustomCaption(props: CaptionProps) {
//   const { goToMonth, nextMonth, previousMonth } = useNavigation()
//   return (
//     // <h2>
//     //   {format(props.displaymonth, 'MMM yyy')}
//     //   <button
//     //     disabled={!previousMonth}
//     //     onClick={() => previousMonth && goToMonth(previousMonth)}
//     //   >
//     //     Previous
//     //   </button>
//     //   <button
//     //     disabled={!nextMonth}
//     //     onClick={() => nextMonth && goToMonth(nextMonth)}
//     //   >
//     //     Next
//     //   </button>
//     // </h2>
//     <div className='relative flex w-56 items-center justify-center pt-1'>
//       <div className='absolute left-1'>
//         <button
//           disabled={!previousMonth}
//           onClick={() => previousMonth && goToMonth(previousMonth)}
//           className={cn(
//             buttonVariants({ variant: 'outline' }),
//             'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//           )}
//         >
//           <ChevronLeftIcon className='h-4 w-4' />
//         </button>
//       </div>
//       {/* <div className='text-sm font-medium'>as</div> */}
//       <Button variant='outline' className='w-32'>
//         {/* for months */}
//         {format(props.displayMonth, 'MMMM yyyy', { locale: de })}
//         {/* maybe this should be shown somewhere else and months should always be shown? would probably make more sense. not sure yet */}
//         {/* {format(new Date(), 'dd.MM.yyyy')} */}
//       </Button>
//       <div className='absolute right-1'>
//         <button
//           disabled={!nextMonth}
//           onClick={() => nextMonth && goToMonth(nextMonth)}
//           className={cn(
//             buttonVariants({ variant: 'outline' }),
//             'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
//           )}
//         >
//           <ChevronRightIcon className='h-4 w-4' />
//         </button>
//       </div>
//     </div>
//   )
// }

// function Calendar({
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
//         caption: 'w-56 flex justify-center pt-1 relative items-center',
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
//         Caption: CustomCaption,
//         // IconLeft: ({ ...props }) => <ChevronLeftIcon className='h-4 w-4' />,
//         // IconRight: ({ ...props }) => <ChevronRightIcon className='h-4 w-4' />,
//       }}
//       {...props}
//     />
//   )
// }
// Calendar.displayName = 'Calendar'

// export { Calendar }
