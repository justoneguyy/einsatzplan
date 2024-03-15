'use client'

import { DotsHorizontalIcon } from '@radix-ui/react-icons'

import { Button } from '@/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../ui/dialog'
import { deleteEmployee } from '@/actions/delete-employee'
import { useAction } from '@/lib/hooks/useAction'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

interface DataTableRowActionsProps {
  id: string
  firstName: string
  lastName: string
}

export function EmployeeDataTableRowActions({
  id,
  firstName,
  lastName,
}: DataTableRowActionsProps) {
  const router = useRouter()

  const [open, setOpen] = useState(false)

  const { execute } = useAction(deleteEmployee, {
    // TODO: toast doesnt seem to get triggered. fix this
    onSuccess: () => {
      toast('Mitarbeiter erstellt', {
        description: 'Der Mitarbeiter wurde erfolgreich erstellt.',
        duration: 5000,
      })
    },
    onError: (error) => {
      toast('Der Mitarbeiter konnte nicht geloescht werden', {
        description: error,
        duration: 5000,
      })
    },
  })

  const onDelete = () => {
    execute({ id })
    setOpen(false)
    router.push('/settings/employee-administration')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant='ghost'
            className='flex h-8 w-8 p-0 data-[state=open]:bg-muted'
          >
            <DotsHorizontalIcon className='h-4 w-4' />
            <span className='sr-only'>Menue oeffnen</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' className=''>
          <DialogTrigger asChild>
            <DropdownMenuItem className='flex items-center'>
              <span>Loeschen</span>
            </DropdownMenuItem>
          </DialogTrigger>
          {/* maybe add copy functionality */}
          {/* <DropdownMenuItem>Copy</DropdownMenuItem> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogHeader className='space-y-2'>
          <DialogTitle>Warnung</DialogTitle>
          <DialogDescription>
            Sicher dass der Mitarbeiter {firstName} {lastName} geloescht werden
            soll?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button type='button' size='sm'>
              Abbrechen
            </Button>
          </DialogClose>
          {/* TODO: handle delete of employee */}
          <Button size='sm' onClick={onDelete}>
            Bestaetigen
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
