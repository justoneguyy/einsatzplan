import Link from 'next/link'
import { UserNav } from '@/components/user-nav'
import { CalendarWeek } from '@/components/calendar-week'
import NewTaskDialog from '@/components/newTask-dialog'

export function SiteHeader() {
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
            {/* TODO: add 'jump to today' button */}
            <div className='col-start-2'>
              <CalendarWeek />
            </div>
            {/* TODO: only render as admin */}
            <div>
              <NewTaskDialog />
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
