import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { InfoCircledIcon } from '@radix-ui/react-icons'
import { ReactNode } from 'react'
import { ControllerProps } from 'react-hook-form'

interface FormInputProps extends Omit<ControllerProps<any, any>, 'render'> {
  label?: string
  type?: string
  placeholder?: string
  required?: boolean
  disabled?: boolean
  className?: string
  onBlur?: () => void
  autocomplete?: string
  children?: ReactNode
  icon?: ReactNode
  optional?: boolean
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  required,
  disabled,
  className,
  onBlur,
  autocomplete,
  children,
  icon,
  optional = false,
  ...controllerProps
}: FormInputProps) {
  return (
    <FormField
      {...controllerProps}
      render={({ field }) => (
        <FormItem className={cn('', className)}>
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
            <div className='relative'>
              <Input
                {...field}
                type={type}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                className={className}
                onBlur={onBlur}
                autoComplete={autocomplete}
              />
              {icon && (
                <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
                  {icon}
                </div>
              )}
            </div>
          </FormControl>
          <FormMessage />
          {children}
        </FormItem>
      )}
    />
  )
}
// import {
//   FormControl,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormMessage,
// } from '@/components/ui/form'
// import { Input } from '@/components/ui/input'
// import { cn } from '@/lib/utils'
// import { ReactNode } from 'react'
// import { ControllerProps } from 'react-hook-form'

// interface FormInputProps extends Omit<ControllerProps<any, any>, 'render'> {
//   label?: string
//   type?: string
//   placeholder?: string
//   required?: boolean
//   disabled?: boolean
//   className?: string
//   onBlur?: () => void
//   autocomplete?: string
//   children?: ReactNode
//   icon?: ReactNode
// }

// export function FormInput({
//   label,
//   type = 'text',
//   placeholder,
//   required,
//   disabled,
//   className,
//   onBlur,
//   autocomplete,
//   children,
//   icon,
//   ...controllerProps
// }: FormInputProps) {
//   return (
//     <FormField
//       {...controllerProps}
//       render={({ field }) => (
//         <FormItem className={cn('', className)}>
//           <FormLabel>{label}</FormLabel>
//           <FormControl>
//             <div className='relative'>
//               <Input
//                 {...field}
//                 type={type}
//                 placeholder={placeholder}
//                 required={required}
//                 disabled={disabled}
//                 className={className}
//                 onBlur={onBlur}
//                 autoComplete={autocomplete}
//               />
//               {icon && (
//                 <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
//                   {icon}
//                 </div>
//               )}
//             </div>
//           </FormControl>
//           <FormMessage />
//           {children}
//         </FormItem>
//       )}
//     />
//   )
// }
