import { forwardRef } from 'react'
import { useFormStatus } from 'react-dom'

import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'

import { FormErrors } from './form-errors'
import { Separator } from '@/components/ui/separator'

interface FormInputProps {
  id: string
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  errors?: Record<string, string[] | undefined>
  className?: string
  value?: string
  defaultValue?: string
  onChange?: React.ChangeEventHandler<HTMLInputElement>
  onBlur?: () => void
  autocomplete?: string
  separator?: boolean
  separatorSide?: 'left' | 'right'
}

export const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  (props, ref) => {
    const { pending } = useFormStatus()
    const { separator, separatorSide } = props

    return (
      <>
        {separator ? (
          <div className='flex gap-8'>
            {separatorSide === 'left' && (
              <div className='pb-1 pt-2'>
                <Separator orientation='vertical' />
              </div>
            )}
            <FormInputContent {...props} ref={ref} />
            {separatorSide === 'right' && (
              <div className='pb-1 pt-2'>
                <Separator orientation='vertical' />
              </div>
            )}
          </div>
        ) : (
          <FormInputContent {...props} ref={ref} />
        )}
      </>
    )
  }
)

FormInput.displayName = 'FormInput'

const FormInputContent = forwardRef<HTMLInputElement, FormInputProps>(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      errors,
      className,
      value,
      defaultValue,
      onChange,
      onBlur,
      autocomplete,
    },
    ref
  ) => {
    return (
      <div className='space-y-2'>
        <div className='space-y-1'>
          {label && (
            <Label htmlFor={id} className='text-xs font-semibold'>
              {label}
            </Label>
          )}
          <Input
            autoComplete={autocomplete}
            onBlur={onBlur}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            ref={ref}
            required={required}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={disabled}
            className={cn('h-8 text-sm disabled:opacity-100', className)}
            aria-describedby={`${id}-error`}
          />
        </div>
        <FormErrors id={id} errors={errors} />
      </div>
    )
  }
)
