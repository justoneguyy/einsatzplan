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
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'
import { UsersIcon } from 'lucide-react'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'

import { Assignment, Employee } from '@/lib/types'
import { Badge } from './ui/badge'

interface AssignmentCardProps {
  employee: Employee
}

// TODO: add dynamic data
export function AssignmentCard({ employee }: AssignmentCardProps) {
  return (
    <Card className='rounded-md'>
      <CardContent className='p-2'>
        <div className='relative text-muted-foreground'>
          <p className='flex items-center gap-1 text-xs'>
            {/* {employee.assignments} */}
            8:00
            <ArrowRightIcon />
            {/* {assignment.timeTil} */}
            10:00
          </p>
          <TooltipProvider delayDuration={0}>
            {/* idk if I wanna keep it like this */}
            <Tooltip>
              {/* <Tooltip open={true}> */}
              <TooltipTrigger asChild>
                <span className='absolute right-2 top-0 h-2 w-2'>
                  {/* conditionally render. if 1 user is assigned render the PersonIcon, otherwise the UsersIcon */}
                  <PersonIcon className='h-4 w-4' />
                  {/* <UsersIcon className='h-4 w-4' /> */}
                </span>
              </TooltipTrigger>
              <TooltipContent usePortal={true} className='bg-transparent p-0'>
                <Card>
                  <CardHeader className='p-4'>
                    <CardTitle className='text-center text-base'>
                      Mitarbeiter
                    </CardTitle>
                  </CardHeader>
                  <CardContent className='flex justify-start px-4'>
                    <Badge className=''>Johne Doe</Badge>
                  </CardContent>
                </Card>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p>Coden</p>
      </CardContent>
    </Card>
  )
}
