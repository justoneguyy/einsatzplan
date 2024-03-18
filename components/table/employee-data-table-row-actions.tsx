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
import { useState } from 'react'
import { DialogItem } from '../dialog/ui/dialog-item'
import {
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { CustomToast } from '../ui/toaster'
import EmployeeEditForm, {
  EmployeeEditFormProps,
} from '../form/employee-edit-form'

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
  const [open, setOpen] = useState<boolean>(false)

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
    setOpen(false)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant='ghost'
          className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
        >
          <DotsHorizontalIcon className='h-4 w-4' />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end' className=''>
        <DialogItem title='Bearbeiten'>
          <DialogHeader className='space-y-2'>
            <DialogTitle>Mitarbeiter</DialogTitle>
            <DialogDescription>
              {firstName} {lastName}
            </DialogDescription>
          </DialogHeader>
          {/* TODO: currently this is not working. without single dialogs it would work tho. find a workaround for it (one solution would be to use the DialogClose as you can see in the beneath DialogItem.) */}
          <EmployeeEditForm
            employee={employee}
            onCreate={() => setOpen(false)}
            onCancel={() => setOpen(false)}
          />
        </DialogItem>

        <DialogItem title='Loeschen'>
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
            <DialogClose asChild>
              <Button type='button' size='sm' onClick={() => setOpen(false)}>
                Abbrechen
              </Button>
            </DialogClose>
            {/* the onDelete also doesnt get (sometimes) triggered TODO: fix this */}
            <Button size='sm' onClick={onDelete} disabled={isLoading}>
              Bestaetigen
            </Button>
          </DialogFooter>
        </DialogItem>

        {/* add copy button? */}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
