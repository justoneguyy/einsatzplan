import { ContextMenuItem } from '@/components/ui/context-menu'
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { cn } from '@/lib/utils'
import { ReactElement, ReactNode, Ref, forwardRef } from 'react'

interface DialogItemProps {
  forwardedRef?: Ref<HTMLDivElement>
  children: ReactNode
  className?: string
  title: ReactNode
  icon?: ReactElement
  onOpenChange: (open: boolean) => void
  onSelect?: () => void
}

export const DialogItem = forwardRef<HTMLDivElement, DialogItemProps>(
  (props, ref) => {
    const {
      children,
      className,
      title,
      icon,
      onSelect,
      onOpenChange,
      ...itemProps
    } = props
    return (
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <DropdownMenuItem
            {...itemProps}
            ref={ref}
            onSelect={(event) => {
              event.preventDefault()
              onSelect && onSelect()
            }}
          >
            {icon}
            <span>{title}</span>
          </DropdownMenuItem>
        </DialogTrigger>
        <DialogOverlay />
        <DialogContent className={cn('w-[500px]', className)}>
          {children}
        </DialogContent>
      </Dialog>
    )
  }
)

export const DialogItemContextMenu = forwardRef<
  HTMLDivElement,
  DialogItemProps
>((props, ref) => {
  const {
    children,
    className,
    title,
    icon,
    onSelect,
    onOpenChange,
    ...itemProps
  } = props
  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <ContextMenuItem
          {...itemProps}
          ref={ref}
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {icon}
          <span>{title}</span>
        </ContextMenuItem>
      </DialogTrigger>
      <DialogOverlay />
      <DialogContent className={cn('w-[500px]', className)}>
        {children}
      </DialogContent>
    </Dialog>
  )
})
