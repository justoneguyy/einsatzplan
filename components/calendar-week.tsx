'use client'

import { HTMLAttributes, useState } from 'react'
import { startOfWeek, endOfWeek, addDays, format, getWeek } from 'date-fns'
import { Calendar } from './ui/calendar'
import { setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'
import { cn } from '@/lib/utils'
import {
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from '@radix-ui/react-icons'
import { Button, buttonVariants } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import { CaptionLabel } from 'react-day-picker'

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

  const getWeekDays = (weekStart: Date): Date[] => {
    const days: Date[] = [weekStart]
    for (let i = 1; i < 7; i += 1) {
      days.push(addDays(weekStart, i))
    }
    return days
  }

  const getWeekRange = (date: Date): DateRange => {
    return {
      from: startOfWeek(date),
      to: endOfWeek(date),
    }
  }

  const [hoverRange, setHoverRange] = useState<DateRange | undefined>(undefined)

  const [selectedDays, setSelectedDays] = useState<Date[]>(
    getWeekDays(getWeekRange(new Date()).from)
  )

  const goToNextWeek = () => {
    const currentWeekStart = selectedDays[0]
    const nextWeekStart = addDays(currentWeekStart, 7)
    setSelectedDays(getWeekDays(getWeekRange(nextWeekStart).from))
  }

  const goToPreviousWeek = () => {
    const currentWeekStart = selectedDays[0]
    const previousWeekStart = addDays(currentWeekStart, -7)
    setSelectedDays(getWeekDays(getWeekRange(previousWeekStart).from))
  }

  const handleDayChange = (date: Date) => {
    setSelectedDays(getWeekDays(getWeekRange(date).from))
  }

  const handleDayEnter = (date: Date) => {
    setHoverRange(getWeekRange(date))
  }

  const handleDayLeave = () => {
    setHoverRange(undefined)
  }

  const handleWeekClick = (
    weekNumber: number,
    days: Date[],
    e: React.MouseEvent
  ) => {
    setSelectedDays(days)
  }

  const daysAreSelected = selectedDays.length > 0

  const modifiers: Modifiers = {
    hoverRange: hoverRange,
    selectedRange: daysAreSelected && {
      from: selectedDays[0],
      to: selectedDays[6],
    },
    hoverRangeStart: hoverRange && hoverRange.from,
    hoverRangeEnd: hoverRange && hoverRange.to,
    selectedRangeStart: daysAreSelected && selectedDays[0],
    selectedRangeEnd: daysAreSelected && selectedDays[6],
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn('w-[250px] justify-center text-left font-normal')}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {/* TODO: might need to prettify/format this (should the year be added here?) */}
            {selectedDays.length === 7 && (
              <p>
                KW {getWeek(selectedDays[0])},{' '}
                {format(selectedDays[0], 'dd.MM')} -{' '}
                {format(selectedDays[6], 'dd.MM')}
              </p>
              // with year
              // <p>
              //   KW {getWeek(selectedDays[0])},{' '}
              //   {format(selectedDays[0], 'dd.MM.yyyy')} -{' '}
              //   {format(selectedDays[6], 'dd.MM.yyyy')}
              // </p>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='center'>
          {/* TODO: maybe make it wider to add more space */}
          <Calendar
            classNames={{
              caption_label: 'hidden',
            }}
            captionLayout='dropdown-buttons'
            fromYear={fromYear}
            toYear={toYear}
            selected={selectedDays}
            showWeekNumber
            modifiers={modifiers}
            // TODO: close popover on day click? -- get feedback on this
            onDayClick={handleDayChange}
            onDayMouseEnter={handleDayEnter}
            onDayMouseLeave={handleDayLeave}
            onWeekNumberClick={handleWeekClick}
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
