import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'
import { format } from 'date-fns'

interface CellSchoolHolidayProps {
  rowIndex: number
  dateFrom: Date
  dateTo: Date
}

export function CellSchoolHoliday({
  rowIndex,
  dateFrom,
  dateTo,
}: CellSchoolHolidayProps) {
  const formatDate = 'dd.MM'
  const formattedDateFrom = format(dateFrom, formatDate)
  const formattedDateTo = format(dateTo, formatDate)

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <div
            // TODO: im not sure about this yet.
            className={cn(
              'absolute -top-[9px] w-full',
              // 'absolute -top-[9px] left-0 right-0 ml-auto mr-auto w-1/2',
              rowIndex === 0 ? 'border-t border-pink-500' : ''
            )}
          />
        </TooltipTrigger>
        <TooltipContent className='bg-secondary shadow-sm'>
          <p className='text-center text-secondary-foreground'>
            Schulferien
            <br />
            vom {formattedDateFrom} - {formattedDateTo}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
