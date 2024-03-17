import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { ReactElement, ReactNode, Ref, useState } from 'react'

interface DialogItemProps {
  children: ReactNode
  onSelect?: () => void
  forwardedRef?: Ref<HTMLDivElement>
  title: string
  icon?: ReactElement
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const DialogItem: React.FC<DialogItemProps> = ({
  children,
  onSelect,
  forwardedRef,
  title,
  icon,
  open,
  onOpenChange,
}) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <DropdownMenuItem
          ref={forwardedRef}
          className='DropdownMenuItem'
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {icon}
          <span>{title}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}
