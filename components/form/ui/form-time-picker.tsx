import { TimePicker } from '@/components/time-picker'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { ControllerProps } from 'react-hook-form'

interface FormTimePickerProps
  extends Omit<ControllerProps<any, any>, 'render'> {
  label: string
  optional?: boolean
}

export function FormTimePicker({
  label,
  optional = false,
  ...controllerProps
}: FormTimePickerProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem>
          <div className='flex gap-1'>
            <FormLabel>{label}</FormLabel>
            {optional && (
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <InfoCircledIcon className='h-3 w-3' />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>'{label}' ist optional</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <FormControl>
            <TimePicker date={field.value} setDate={field.onChange} />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
