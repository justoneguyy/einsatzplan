'use client'

import { searchParams } from '@/lib/params/searchparams'
import { cn } from '@/lib/utils'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import {
  addDays,
  eachDayOfInterval,
  endOfWeek,
  format,
  getWeek,
  setDefaultOptions,
  startOfWeek,
} from 'date-fns'
import { de } from 'date-fns/locale'
import { useQueryStates } from 'nuqs'
import { HTMLAttributes, useState } from 'react'
import { Button, buttonVariants } from './ui/button'
import { CalendarCustom } from './ui/calendar'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

interface DateRange {
  from: Date
  to: Date
}

type Modifiers = {
  hoverRange?: DateRange | undefined
  selectedRange?: false | { from: Date; to: Date }
  hoverRangeStart?: Date | undefined
  hoverRangeEnd?: Date | undefined
  selectedRangeStart?: false | Date
  selectedRangeEnd?: false | Date
}

export function CalendarWeek({ className }: HTMLAttributes<HTMLDivElement>) {
  const currentYear = new Date().getFullYear()
  const fromYear = currentYear - 2
  const toYear = currentYear + 2
  const [hoverRange, setHoverRange] = useState<DateRange | undefined>(undefined)
  const [isCalendarOpen, setIsCalendarOpen] = useState(false) // remove this state if the calendar shouldnt be closed on click

  const getWeekRange = () => {
    const now = new Date()
    const start = startOfWeek(now)
    const end = endOfWeek(now)

    return {
      from: start,
      to: end,
    }
  }

  const [dateWeek, setDateWeek] = useQueryStates(
    {
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    },
    {
      history: 'push',
      shallow: false, // Send updates to the server
    }
  )

  const { dateFrom, dateTo } = dateWeek

  const goToNextWeek = () => {
    setDateWeek({ dateFrom: addDays(dateFrom, 7), dateTo: addDays(dateTo, 7) })
  }

  const goToPreviousWeek = () => {
    setDateWeek({
      dateFrom: addDays(dateFrom, -7),
      dateTo: addDays(dateTo, -7),
    })
  }

  const handleDayChange = (date: Date) => {
    const start = startOfWeek(date)
    const end = endOfWeek(date)
    setDateWeek({ dateFrom: start, dateTo: end })
    setIsCalendarOpen(false)
  }

  const handleDayEnter = () => {
    setHoverRange(getWeekRange())
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (
    weekNumber: number,
    days: Date[],
    e: React.MouseEvent
  ) => {
    setDateWeek({ dateFrom: days[0], dateTo: days[6] })
    setIsCalendarOpen(false)
  }

  const daysAreSelected = dateFrom && dateTo

  const modifiers: Modifiers = {
    hoverRange: hoverRange,
    selectedRange: daysAreSelected && {
      from: dateFrom,
      to: dateTo,
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && dateFrom,
    selectedRangeEnd: daysAreSelected && dateTo,
  }

  return (
    <div className={cn('flex items-center justify-between gap-4', className)}>
      <button
        onClick={goToPreviousWeek}
        className={cn(
          buttonVariants({ variant: 'outline' }),
          'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
        )}
      >
        <ChevronLeftIcon className='h-4 w-4' />
      </button>
      <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('w-[250px] justify-center text-left font-normal')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {/* TODO: might need to prettify/format this (should the year be added here?) */}
            {dateFrom && dateTo && (
              <p>
                KW {getWeek(dateFrom)}, {format(dateFrom, 'dd.MM')} -{' '}
                {format(dateTo, 'dd.MM')}
              </p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          {/* TODO: think about adding presets (this week, next week ...) */}
          <CalendarCustom
            classNames={{
              caption_label: 'hidden',
            }}
            captionLayout='dropdown-buttons'
            fromYear={fromYear}
            toYear={toYear}
            selected={eachDayOfInterval({ start: dateFrom, end: dateTo })}
            defaultMonth={dateFrom}
            showWeekNumber
            modifiers={modifiers}
            // TODO: close popover on day/week click? -- get feedback on this
            onDayClick={handleDayChange}
            onWeekNumberClick={handleWeekClick}
            onDayMouseEnter={handleDayEnter}
            onDayMouseLeave={handleDayLeave}
          />
        </PopoverContent>
      </Popover>
      <button
        onClick={goToNextWeek}
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
