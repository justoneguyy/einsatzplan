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
  time?: boolean
}

export function FormDateRangePicker({
  label,
  disabled,
  time,
  ...controllerProps
}: FormDateRangePickerProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <DateRangePicker
              time={time}
              date={field.value}
              setDate={field.onChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
