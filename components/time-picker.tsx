'use client'

import { Label } from '@/components/ui/label'
import { TimePickerInput } from './ui/time-picker-input'
import { useRef } from 'react'

interface TimePicker {
  label?: string
  date: Date | undefined
  setDate: (date: Date | undefined) => void
}

export function TimePicker({ label, date, setDate }: TimePicker) {
  const minuteRef = useRef<HTMLInputElement>(null)
  const hourRef = useRef<HTMLInputElement>(null)

  return (
    <div>
      <Label className='text-xs'>{label}</Label>
      <div className='flex items-center rounded-md border'>
        <TimePickerInput
          picker='hours'
          date={date}
          setDate={setDate}
          ref={hourRef}
          onRightFocus={() => minuteRef.current?.focus()}
          className='border-none px-2 text-muted-foreground'
        />
        <span>:</span>
        <TimePickerInput
          picker='minutes'
          date={date}
          setDate={setDate}
          ref={minuteRef}
          onLeftFocus={() => hourRef.current?.focus()}
          className='border-none px-2 text-muted-foreground'
        />
      </div>
    </div>
  )
}
