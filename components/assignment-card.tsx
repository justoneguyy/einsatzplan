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
} from './ui/tooltip'

import { Assignment, Employee } from '@/lib/types'

interface AssignmentCardProps {
  assignment: Assignment
  employee: Employee
}

export function AssignmentCard({ assignment, employee }: AssignmentCardProps) {
  return (
    <Card className='max-h-14 min-w-[200px] rounded-md'>
      {/* <CardHeader>
        <CardTitle>Create project</CardTitle>
        <CardDescription>Deploy your new project in one-click.</CardDescription>
      </CardHeader> */}
      <CardContent className='p-2'>
        <div className='relative text-muted-foreground'>
          <p className='flex items-center gap-1 text-xs'>
            {assignment.timeFrom}
            <ArrowRightIcon />
            {assignment.timeTil}
          </p>
          {/* maybe change this into a button & popover */}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='absolute right-2 top-0 h-2 w-2'>
                  <PersonIcon className='h-4 w-4' />
                  {/* <UsersIcon className='h-4 w-4' /> */}
                </span>
              </TooltipTrigger>
              <TooltipContent>
                <p>{employee.name}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <p>{assignment.task}</p>
      </CardContent>
    </Card>
  )
}
