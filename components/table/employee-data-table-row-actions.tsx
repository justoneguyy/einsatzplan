'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { deleteEmployee } from '@/actions/delete-employee'
import { useAction } from '@/lib/hooks/useAction'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useRef, useState } from 'react'
import { DialogItem } from '../dialog/ui/dialog-item'
import {
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { CustomToast } from '../ui/toaster'
import EmployeeEditForm, {
  EmployeeEditFormProps,
} from '../form/employee-edit-form'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

export interface DataTableRowActionsProps
  extends Omit<EmployeeEditFormProps, 'onCreate' | 'onCancel'> {
  id: string
  firstName: string
  lastName: string
}

export function EmployeeDataTableRowActions({
  id,
  employee,
  firstName,
  lastName,
}: DataTableRowActionsProps) {
  const [open, setOpen] = useState(false)

  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [hasOpenDialog, setHasOpenDialog] = useState(false)
  const dropdownTriggerRef = useRef(null)
  const focusRef = useRef<HTMLButtonElement | null>(null)

  function handleDialogItemSelect() {
    focusRef.current = dropdownTriggerRef.current
  }

  function handleDialogItemOpenChange(open: any) {
    setHasOpenDialog(open)
    if (open === false) {
      setDropdownOpen(false)
    }
  }

  const { execute, isLoading } = useAction(deleteEmployee, {
    onSuccess: () => {
      CustomToast({
        title: `Mitarbeiter ${firstName} ${lastName} geloescht`,
        description: `Der Mitarbeiter ${firstName} ${lastName} wurde erfolgreich geloescht.`,
      })()
    },
    onError: (error) => {
      CustomToast({
        title: `Mitarbeiter ${firstName} ${lastName} konnte nicht geloescht werden`,
        description: error,
      })()
    },
  })

  const onDelete = () => {
    execute({ id })
  }

  return (
    <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          ref={dropdownTriggerRef}
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align='end'
        hidden={hasOpenDialog}
        onCloseAutoFocus={(event) => {
          if (focusRef.current) {
            focusRef.current.focus()
            focusRef.current = null
            event.preventDefault()
          }
        }}
      >
        <DialogItem
          title='Bearbeiten'
          onSelect={handleDialogItemSelect}
          onOpenChange={handleDialogItemOpenChange}
        >
          <DialogHeader className='space-y-2'>
            <DialogTitle>Mitarbeiter</DialogTitle>
            <DialogDescription>
              {firstName} {lastName}
            </DialogDescription>
          </DialogHeader>
          <EmployeeEditForm
            employee={employee}
            onCreate={() => setOpen(false)}
          />
        </DialogItem>

        <DialogItem
          title='Loeschen'
          onSelect={handleDialogItemSelect}
          onOpenChange={handleDialogItemOpenChange}
        >
          <DialogHeader className='space-y-2'>
            <DialogTitle>Warnung</DialogTitle>
            <DialogDescription>
              Sicher dass der Mitarbeiter{' '}
              <span className='text-accent-foreground'>
                {firstName} {lastName}
              </span>{' '}
              geloescht werden soll?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose />
            <Button onClick={onDelete} disabled={isLoading}>
              Bestaetigen
            </Button>
          </DialogFooter>
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
