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
import { AlertCircle, Palmtree, HeartPulse } from 'lucide-react'
import { OnCallServiceForm } from '../form/onCallService-form'
import TaskCreateForm from '../form/task-create-form'
import { VacationEntryForm } from '../form/vacationEntry-form'
import { Button } from '../ui/button'
import { DialogItem } from './ui/dialog-item'
import { SicknessEntryForm } from '../form/sicknessEntry-form'
import { UsersTypeName } from '@/data/user/types'

interface ActionsDialogProps {
  usersOnCallService: UsersTypeName
}

// TODO: change to new multi dialog
export default function ActionsDialog({
  usersOnCallService,
}: ActionsDialogProps) {
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

  // TODO: add general dialog

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
            className='w-[450px]'
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
            <TaskCreateForm />
          </DialogItem>

          <DialogItem
            className='w-[400px]'
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
            <OnCallServiceForm users={usersOnCallService} />
          </DialogItem>

          <DialogItem
            className='w-[400px]'
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
            <VacationEntryForm />
          </DialogItem>

          <DialogItem
            className='w-[400px]'
            title='Krankheitseintrag'
            icon={<HeartPulse className='mr-2 h-4 w-4' />}
            onSelect={handleDialogItemSelect}
            onOpenChange={handleDialogItemOpenChange}
          >
            <DialogHeader>
              <DialogTitle>Neuer Krankheitseintrag</DialogTitle>
              <DialogDescription>
                Hier kann eine neuer Krankheitseintrag erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <SicknessEntryForm />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}
