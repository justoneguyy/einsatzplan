import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'

import { EmployeeProps, TaskProps } from '@/lib/types'
import { Badge } from './ui/badge'
import { useEmployeeContext } from '@/lib/provider/employee-provider'

interface AssignmentCardProps extends TaskProps {
  firstName: string[]
  lastName: string[]
}

export function AssignmentCard({
  id,
  title,
  description,
  dateFrom,
  dateTil,
  timeFrom,
  timeTil,
  firstName,
  lastName,
}: AssignmentCardProps) {
  return (
    <Card className='rounded-md'>
      <CardContent className='flex h-14 min-h-14 flex-col p-2'>
        <div className='relative text-muted-foreground'>
          {timeFrom && timeTil && (
            <span className='mb-1 flex items-center gap-1 text-xs'>
              {timeFrom}
              <ArrowRightIcon />
              {timeTil}
            </span>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='absolute right-2 top-0'>
                  <PersonIcon className='h-4 w-4' />
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
                    <Badge className=''>
                      {/* TODO: either pass every employee which also has this task or remove it */}
                      {firstName} {lastName}
                    </Badge>
                  </CardContent>
                </Card>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex grow items-center'>
          <Label className='cursor-pointer leading-tight'>{title}</Label>
        </div>
      </CardContent>
    </Card>
  )
}
