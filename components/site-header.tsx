import {
  getEmployeesName,
  getEmployeesOnCallService,
} from '@/actions/get-employee'
import { CalendarWeek } from '@/components/calendar-week'
import { UserNav } from '@/components/user-nav'
import Link from 'next/link'
import ActionsDialog from './dialog/actions-dialog'
import { TodayButton } from './today-button'
import { Button } from './ui/button'

// TODO: prob gonna change this to someting more intuitive
// TODO: also, maybe dont use two functions but render these based on route. dont know if that is possible & more perfomant
export function SiteHeader() {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='mx-6 grid grid-cols-3 items-center py-3'>
        <section className=''>
          <Link href='/' className=''>
            <span className='font-semibold'>Einsatzplan</span>
          </Link>
        </section>
        <section className='justify-self-center'>
          <Link href='/' className=''>
            <span className='text-primary/50 hover:text-primary'>
              Dashboard
            </span>
          </Link>
        </section>
        <section className='justify-self-end'>
          <UserNav />
        </section>
      </div>
    </header>
  )
}

export async function SiteHeaderDashboard() {
  const employees = await getEmployeesName()
  const employeesOnCallService = await getEmployeesOnCallService()

  const role: string = 'admin'

  // admin layout
  if (role === 'admin') {
    return (
      <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
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
                <TodayButton />
              </div>
              <div>
                <CalendarWeek />
              </div>
              <div>
                <ActionsDialog
                  employees={employees}
                  employeesOnCallService={employeesOnCallService}
                />
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
