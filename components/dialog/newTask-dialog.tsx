'use client'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { TaskForm } from '../form/task-form'

export default function NewTaskDialog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant='outline'>
            <PlusCircledIcon className='mr-2 h-4 w-4' />
            Neue Aufgabe
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neue Aufgabe</DialogTitle>
            <DialogDescription>
              Hier kann eine neue Aufgabe erstellt werden.
            </DialogDescription>
          </DialogHeader>
          <TaskForm
            onCancel={() => setOpen(false)}
            onCreate={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    )
  }

  // TODO: not sure yet if I wanna stay with this drawer or change this into a dialog which takes up all the width and height
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline'>
          <PlusCircledIcon className='mr-2 h-4 w-4' />
          Neue Aufgabe
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className='text-left'>
          <DrawerTitle>Neue Aufgabe</DrawerTitle>
          <DrawerDescription>
            Hier kann eine neue Aufgabe erstellt werden.
          </DrawerDescription>
        </DrawerHeader>
        <TaskForm
          onCancel={() => setOpen(false)}
          onCreate={() => setOpen(false)}
        />
      </DrawerContent>
    </Drawer>
  )
}
