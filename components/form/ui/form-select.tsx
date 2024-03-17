import React from 'react'

import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormErrors } from './form-errors'

export interface FormSelectProps {
  id: string
  label: string
  placeholder: string
  options: { id: string; name: string }[]
  value: string
  defaultValue?: string
  onValueChange: (value: string) => void
  errors?: Record<string, string[] | undefined>
}

const FormSelect: React.FC<FormSelectProps> = ({
  id,
  label,
  placeholder,
  options,
  value,
  defaultValue = '',
  onValueChange,
  errors,
}) => (
  <div className='space-y-2'>
    <div className='space-y-1'>
      {label ? (
        <Label htmlFor={id} className='text-xs font-semibold'>
          {label}
        </Label>
      ) : null}
      <Select
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} defaultValue={defaultValue} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem id={option.id} key={option.id} value={option.id}>
              {option.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <input hidden id={id} name={id} value={value} readOnly />
    </div>
    <FormErrors id={id} errors={errors} />
  </div>
)

export default FormSelect
