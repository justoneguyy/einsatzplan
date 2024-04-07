'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useRef, useState } from 'react'
import { DialogItem } from '../../dialog/ui/dialog-item'
import UserDeleteForm from '../../form/user-delete-form'
import UserEditForm from '../../form/user-edit-form'
import { DialogDescription, DialogHeader, DialogTitle } from '../../ui/dialog'
import { UserType } from '@/data/user/types'

export interface TableRowActionsProps {
  user: UserType
  id: string
  firstName: string
  lastName: string
}

export function UserTableRowActions({
  id,
  user,
  firstName,
  lastName,
}: TableRowActionsProps) {
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
          <UserEditForm user={user} />
        </DialogItem>

        {/* TODO: we dont delete users, later on change it to update the account status (active/inactive) */}
        <DialogItem
          title='Löschen'
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
          <UserDeleteForm user={user} />
        </DialogItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
