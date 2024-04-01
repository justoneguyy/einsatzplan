import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { ControllerProps } from 'react-hook-form'

interface FormSelectProps extends Omit<ControllerProps<any, any>, 'render'> {
  label: string
  placeholder: string
  disabled?: boolean
  options: { value: string; label: string }[] | Record<string, string | number>
  isEnum?: boolean
  onValueChange: (value: string) => void
}

export function FormSelect({
  label,
  placeholder,
  disabled,
  options,
  isEnum,
  onValueChange,
  ...controllerProps
}: FormSelectProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Select
              {...field}
              disabled={disabled}
              value={field.value}
              defaultValue={field.value}
              onValueChange={onValueChange}
            >
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
              <SelectContent>
                {isEnum
                  ? Object.entries(options).map(([key, value]) => (
                      <SelectItem key={key} value={value}>
                        {key}
                      </SelectItem>
                    ))
                  : (options as { value: string; label: string }[]).map(
                      (option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      )
                    )}
              </SelectContent>
            </Select>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
