import Link from 'next/link'
import { UserNav } from '@/components/user-nav'
import { CalendarWeek } from '@/components/calendar-week'
import NewTaskDialog from '@/components/dialog/newTask-dialog'
import { Button } from './ui/button'
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu'
import {
  ArrowRightIcon,
  PersonIcon,
  PlusCircledIcon,
} from '@radix-ui/react-icons'
import { AlertCircle, CheckCircle, Palmtree } from 'lucide-react'
import CreateDialog from '@/components/dialog/create-dialog'

export function SiteHeader() {
  const role: string = 'admin'

  // admin layout
  if (role === 'admin') {
    return (
      <header className='supports-backdrop-blur:bg-background/60 top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
        <div className='mx-6 grid grid-cols-6 items-center py-3'>
          <section className='col-span-1'>
            <Link href='/' className=''>
              <span className='font-semibold'>Einsatzplan</span>
            </Link>
          </section>
          <section className='col-span-4 justify-self-center'>
            <div className='grid grid-cols-3 items-center gap-32'>
              <div className='justify-self-end'>
                {/* TODO: maybe rename, not sure yet */}
                <Button variant='outline'>Heute</Button>
              </div>
              <div>
                <CalendarWeek />
              </div>
              <div>
                <CreateDialog />
              </div>
            </div>
          </section>
          <section className='col-span-1 justify-self-end'>
            <UserNav />
          </section>
        </div>
      </header>
    )
  } else {
    // user layout
    return (
      <header className='supports-backdrop-blur:bg-background/60 top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
        <div className='mx-6 grid h-[60px] grid-cols-6 items-center'>
          <section className='col-span-1'>
            <Link href='/' className=''>
              <span className='font-semibold'>Einsatzplan</span>
            </Link>
          </section>
          <section className='col-span-4 justify-self-center'>
            <div className='grid grid-cols-3 items-center gap-28'>
              <div className='justify-self-end'>
                {/* TODO: maybe rename, not sure yet */}
                <Button variant='outline'>Heute</Button>
              </div>
              <div>
                <CalendarWeek />
              </div>
            </div>
          </section>
          <section className='col-span-1 justify-self-end'>
            <UserNav />
          </section>
        </div>
      </header>
    )
  }
}
