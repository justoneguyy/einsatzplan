'use client'

import { DateRange } from 'react-day-picker'

import { TimePicker } from './time-picker'
import { Label } from './ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'

interface TimeRangePickerProps {
  dateRange: DateRange | undefined
  setDateRange: (dateRange: DateRange | undefined) => void
}

export function TimeRangePicker({
  dateRange,
  setDateRange,
}: TimeRangePickerProps) {
  return (
    <div className='flex flex-col gap-3'>
      <div className='flex gap-1 self-center'>
        <Label className='font-semibold'>Zeit</Label>
        <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <InfoCircledIcon className='h-3 w-3' />
            </TooltipTrigger>
            <TooltipContent>
              <p>
                Es kann optional eine Zeit angegeben werden. <br /> links:
                Startzeit, rechts: Endzeit
              </p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className='flex justify-between'>
        <TimePicker
          date={dateRange?.from}
          setDate={(fromDate) => {
            if (!dateRange) return
            setDateRange({ ...dateRange, from: fromDate })
          }}
        />
        <TimePicker
          date={dateRange?.to}
          setDate={(toDate) => {
            if (!dateRange) return
            setDateRange({ ...dateRange, to: toDate })
          }}
        />
      </div>
    </div>
  )
}
