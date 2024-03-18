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
  values: string[]
  onValuesChange: (values: string[]) => void
  deleteButton?: boolean
}

// TODO: change it, so only the remaining values get shown in the select
const FormSelectMultiple: React.FC<FormSelectMultipleProps> = ({
  id,
  name,
  label,
  values,
  onValuesChange,
  options,
  placeholder,
  errors,
  deleteButton,
}) => {
  const remainingOptions = options.filter(
    (option) =>
      !values.includes(option.id) ||
      (values.includes(option.id) &&
        values.indexOf(option.id) ===
          values.indexOf(values.find((val) => val === option.id) || ''))
  )

  const handleValueChange = (index: number, value: string) => {
    const newValues = [...values]
    newValues[index] = value
    onValuesChange(newValues)
  }

  const handleAdd = () => {
    onValuesChange([...values, ''])
  }

  const handleDelete = (index: number) => {
    const newValues = [...values]
    newValues.splice(index, 1)
    onValuesChange(newValues)
  }

  useEffect(() => {
    if (values.length === 0) {
      onValuesChange([''])
    }
  }, [values, onValuesChange])

  // TODO: maybe make the select scrollable
  // TODO: think about adding select groups
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
                    {remainingOptions.map((option) => (
                      <SelectItem
                        id={option.id}
                        key={option.id}
                        value={option.id}
                        disabled={values.includes(option.id)}
                      >
                        {option.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <input hidden id={id} name={id} value={value} readOnly />
                <FormErrors id={id} errors={errors} />
                {deleteButton && (
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
