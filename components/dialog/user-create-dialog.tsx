'use client'

import { GroupsType } from '@/actions/get-group/types'
import { RolesType } from '@/actions/get-role/type'
import { Button } from '@/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { useState } from 'react'
import UserCreateForm from '../form/user-create-form'

interface UserCreateDialogProps {
  roles: RolesType
  groups: GroupsType
}

export function UserCreateDialog({ roles, groups }: UserCreateDialogProps) {
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
        </DialogHeader>
        <DialogDescription>
          Hier können Mitarbeiter hinzugefügt werden.
        </DialogDescription>
        <UserCreateForm
          roles={roles}
          groups={groups}
          onCreate={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}
