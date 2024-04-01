'use client'

import * as React from 'react'
import { CalendarIcon } from '@radix-ui/react-icons'
import { addDays, format } from 'date-fns'
import { DateRange } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function DateRangePicker({
  date,
  setDate,
  className,
}: DateRangePickerProps) {
  const dateFormat = 'dd.MM.yyyy'

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
                  {format(date.from, dateFormat)} -{' '}
                  {format(date.to, dateFormat)}
                </>
              ) : (
                format(date.from, dateFormat)
              )
            ) : (
              <span>Waehle ein Datum aus</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          {/* TODO: maybe change this to include years like in the weekCalendar */}
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={(selectedDate) => {
              const dayRange =
                selectedDate && !selectedDate.to
                  ? { from: selectedDate.from, to: selectedDate.from }
                  : selectedDate
              setDate(dayRange)
            }}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
