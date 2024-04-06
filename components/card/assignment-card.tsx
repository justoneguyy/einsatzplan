import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'

import { UserTaskType } from '@/data/user/types'
import { formatTime, isMidnight } from '@/lib/helper/date-utils'
import { UnwrapArray } from '@/lib/types'
import { UsersRound } from 'lucide-react'
import { Badge } from '../ui/badge'

interface AssignmentCardProps {
  task: UnwrapArray<UserTaskType['tasks']>
  onOpen: () => void
}

export function AssignmentCard({ task, onOpen }: AssignmentCardProps) {
  const title = task.task.title
  const users = task.task.users

  const isMidnightStart = isMidnight(task.task.dateFrom)
  const isMidnightEnd = isMidnight(task.task.dateTo)

  const timeFrom = formatTime(task.task.dateFrom, isMidnightStart, 'HH:mm')
  const timeTo = formatTime(task.task.dateTo, isMidnightEnd, 'HH:mm')

  return (
    <Card className='h-full rounded-md shadow-none' onClick={onOpen}>
      <CardContent className='flex h-full min-w-20 select-none flex-col p-2'>
        <div className='relative text-muted-foreground'>
          {timeFrom && timeTo && (
            <span className='mb-1 flex items-center gap-1 text-xs'>
              {timeFrom}
              <ArrowRightIcon />
              {timeTo}
            </span>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='absolute right-0 top-0'>
                  {users.length > 1 ? (
                    <UsersRound className='h-4 w-4' />
                  ) : (
                    <PersonIcon className='h-4 w-4' />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent usePortal={true} className='bg-transparent p-0'>
                <Card>
                  <CardHeader className='p-4'>
                    <CardTitle className='text-center text-base'>
                      Mitarbeiter
                    </CardTitle>
                  </CardHeader>
                  {/* TODO: make this prettier */}
                  <CardContent className='flex flex-col justify-start gap-2 px-4'>
                    {task.task.users.map((user) => {
                      return (
                        <Badge key={user.id} className=''>
                          {user.user.firstName} {user.user.lastName}
                        </Badge>
                      )
                    })}
                  </CardContent>
                </Card>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex grow items-center'>
          <p className='cursor-pointer leading-tight'>{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}
