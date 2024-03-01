import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { ComboBoxResponsive } from './combobox-responsive'

// TODO: change this in general
// TODO: implement zod for validation
export function NewTaskDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          {/* <PlusIcon className='mr-2 h-4 w-4' /> */}
          Neue Aufgabe
        </Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-[425px]'>
        <DialogHeader>
          <DialogTitle>Neue Aufgabe</DialogTitle>
          <DialogDescription>
            Hier kann eine neue Aufgabe erstellt werden.
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='task' className='text-right'>
              Aufgabe
            </Label>
            <Input id='task' className='col-span-3' />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='username' className='text-right'>
              Mitarbeiter
            </Label>
            <div className='col-span-3'>
              {/* TODO: maybe im just gonna use a dropdown menu for this */}
              <ComboBoxResponsive />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button type='submit'>Aufgabe erstellen</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
