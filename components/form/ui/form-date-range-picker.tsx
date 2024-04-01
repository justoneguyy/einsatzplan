import { DateRangePicker } from '@/components/date-range-picker'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ControllerProps } from 'react-hook-form'

interface FormDateRangePickerProps
  extends Omit<ControllerProps<any, any>, 'render'> {
  label: string
  disabled?: boolean
}

export function FormDateRangePicker({
  label,
  disabled,
  ...controllerProps
}: FormDateRangePickerProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DateRangePicker date={field.value} setDate={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
