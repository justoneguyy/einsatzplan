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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import {
  CheckCircledIcon,
  PersonIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { ReactElement, ReactNode, Ref, useState } from 'react'
import { TaskForm } from '../form/task-form'
import { AlertCircle, Palmtree } from 'lucide-react'
import { VacationForm } from '../form/vacation-form'
import { OnCallForm } from '../form/onCall-form'

export default function CreateDialog() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  if (isDesktop) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline'>
            <PlusCircledIcon className='mr-2 h-4 w-4' />
            Neu
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='start'>
          <DialogItem
            title='Aufgabe'
            icon={<CheckCircledIcon className='mr-2 h-4 w-4' />}
          >
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
          </DialogItem>

          <DialogItem
            title='Rufbereitschaft'
            icon={<AlertCircle className='mr-2 h-4 w-4' />}
          >
            <DialogHeader>
              <DialogTitle>Neue Rufbereitschaft</DialogTitle>
              <DialogDescription>
                Hier kann eine neue Rufbereitschaft erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <OnCallForm
              onCancel={() => setOpen(false)}
              onCreate={() => setOpen(false)}
            />
          </DialogItem>

          <DialogItem
            title='Urlaubeintrag'
            icon={<Palmtree className='mr-2 h-4 w-4' />}
          >
            <DialogHeader>
              <DialogTitle>Neuer Urlaubeintrag</DialogTitle>
              <DialogDescription>
                Hier kann eine neuer Urlaubseintrag erstellt werden.
              </DialogDescription>
            </DialogHeader>
            <VacationForm
              onCancel={() => setOpen(false)}
              onCreate={() => setOpen(false)}
            />
          </DialogItem>
        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
}

interface DialogItemProps {
  children: ReactNode
  onSelect?: () => void
  forwardedRef?: Ref<HTMLDivElement>
  title: string
  icon: ReactElement
}

const DialogItem: React.FC<DialogItemProps> = ({
  children,
  onSelect,
  forwardedRef,
  title,
  icon,
}) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DropdownMenuItem
          ref={forwardedRef}
          className='DropdownMenuItem'
          onSelect={(event) => {
            event.preventDefault()
            onSelect && onSelect()
          }}
        >
          {icon}
          <span>{title}</span>
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  )
}

// 'use client'

// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import {
//   Drawer,
//   DrawerContent,
//   DrawerDescription,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from '@/ui/dropdown-menu'
// import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
// import {
//   CheckCircledIcon,
//   PersonIcon,
//   PlusCircledIcon,
// } from '@radix-ui/react-icons'
// import { useState } from 'react'
// import { TaskForm } from './task-form'
// import { AlertCircle, Palmtree } from 'lucide-react'

// export default function CreateDialog() {
//   const [open, setOpen] = useState(false)
//   const isDesktop = useMediaQuery('(min-width: 768px)')

//   if (isDesktop) {
//     return (
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DropdownMenu>
//           <DropdownMenuTrigger>
//             <Button variant='outline'>
//               <PlusCircledIcon className='mr-2 h-4 w-4' />
//               Neu
//             </Button>
//           </DropdownMenuTrigger>
//           <DropdownMenuContent align='start'>
//             <DialogTrigger asChild>
//               <DropdownMenuItem>
//                 <CheckCircledIcon className='mr-2 h-4 w-4' />
//                 <span>Neue Aufgabe</span>
//               </DropdownMenuItem>
//             </DialogTrigger>
//           </DropdownMenuContent>
//         </DropdownMenu>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>Neue Aufgabe</DialogTitle>
//             <DialogDescription>
//               Hier kann eine neue Aufgabe erstellt werden.
//             </DialogDescription>
//           </DialogHeader>
//           <TaskForm
//             onCancel={() => setOpen(false)}
//             onCreate={() => setOpen(false)}
//           />
//         </DialogContent>
//       </Dialog>
//     )
//   }
// }
