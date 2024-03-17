import { useFormStatus } from 'react-dom'

import { Button, ButtonProps } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface FormSubmitProps extends ButtonProps {}

export const FormSubmit = ({
  children,
  disabled,
  className,
  onClick,
  variant = 'default',
}: FormSubmitProps) => {
  const { pending } = useFormStatus()

  return (
    <Button
      type='submit'
      disabled={pending || disabled}
      variant={variant}
      size='default'
      className={cn(className)}
    >
      {children}
    </Button>
  )
}
