'use client'

import { useRef, useState } from 'react'

import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { CheckCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { AlertCircle, Palmtree } from 'lucide-react'
import { Button } from '../ui/button'
import { DialogItem } from './ui/dialog-item'
import TaskCreateForm from '../form/task-create-form'
import { EmployeesTypeName } from '@/actions/get-employee/types'
import OnCallForm from '../form/onCall-form'
import { VacationForm } from '../form/vacation-form'

interface ActionsDialogProps {
  employees: EmployeesTypeName
  employeesOnCallService: EmployeesTypeName
}

export default function ActionsDialog({
  employees,
  employeesOnCallService,
}: ActionsDialogProps) {
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

  if (isDesktop) {
    return (
      <DropdownMenu open={dropdownOpen} onOpenChange={setDropdownOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' ref={dropdownTriggerRef}>
            <PlusCircledIcon className='mr-2 h-4 w-4' />
            Neu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          // align='start'
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
            title='Aufgabe'
            icon={<CheckCircledIcon className='mr-2 h-4 w-4' />}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogHeader>
              <DialogTitle>Neue Aufgabe</DialogTitle>
              <DialogDescription>
                Hier kann eine neue Aufgabe erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <TaskCreateForm
              employees={employees}
              onCreate={() => setOpen(false)}
            />
          </DialogItem>

          <DialogItem
            title='Rufbereitschaft'
            icon={<AlertCircle className='mr-2 h-4 w-4' />}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogHeader>
              <DialogTitle>Neue Rufbereitschaft</DialogTitle>
              <DialogDescription>
                Hier kann eine neue Rufbereitschaft erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <OnCallForm
              employees={employeesOnCallService}
              onCreate={() => setOpen(false)}
            />
          </DialogItem>

          <DialogItem
            title='Urlaubeintrag'
            icon={<Palmtree className='mr-2 h-4 w-4' />}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogHeader>
              <DialogTitle>Neuer Urlaubeintrag</DialogTitle>
              <DialogDescription>
                Hier kann eine neuer Urlaubseintrag erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <VacationForm onCreate={() => setOpen(false)} />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
