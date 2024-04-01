'use client'

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Label } from '@/components/ui/label'
import SelectMultiple from '@/components/ui/select-multiple'
import { ControllerProps } from 'react-hook-form'

interface FormSelectMultipleProps
  extends Omit<ControllerProps<any, any>, 'render'> {
  label: string
  options: { label: string; value: string; disable?: boolean }[]
  placeholder: string
}

const FormSelectMultiple = ({
  label,
  options,
  placeholder,
  ...controllerProps
}: FormSelectMultipleProps) => {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <SelectMultiple
              value={field.value}
              onChange={field.onChange}
              options={options}
              hidePlaceholderWhenSelected
              placeholder={placeholder}
              emptyIndicator={<Label>Keine {label} mehr gefunden</Label>}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormSelectMultiple
