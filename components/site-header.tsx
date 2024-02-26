import { CalendarWeek } from '@/components/calendar'
import Link from 'next/link'
import { UserNav } from './user-nav'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { Button } from './ui/button'
import { PlusCircledIcon, PlusIcon } from '@radix-ui/react-icons'
import { NewTaskDialog } from './newTask-dialog'

export function SiteHeader() {
  return (
    <header className='supports-backdrop-blur:bg-background/60 sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur'>
      <div className='mx-6 flex h-14 items-center justify-between'>
        <section>
          <Link href='/' className=''>
            {/* <span className="font-semibold">{siteConfig.title}</span> */}
            <span className='font-semibold'>Einsatzplan</span>
          </Link>
        </section>
        <section className='flex items-center justify-between gap-40'>
          {/* TODO: change the above to a grid if the underlying Tabs are not implemented */}
          <div></div>
          {/* TODO: not sure yet if I wanna implement different views. */}
          {/* <Tabs defaultValue='week' className=''>
            <TabsList>
              <TabsTrigger value='day'>Tag</TabsTrigger>
              <TabsTrigger value='week'>Woche</TabsTrigger>
              <TabsTrigger value='month'>Monat</TabsTrigger>
               TODO: render the tabscontent on trigger (different views)
               <TabsContent value="day"></TabsContent>
              <TabsContent value="week"></TabsContent>
              <TabsContent value="month"></TabsContent>
            </TabsList>
          </Tabs> */}

          {/* TODO: add className with proper background */}
          <CalendarWeek className='' />
          <NewTaskDialog />
        </section>
        <section>
          <UserNav />
        </section>
      </div>
    </header>
  )
}
