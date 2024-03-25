'use client'

import { GetTaskType } from '@/actions/get-task/schema'
import { Dialog, DialogContent, DialogTrigger } from '@/ui/dialog'
import { useState } from 'react'
import TaskEditForm from '../form/task-edit-form'

interface TaskDialogProps {
  task: GetTaskType
  children: React.ReactNode
}

export function TaskDialog({ task, children }: TaskDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  // TODO: add mobil variant (make use of useMediaQuery)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        {/* <DialogHeader>
          <DialogTitle>Neuer Mitarbeiter</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hier können Mitarbeiter hinzugefügt werden.
        </DialogDescription> */}
        <TaskEditForm task={task} onCreate={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}
