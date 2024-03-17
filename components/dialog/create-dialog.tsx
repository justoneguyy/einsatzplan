'use client'

import { Button } from '@/components/ui/button'
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu'
import { CheckCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { AlertCircle, Palmtree } from 'lucide-react'
import { useState } from 'react'
import { OnCallForm } from '../form/onCall-form'
import { TaskForm } from '../form/task-form'
import { VacationForm } from '../form/vacation-form'
import { DialogItem } from './ui/dialog-item'

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

// interface DialogItemProps {
//   children: ReactNode
//   onSelect?: () => void
//   forwardedRef?: Ref<HTMLDivElement>
//   title: string
//   icon: ReactElement
// }

// const DialogItem: React.FC<DialogItemProps> = ({
//   children,
//   onSelect,
//   forwardedRef,
//   title,
//   icon,
// }) => {
//   return (
//     <Dialog>
//       <DialogTrigger asChild>
//         <DropdownMenuItem
//           ref={forwardedRef}
//           className='DropdownMenuItem'
//           onSelect={(event) => {
//             event.preventDefault()
//             onSelect && onSelect()
//           }}
//         >
//           {icon}
//           <span>{title}</span>
//         </DropdownMenuItem>
//       </DialogTrigger>
//       <DialogContent>{children}</DialogContent>
//     </Dialog>
//   )
// }
