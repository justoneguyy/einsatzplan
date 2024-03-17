'use client'

import { GroupsType } from '@/actions/get-group/types'
import { RolesType } from '@/actions/get-role/type'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { useState } from 'react'
import EmployeeForm from '../form/employee-form'

interface EmployeeDialogProps {
  roles: RolesType
  groups: GroupsType
}

export function EmployeeDialog({ roles, groups }: EmployeeDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  // TODO: add mobil variant (make use of useMediaQuery)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant='outline'>Mitarbeiter hinzugefügen</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Neuer Mitarbeiter</DialogTitle>
          <DialogClose />
        </DialogHeader>
        <DialogDescription>
          Hier können Mitarbeiter hinzugefügt werden.
        </DialogDescription>
        <EmployeeForm
          roles={roles}
          groups={groups}
          onCreate={() => setOpen(false)}
          onCancel={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
