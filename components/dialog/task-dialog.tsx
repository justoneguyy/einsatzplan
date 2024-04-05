'use client'

import { UserTaskType } from '@/data/user/types'
import { UnwrapArray } from '@/lib/types'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@/ui/dialog'
import { useState } from 'react'
import TaskEditForm from '../form/task-edit-form'

import { AssignmentCard } from '../card/assignment-card'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '../ui/context-menu'
import { MultipleDialog } from './ui/dialog-multiple'
import TaskDeleteForm from '../form/task-delete-form'

interface TaskDialogProps {
  task: UnwrapArray<UserTaskType['tasks']>
}

export function TaskDialog({ task }: TaskDialogProps) {
  const [open, setOpen] = useState<boolean>(false)

  const handleOpen = () => {
    setOpen(true)
  }

  // TODO: add mobil variant (make use of useMediaQuery)
  // TODO: add user view (this is currently the admin view with an editable form.)
  // or make the context menu only accessible to admins and the assignment card is just a read only card?

  enum dialogs {
    Edit = 'Bearbeiten',
    Delete = 'Löschen',
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <MultipleDialog<dialogs>>
          {(mdb) => (
            <>
              <ContextMenu>
                <ContextMenuTrigger>
                  <AssignmentCard task={task} onOpen={handleOpen} />
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <mdb.Trigger value={dialogs.Edit}>
                    <ContextMenuItem>Bearbeiten</ContextMenuItem>
                  </mdb.Trigger>
                  <mdb.Trigger value={dialogs.Delete}>
                    <ContextMenuItem>Loeschen</ContextMenuItem>
                  </mdb.Trigger>
                </ContextMenuContent>
              </ContextMenu>
              <mdb.Container value={dialogs.Edit}>
                <Dialog>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Aufgabe bearbeiten</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        Hier kann die Aufgabe bearbeitet werden
                      </DialogDescription>
                      <TaskEditForm task={task} />
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </mdb.Container>
              <mdb.Container value={dialogs.Delete}>
                <Dialog>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent>
                      <DialogHeader className='space-y-2'>
                        <DialogTitle>Warnung</DialogTitle>
                        {/* TODO: add more informations? */}
                        <DialogDescription>
                          Sicher dass die Aufgabe{' '}
                          <span className='text-accent-foreground'>
                            {task.task.title}
                          </span>{' '}
                          geloescht werden soll?
                        </DialogDescription>
                      </DialogHeader>
                      <TaskDeleteForm task={task} />
                    </DialogContent>
                  </DialogPortal>
                </Dialog>
              </mdb.Container>
            </>
          )}
        </MultipleDialog>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Aufgabe bearbeiten</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hier kann die Aufgabe bearbeitet werden
        </DialogDescription>
        <TaskEditForm task={task} />
      </DialogContent>
    </Dialog>
  )
}
