'use client'

import { useState } from 'react'

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
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { MultipleDialog } from '@/components/dialog/ui/dialog-multiple'
import { Vacation } from '@prisma/client'
import { VacationEditForm } from '@/components/form/vacation-edit-form'
import VacationDeleteForm from '@/components/form/vacation-delete-form'

interface CellVacationProps {
  vacation: Vacation
}

export function CellVacation({ vacation }: CellVacationProps) {
  const [open, setOpen] = useState<boolean>(false)

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
                  {/* TODO: add duration? */}
                  <div className='flex h-full items-center justify-center rounded-md bg-green-950'>
                    <p className='select-none'>{vacation.type}</p>
                  </div>
                </ContextMenuTrigger>
                <ContextMenuContent>
                  <mdb.Trigger value={dialogs.Edit}>
                    <ContextMenuItem>{dialogs.Edit}</ContextMenuItem>
                  </mdb.Trigger>
                  <mdb.Trigger value={dialogs.Delete}>
                    <ContextMenuItem>{dialogs.Delete}</ContextMenuItem>
                  </mdb.Trigger>
                </ContextMenuContent>
              </ContextMenu>
              <mdb.Container value={dialogs.Edit}>
                <Dialog>
                  <DialogPortal>
                    <DialogOverlay />
                    <DialogContent className='w-[400px]'>
                      <DialogHeader>
                        <DialogTitle>Urlaubseintrag bearbeiten</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        Hier kann der Urlaubseintrag bearbeitet werden
                      </DialogDescription>
                      <VacationEditForm vacation={vacation} />
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
                        <DialogDescription>
                          Sicher dass der Urlaubseintrag geloescht werden soll?
                        </DialogDescription>
                      </DialogHeader>
                      <VacationDeleteForm vacation={vacation} />
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
          <DialogTitle>Urlaubseintrag bearbeiten</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hier kann der Urlaubseintrag bearbeitet werden
        </DialogDescription>
        <VacationEditForm vacation={vacation} />
      </DialogContent>
    </Dialog>
  )
}
