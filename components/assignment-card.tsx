import * as React from 'react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { PersonIcon } from '@radix-ui/react-icons'
import { UsersIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContentNoAnimation,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'

export function AssignmentCard() {
  return (
    <Card className='w-[200px] rounded-md'>
      {/* <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader> */}
      <CardContent className='p-2'>
        <div className='relative text-muted-foreground'>
          <p className='flex items-center gap-1 text-xs'>08:00 - 09:00</p>
          {/* maybe change this into a button & popover */}
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='absolute right-2 top-0 h-2 w-2'>
                  <PersonIcon className='h-4 w-4' />
                  {/* <UsersIcon className='h-4 w-4' /> */}
                </span>
              </TooltipTrigger>
              {/* TODO: it seems that Tooltips still have a delay. fix this. */}
              <TooltipContentNoAnimation>
                <p>Add Card here</p>
              </TooltipContentNoAnimation>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p>Service Einsatz Glinde</p>
      </CardContent>
    </Card>
  )
}
