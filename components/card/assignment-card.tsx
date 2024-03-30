import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'

import { UserProps, TaskProps } from '@/lib/types'
import { Badge } from '../ui/badge'
import { useUserContext } from '@/lib/provider/user-provider'
import { format } from 'date-fns'

interface AssignmentCardProps extends TaskProps {
  firstName?: string[]
  lastName?: string[]
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
  const formattedDateFrom = format(dateFrom, 'dd.MM.yyyy')
  const formattedDateTil = format(dateTil, 'dd.MM.yyyy')

  return (
    <Card className='rounded-md'>
      <CardContent className='flex h-14 min-h-14 select-none flex-col p-2'>
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
                      {firstName} {lastName}
                    </Badge>
                  </CardContent>
                </Card>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex grow items-center'>
          {/* <Label className='cursor-pointer leading-tight'>
            {formattedDateFrom} - {formattedDateTil}
          </Label> */}
          <Label className='cursor-pointer leading-tight'>{title}</Label>
        </div>
      </CardContent>
    </Card>
  )
}
