import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { FormErrors } from './form-errors'
import { cn } from '@/lib/utils'
import { Separator } from '@/components/ui/separator'

interface FormSwitchProps {
  id: string
  label?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  errors?: Record<string, string[] | undefined>
  className?: string
}

export const FormSwitch = ({
  id,
  label,
  checked,
  onCheckedChange,
  errors,
  className,
}: FormSwitchProps) => {
  return (
    <div className='space-y-2'>
      <div className='space-y-1'>
        {label ? (
          <Label htmlFor={id} className='text-xs font-semibold'>
            {label}
          </Label>
        ) : null}
        <div className='py-1'>
          <Switch
            id={id}
            checked={checked}
            onCheckedChange={onCheckedChange}
            size='md'
            className={cn('', className)}
          />
        </div>
      </div>
      <FormErrors id={id} errors={errors} />
    </div>
  )
}
