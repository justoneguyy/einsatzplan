'use client'

import { CalendarIcon } from '@radix-ui/react-icons'
import { format } from 'date-fns'
import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { isMidnight } from '@/lib/helper/date-utils'
import { cn } from '@/lib/utils'
import { TimeRangePicker } from './time-range-picker'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
  time?: boolean
  numberOfMonths?: number
}

export function DateRangePicker({
  date,
  setDate,
  time,
  numberOfMonths = 1,
  className,
}: DateRangePickerProps) {
  // dont render the time if no time is being input
  const isMidnightStart = isMidnight(date?.from)
  const isMidnightEnd = isMidnight(date?.to)

  const dateFormat =
    isMidnightStart && isMidnightEnd ? 'dd.MM.yyyy' : 'dd.MM.yyyy HH:mm'
  const formattedDate = (date: Date | undefined) =>
    date ? format(date, dateFormat) : undefined

  const handleDateChange = (selectedDate: DateRange | undefined) => {
    const dateRange =
      selectedDate && !selectedDate.to
        ? { from: selectedDate.from, to: selectedDate.from }
        : selectedDate
    setDate(dateRange)
  }

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover modal={true}>
        <PopoverTrigger asChild>
          <Button
            id='date'
            variant={'outline'}
            className={cn(
              'h-8 justify-start text-sm disabled:opacity-100',
              !date && 'text-muted-foreground'
            )}
          >
            <CalendarIcon className='mr-2 h-4 w-4' />
            {date?.from ? (
              date.to &&
              format(date.from, dateFormat) !== format(date.to, dateFormat) ? (
                <>
                  {formattedDate(date.from)} - {formattedDate(date.to)}
                </>
              ) : (
                formattedDate(date.from)
              )
            ) : (
              <span className='text-muted-foreground'>Wähle ein Datum aus</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleDateChange}
            numberOfMonths={numberOfMonths}
          />
          {time && (
            <div className='border-t border-border p-3 pt-2'>
              {/* TODO: add validation, so that timeTo cant be lower than timeFrom */}
              <TimeRangePicker
                dateRange={date}
                setDateRange={handleDateChange}
              />
            </div>
          )}
        </PopoverContent>
      </Popover>
    </div>
  )
}
