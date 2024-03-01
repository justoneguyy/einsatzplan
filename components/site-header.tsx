import Link from 'next/link'
import { NewTaskDialog } from './newTask-dialog'
import { UserNav } from './user-nav'
import { CalendarWeek } from './calendar-week'

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
            <div className='col-start-2'>
              <CalendarWeek />
            </div>
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
