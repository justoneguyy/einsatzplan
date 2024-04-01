import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Loader2 } from 'lucide-react'
import { ReactNode } from 'react'

interface FormSubmitProps {
  className?: string
  title: string
  disabled?: boolean
  icon?: ReactNode
  loadingIcon?: ReactNode
  showIcon?: boolean
}

export function FormSubmit({
  className,
  title,
  disabled,
  icon,
  loadingIcon = <Loader2 className='mr-2 h-4 w-4 animate-spin' />,
  showIcon = false,
}: FormSubmitProps) {
  return (
    <Button
      disabled={disabled}
      type='submit'
      className={cn('w-full', className)}
    >
      {showIcon ? (disabled ? loadingIcon : icon) : null}
      {title}
    </Button>
  )
}
