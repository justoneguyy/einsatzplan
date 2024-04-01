'use client'

import * as React from 'react'
import { DateRange } from 'react-day-picker'

import { DateRangePicker } from '@/components/date-range-picker'
import { Label } from '@/components/ui/label'
import { FormErrors } from './form-errors'

interface FormDatePickerProps {
  id: string
  label?: string
  errors?: Record<string, string[] | undefined>
  date: DateRange | undefined
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>
}

export function FormDatePicker({
  id,
  label,
  errors,
  date,
  setDate,
}: FormDatePickerProps) {
  return (
    <div className='space-y-2'>
      <div className='space-y-1'>
        {label ? (
          <Label htmlFor={id} className='text-xs font-semibold'>
            {label}
          </Label>
        ) : null}
        <DateRangePicker date={date} setDate={setDate} />
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
}
