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
import { SicknessEntryEditForm } from '@/components/form/sicknessEntry-edit-form'
import { SicknessEntry } from '@prisma/client'
import SicknessEntryDeleteForm from '@/components/form/sicknessEntry-delete-form'

interface CellSicknessEntryProps {
  sicknessEntry: SicknessEntry
}

export function CellSicknessEntry({ sicknessEntry }: CellSicknessEntryProps) {
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
                  <div className='flex h-full items-center justify-center rounded-md bg-red-950'>
                    <p className='select-none'>{sicknessEntry.title}</p>
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
                        <DialogTitle>Krankheitseintrag bearbeiten</DialogTitle>
                      </DialogHeader>
                      <DialogDescription>
                        Hier kann der Krankheitseintrag bearbeitet werden
                      </DialogDescription>
                      <SicknessEntryEditForm sicknessEntry={sicknessEntry} />
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
                          Sicher dass der Krankheitseintrag geloescht werden
                          soll?
                        </DialogDescription>
                      </DialogHeader>
                      <SicknessEntryDeleteForm sicknessEntry={sicknessEntry} />
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
          <DialogTitle>Krankheitseintrag bearbeiten</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Hier kann der Krankheitseintrag bearbeitet werden
        </DialogDescription>
        <SicknessEntryEditForm sicknessEntry={sicknessEntry} />
      </DialogContent>
    </Dialog>
  )
}
