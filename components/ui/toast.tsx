'use client'

import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToastT, toast } from 'sonner'
import { Button } from './button'
import { XIcon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from './card'

type ToasterProps = React.ComponentProps<typeof Sonner>

{
  /* TODO: width should only fill (there is always space on the left. fix this) */
}
const Toast = ({ ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
        },
      }}
      {...props}
    />
  )
}

export { Toast }

type ToastProps = Omit<ToastT, 'id'>

interface CustomToastProps extends ToastProps {
  title: string
  description?: string
}

const CustomToast = ({
  title,
  description,
  duration = 10000,
  ...props
}: CustomToastProps) => {
  return () =>
    toast.custom(
      (t) => (
        <Card size='md'>
          <CardHeader className='relative p-4'>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
            <Button
              variant='highlight'
              className='absolute right-0 top-0'
              onClick={() => toast.dismiss(t)}
            >
              <XIcon className='h-4 w-4' />
            </Button>
          </CardHeader>
        </Card>
      ),
      {
        ...props,
      }
    )
}

export { CustomToast }
