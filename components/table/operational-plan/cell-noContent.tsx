import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
} from '@/ui/dialog'
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from '@/components/ui/context-menu'
import { MultipleDialog } from '@/components/dialog/ui/dialog-multiple'
import TaskCreateForm from '@/components/form/task-create-form'
import { VacationCreateForm } from '@/components/form/vacation-create-form'
import { SicknessEntryCreateForm } from '@/components/form/sicknessEntry-create-form'
import { OnCallServiceForm } from '@/components/form/onCallService-form'
import { OptionType } from '@/data/schema'

interface CellNoContentProps {
  date: Date
  user: OptionType
  users: OptionType[]
}

export function CellNoContent({ date, user, users }: CellNoContentProps) {
  enum dialogs {
    Task = 'Aufgabe',
    OnCallService = 'Rufbereitschaft',
    HolidayEntry = 'Urlaubseintrag',
    SicknessEntry = 'Krankheitseintrag',
  }

  return (
    // TODO: try to change it, so the current row is still highlighted when the context menu is opened
    <MultipleDialog<dialogs>>
      {(mdb) => (
        <>
          <ContextMenu>
            <ContextMenuTrigger>
              <div className='h-full' />
            </ContextMenuTrigger>
            <ContextMenuContent>
              <mdb.Trigger value={dialogs.Task}>
                {/* TODO: add icon infront of the items (+ sign or sth) */}
                <ContextMenuItem>{dialogs.Task}</ContextMenuItem>
              </mdb.Trigger>
              <mdb.Trigger value={dialogs.OnCallService}>
                <ContextMenuItem>{dialogs.OnCallService}</ContextMenuItem>
              </mdb.Trigger>
              <mdb.Trigger value={dialogs.HolidayEntry}>
                <ContextMenuItem>{dialogs.HolidayEntry}</ContextMenuItem>
              </mdb.Trigger>
              <mdb.Trigger value={dialogs.SicknessEntry}>
                <ContextMenuItem>{dialogs.SicknessEntry}</ContextMenuItem>
              </mdb.Trigger>
            </ContextMenuContent>
          </ContextMenu>
          <mdb.Container value={dialogs.Task}>
            <Dialog>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent className='w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Neue Aufgabe</DialogTitle>
                  </DialogHeader>
                  <DialogDescription>
                    Hier kann eine neue Aufgabe erstellt werden.
                  </DialogDescription>
                  <TaskCreateForm date={date} users={users} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </mdb.Container>
          {/* TODO: either check before opening the context menu if the user is in the group for the onCallServices or remove it here */}
          <mdb.Container value={dialogs.OnCallService}>
            <Dialog>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent className='w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Neue Rufbereitschaft</DialogTitle>
                    <DialogDescription>
                      Hier kann eine neue Rufbereitschaft erstellt werden.
                    </DialogDescription>
                  </DialogHeader>
                  {/* TODO: this isnt currently working (the user is not being passed) */}
                  <OnCallServiceForm date={date} user={user} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </mdb.Container>
          <mdb.Container value={dialogs.HolidayEntry}>
            <Dialog>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent className='w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Neuer Urlaubeintrag</DialogTitle>
                    <DialogDescription>
                      Hier kann eine neuer Urlaubseintrag erstellt werden.
                    </DialogDescription>
                  </DialogHeader>
                  <VacationCreateForm date={date} user={user} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </mdb.Container>
          <mdb.Container value={dialogs.SicknessEntry}>
            <Dialog>
              <DialogPortal>
                <DialogOverlay />
                <DialogContent className='w-[400px]'>
                  <DialogHeader>
                    <DialogTitle>Neuer Krankheitseintrag</DialogTitle>
                    <DialogDescription>
                      Hier kann eine neuer Krankheitseintrag erstellt werden.
                    </DialogDescription>
                  </DialogHeader>
                  <SicknessEntryCreateForm date={date} user={user} />
                </DialogContent>
              </DialogPortal>
            </Dialog>
          </mdb.Container>
        </>
      )}
    </MultipleDialog>
  )
}
