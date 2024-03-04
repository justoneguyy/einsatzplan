'use client'

import { ExitIcon, LaptopIcon, MoonIcon, SunIcon } from '@radix-ui/react-icons'
import { Settings } from 'lucide-react'
import { useTheme } from 'next-themes'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from './ui/menubar'
import {
  Tooltip,
  TooltipContentNoAnimation,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function UserNav() {
  const { setTheme } = useTheme()

  return (
    <Menubar className='rounded-none border-b border-none p-0'>
      <MenubarMenu>
        <MenubarTrigger asChild>
          <Button variant='ghost' className='relative h-10 w-10 rounded-full'>
            <div className='relative'>
              <Avatar className='h-10 w-10'>
                <AvatarImage src='/images/enton.png' alt='avatar' />
                {/* TODO: change fallback to first charavter of firstname + lastname */}
                <AvatarFallback>ET</AvatarFallback>
              </Avatar>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <span
                      className={`absolute bottom-0 right-0 h-2 w-2 rounded-full p-1 ${'bg-green-500'}`}
                    />
                  </TooltipTrigger>
                  <TooltipContentNoAnimation className=''>
                    <p>Verfügbar</p>
                  </TooltipContentNoAnimation>
                </Tooltip>
              </TooltipProvider>
            </div>
          </Button>
        </MenubarTrigger>
        <MenubarContent className='min-w-40' align='end'>
          <MenubarLabel className='font-normal'>
            <div className='flex flex-col space-y-1'>
              <p className='text-center text-sm font-medium leading-none'>
                Justin Hoffmann
              </p>
            </div>
          </MenubarLabel>
          <MenubarSeparator />
          <MenubarItem className='cursor-pointer'>
            {/* TODO: currently if you click on this link, the menubar is still shown -- fix this */}
            <Settings className='mr-2 h-4 w-4' />
            <Link href='/settings'>Einstellungen</Link>
          </MenubarItem>
          <MenubarSub>
            <MenubarSubTrigger>
              <SunIcon className='mr-2 h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
              <MoonIcon className='absolute mr-2 h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
              <span className='sr-only'>Toggle theme</span>
              <p>Theme</p>
            </MenubarSubTrigger>
            <MenubarSubContent>
              <MenubarItem onClick={() => setTheme('light')}>
                <SunIcon className='mr-2 h-4 w-4' />
                <span>Hell</span>
              </MenubarItem>
              <MenubarItem onClick={() => setTheme('dark')}>
                <MoonIcon className='mr-2 h-4 w-4' />
                <span>Dunkel</span>
              </MenubarItem>
              <MenubarItem onClick={() => setTheme('system')}>
                <LaptopIcon className='mr-2 h-4 w-4' />
                <span>System</span>
              </MenubarItem>
            </MenubarSubContent>
          </MenubarSub>
          <MenubarSeparator />
          <MenubarItem className='cursor-pointer'>
            <ExitIcon className='mr-2 h-4 w-4' />
            <Link href='/logout'>Abmelden</Link>
          </MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  )
}
