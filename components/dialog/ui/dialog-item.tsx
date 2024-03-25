import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogOverlay,
  DialogTrigger,
} from '@/components/ui/dialog'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'
import { Cross2Icon } from '@radix-ui/react-icons'
import { ReactElement, ReactNode, Ref, forwardRef } from 'react'

interface DialogItemProps {
  forwardedRef?: Ref<HTMLDivElement>
  children: ReactNode
  title: ReactNode
  icon?: ReactElement
  onOpenChange: (open: boolean) => void
  onSelect?: () => void
}

export const DialogItem = forwardRef<HTMLDivElement, DialogItemProps>(
  (props, ref) => {
    const { children, title, icon, onSelect, onOpenChange, ...itemProps } =
      props
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
        <DialogContent>
          {children}
          {/* <DialogClose asChild>
            <Button aria-label='Close'>
              <Cross2Icon />
            </Button>
          </DialogClose> */}
        </DialogContent>
      </Dialog>
    )
  }
)
