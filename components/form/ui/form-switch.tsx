import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Switch } from '@/components/ui/switch'
import { cn } from '@/lib/utils'
import { ControllerProps } from 'react-hook-form'

interface FormSwitchProps extends Omit<ControllerProps<any, any>, 'render'> {
  label?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  disabled?: boolean
  className?: string
}

export function FormSwitch({
  label,
  checked,
  onCheckedChange,
  disabled,
  className,
  ...controllerProps
}: FormSwitchProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem className={cn('', className)}>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className='relative'>
              <Switch
                {...field}
                checked={checked}
                onCheckedChange={onCheckedChange}
                disabled={disabled}
                className={cn('', className)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
