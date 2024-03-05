'use client'

import { employees } from '@/_dev/mockdata/constants'
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
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
import { InfoCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { Card, CardContent } from './ui/card'
import { TaskForm } from './task-form'

export default function TaskDialog({
  children,
}: {
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const role = 'admin'
  // const role: string = 'user'

  // admin view
  if (role === 'admin') {
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Aufgabe 123</DialogTitle>
              <DialogDescription>
                Hier kann die Aufgabe bearbeitet werden.
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

    // TODO: on mobile, change this also into a dialog which takes up all the width and height
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
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Abbrechen</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  } else {
    // user view
    if (isDesktop) {
      return (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>{children}</DialogTrigger>
          <DialogContent>
            <DialogHeader>
              {/* {employee.assignments.task.title} */}
              <DialogTitle>Aufgabe 123</DialogTitle>
              {/* not sure yet if I wanna have descriptions inside the tasks */}
            </DialogHeader>
            <div>
              <div className='space-y-4 py-2 pb-4'>
                <div className='space-y-2'>
                  {/* TODO: add tooltips for form? */}
                  <Label htmlFor='title'>Titel</Label>
                  {/* {employee.assignments.task} */}
                  <Card size='md'>
                    <CardContent variant='md' size='md'>
                      <span>Projektarbeit</span>
                    </CardContent>
                  </Card>
                </div>
                <div className='flex flex-col space-y-2'>
                  <Label htmlFor='employees'>Mitarbeiter</Label>
                  {/* alle ausgewaehlten mitarbeiter aber trotzdem noch das default select */}
                  <Card size='md'>
                    <CardContent variant='md' size='md'>
                      <span>Max Mustermann</span>
                    </CardContent>
                  </Card>
                </div>
                {/* TODO: validate urls and automatically add the missing parts (https etc.) */}
                <div className='space-y-2'>
                  <Label htmlFor='ticket'>Ticket</Label>
                  <Card size='md'>
                    <CardContent variant='md' size='md'>
                      <span>1337 | redmine.uhlhorn.lan/1337</span>
                    </CardContent>
                  </Card>
                </div>
                {/* TODO: add time? */}
              </div>
            </div>
            <DialogFooter>
              <Button variant='outline' onClick={() => setOpen(false)}>
                Schliessen
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )
    }

    // TODO: on mobile, change this also into a dialog which takes up all the width and height
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
          {/*  */}
          <DrawerFooter className='pt-2'>
            <DrawerClose asChild>
              <Button variant='outline'>Abbrechen</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    )
  }
}
// 'use client'

// import { employees } from '@/_dev/mockdata/constants'
// import { Button } from '@/components/ui/button'
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from '@/components/ui/dialog'
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from '@/components/ui/drawer'
// import { useMediaQuery } from '@/lib/hooks/useMediaQuery'
// import { InfoCircledIcon, PlusCircledIcon } from '@radix-ui/react-icons'
// import { useState } from 'react'
// import { Label } from '@/components/ui/label'
// import { Input } from '@/components/ui/input'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/components/ui/tooltip'
// import { Card, CardContent } from './ui/card'

// export default function TaskDialog({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   const [open, setOpen] = useState(false)
//   const isDesktop = useMediaQuery('(min-width: 768px)')

//   const role = 'admin'
//   // const role: string = 'user'

//   // admin view
//   if (role === 'admin') {
//     if (isDesktop) {
//       return (
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>{children}</DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               {/* {employee.assignments.task.title} */}
//               <DialogTitle>Aufgabe 123</DialogTitle>
//               {/* not sure yet if I wanna have descriptions inside the tasks */}
//               <DialogDescription>
//                 Hier kann die Aufgabe bearbeitet werden.
//               </DialogDescription>
//             </DialogHeader>
//             <div>
//               <div className='space-y-4 py-2 pb-4'>
//                 <div className='space-y-2'>
//                   {/* TODO: add tooltips for form? */}
//                   <Label htmlFor='title'>Titel*</Label>
//                   {/* {employee.assignments.task} */}
//                   <Input id='title' value='Projektarbeit' />
//                 </div>
//                 <div className='flex flex-col space-y-2'>
//                   <Label htmlFor='employees'>Mitarbeiter*</Label>
//                   {/* alle ausgewaehlten mitarbeiter aber trotzdem noch das default select */}
//                   {/*  */}
//                 </div>
//                 {/* TODO: validate urls and automatically add the missing parts (https etc.) */}
//                 <div className='space-y-2'>
//                   <TooltipProvider delayDuration={0}>
//                     <Tooltip>
//                       <Label htmlFor='ticket'>Ticket</Label>
//                       <TooltipTrigger asChild>
//                         <Button
//                           variant='ghost'
//                           className='!mt-0 ml-0.5 h-4 w-4 cursor-default p-0'
//                         >
//                           <InfoCircledIcon className='h-4 w-4' />
//                         </Button>
//                       </TooltipTrigger>
//                       <TooltipContent
//                         sideOffset={10}
//                         className='bg-secondary text-secondary-foreground'
//                       >
//                         <p>
//                           Es reicht nur eine Ticketnummer, dann wird der Link
//                           automatisch erstellt.
//                           <br />
//                           Alternativ kann natuerlich auch der Link eingefuegt
//                           werden.
//                         </p>
//                       </TooltipContent>
//                     </Tooltip>
//                   </TooltipProvider>
//                   <Input
//                     id='ticket'
//                     placeholder='1337 | redmine.uhlhorn.lan/1337'
//                   />
//                 </div>
//                 {/* TODO: add time? */}
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant='outline' onClick={() => setOpen(false)}>
//                 Abbrechen
//               </Button>
//               <Button type='submit'>Speichern</Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )
//     }

//     // TODO: on mobile, change this also into a dialog which takes up all the width and height
//     return (
//       <Drawer open={open} onOpenChange={setOpen}>
//         <DrawerTrigger asChild>
//           <Button variant='outline'>
//             <PlusCircledIcon className='mr-2 h-4 w-4' />
//             Neue Aufgabe
//           </Button>
//         </DrawerTrigger>
//         <DrawerContent>
//           <DrawerHeader className='text-left'>
//             <DrawerTitle>Neue Aufgabe</DrawerTitle>
//             <DrawerDescription>
//               Hier kann eine neue Aufgabe erstellt werden.
//             </DrawerDescription>
//           </DrawerHeader>
//           {/*  */}
//           <DrawerFooter className='pt-2'>
//             <DrawerClose asChild>
//               <Button variant='outline'>Abbrechen</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     )
//   } else {
//     // user view
//     if (isDesktop) {
//       return (
//         <Dialog open={open} onOpenChange={setOpen}>
//           <DialogTrigger asChild>{children}</DialogTrigger>
//           <DialogContent>
//             <DialogHeader>
//               {/* {employee.assignments.task.title} */}
//               <DialogTitle>Aufgabe 123</DialogTitle>
//               {/* not sure yet if I wanna have descriptions inside the tasks */}
//             </DialogHeader>
//             <div>
//               <div className='space-y-4 py-2 pb-4'>
//                 <div className='space-y-2'>
//                   {/* TODO: add tooltips for form? */}
//                   <Label htmlFor='title'>Titel</Label>
//                   {/* {employee.assignments.task} */}
//                   <Card size='md'>
//                     <CardContent variant='md' size='md'>
//                       <span>Projektarbeit</span>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 <div className='flex flex-col space-y-2'>
//                   <Label htmlFor='employees'>Mitarbeiter</Label>
//                   {/* alle ausgewaehlten mitarbeiter aber trotzdem noch das default select */}
//                   <Card size='md'>
//                     <CardContent variant='md' size='md'>
//                       <span>Max Mustermann</span>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 {/* TODO: validate urls and automatically add the missing parts (https etc.) */}
//                 <div className='space-y-2'>
//                   <Label htmlFor='ticket'>Ticket</Label>
//                   <Card size='md'>
//                     <CardContent variant='md' size='md'>
//                       <span>1337 | redmine.uhlhorn.lan/1337</span>
//                     </CardContent>
//                   </Card>
//                 </div>
//                 {/* TODO: add time? */}
//               </div>
//             </div>
//             <DialogFooter>
//               <Button variant='outline' onClick={() => setOpen(false)}>
//                 Schliessen
//               </Button>
//             </DialogFooter>
//           </DialogContent>
//         </Dialog>
//       )
//     }

//     // TODO: on mobile, change this also into a dialog which takes up all the width and height
//     return (
//       <Drawer open={open} onOpenChange={setOpen}>
//         <DrawerTrigger asChild>
//           <Button variant='outline'>
//             <PlusCircledIcon className='mr-2 h-4 w-4' />
//             Neue Aufgabe
//           </Button>
//         </DrawerTrigger>
//         <DrawerContent>
//           <DrawerHeader className='text-left'>
//             <DrawerTitle>Neue Aufgabe</DrawerTitle>
//             <DrawerDescription>
//               Hier kann eine neue Aufgabe erstellt werden.
//             </DrawerDescription>
//           </DrawerHeader>
//           {/*  */}
//           <DrawerFooter className='pt-2'>
//             <DrawerClose asChild>
//               <Button variant='outline'>Abbrechen</Button>
//             </DrawerClose>
//           </DrawerFooter>
//         </DrawerContent>
//       </Drawer>
//     )
//   }
// }
