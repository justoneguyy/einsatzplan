import { CalendarCaption } from '@/components/ui/calendar'
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
        {/* TODO: fix later so this only is shown on specific route */}
        <section className='flex items-center justify-between gap-40'>
          <Tabs defaultValue='week' className=''>
            <TabsList>
              <TabsTrigger value='day'>Tag</TabsTrigger>
              <TabsTrigger value='week'>Woche</TabsTrigger>
              <TabsTrigger value='month'>Monat</TabsTrigger>
              {/* TODO: render the tabscontent on trigger (different views) */}
              {/* <TabsContent value="day"></TabsContent>
              <TabsContent value="week"></TabsContent>
              <TabsContent value="month"></TabsContent> */}
            </TabsList>
          </Tabs>

          <CalendarCaption mode='single' className='rounded-md border' />
          {/* <CalendarFull mode='single' className='mt-96 rounded-md border' /> */}
          <NewTaskDialog />
        </section>
        <section>
          <UserNav />
        </section>
      </div>
    </header>
  )
}
