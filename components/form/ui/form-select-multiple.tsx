'use client'

import React, { useEffect, useState } from 'react'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { FormErrors } from './form-errors'
import { FormSelectProps } from './form-select'

interface FormSelectMultipleProps
  extends Omit<FormSelectProps, 'value' | 'onValueChange'> {
  name: string
}

const FormSelectMultiple: React.FC<FormSelectMultipleProps> = ({
  id,
  name,
  label,
  options,
  placeholder,
  errors,
}) => {
  const [values, setValues] = useState([''])

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values]
    newValues[index] = value
    setValues(newValues)
  }

  const handleAdd = () => {
    setValues([...values, ''])
  }

  const handleDelete = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    setValues(newValues)
  }

  return (
    <div className='space-y-2'>
      <div className='space-y-1'>
        {label ? (
          <Label htmlFor={id} className='text-xs font-semibold'>
            {label}
          </Label>
        ) : null}
        <div className='space-y-2'>
          {values.map((value, index) => (
            <React.Fragment key={`${id}-${index}`}>
              <div className='flex'>
                <Select
                  value={value}
                  onValueChange={(value) => handleValueChange(index, value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {options.map((option) => (
                      <SelectItem
                        id={option.id}
                        key={option.id}
                        value={option.id}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input hidden id={id} name={id} value={value} readOnly />
                {/* TOOD: validation not working why so ever. fix this */}
                <FormErrors id={id} errors={errors} />
                {index > 0 && (
                  <Button
                    type='button'
                    variant='outline'
                    className='ml-3'
                    onClick={() => handleDelete(index)}
                  >
                    Löschen
                  </Button>
                )}
              </div>
            </React.Fragment>
          ))}
          <Button type='button' variant='outline' onClick={handleAdd}>
            {label} hinzufügen
          </Button>
        </div>
      </div>
    </div>
  )
}

export default FormSelectMultiple
