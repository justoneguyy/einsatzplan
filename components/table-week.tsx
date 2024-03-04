import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { employees, weekDays } from '@/_dev/mockdata/constants'
import { AssignmentCard } from './assignment-card'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import {
  Tooltip,
  TooltipContentNoAnimation,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip'
import { ScrollArea, ScrollBar } from './ui/scroll-area'
import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'
import { Input } from './ui/input'

export function TableWeek() {
  return (
    <div className='rounded-md border'>
      {/* TODO: change cursor to default (atleast for non-admins)? */}
      <Table>
        <TableHeader>
          <TableRow>
            {/* TODO: adjust width later on */}
            <TableHead className='w-[200px] border-r pl-4'>
              Mitarbeiter
            </TableHead>
            {weekDays.map((day) => (
              // TODO: also highlight the day in addition to tableRow?
              // TODO: format with date -> e.g. Mo, 24.02.
              <TableHead key={day} className='w-auto border-r pl-4'>
                {/* TODO: need to find a good solution for this later on. maybe even an option to blend out saturday/sunday */}
                {/* <TableHead key={day} className='min-w-[200px]'> */}
                {day}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {employees.map((employee) => (
            // TODO: rufbereitschaft needs to be implemented/shown somehow
            <TableRow key={employee.id}>
              <TableCell className='border-r font-medium'>
                <div className='flex items-center gap-1'>
                  {/* TODO: popover for clicked on employee OR just go to profile .. idk yet */}
                  {/* TODO: might make this a separate component since used already twice */}
                  {/* TODO: maybe use a popover with a button as trigger for this */}
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
                            className={`absolute bottom-0 right-0 h-2 w-2 rounded-full p-1 ${`bg-${employee.availability[0].color}-500`}`}
                          />
                        </TooltipTrigger>
                        <TooltipContentNoAnimation>
                          <p>Verfügbar</p>
                        </TooltipContentNoAnimation>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                  {/* TOOD: only lastname? */}
                  {employee.name}
                </div>
              </TableCell>
              {Object.keys(employee.assignments).map((day) => (
                <TableCell key={day} className='max-w-80 border-r'>
                  {/* TODO: change this to the underlying carousel */}
                  <Input type='text' className='h-16' />

                  {/* <div className='flex overflow-x-hidden'>
                    {employee.assignments[day]
                      // TODO: add this as an option (if only the current task for the current time should be shown (ofc based on view))
                      // TODO: implement dynamic filter based on current time
                      .filter(
                        (assignment) =>
                          assignment.timeFrom === '10:00' &&
                          assignment.timeTil === '12:00'
                      )
                      .map((assignment, index: number) => (
                        // TODO: this stuff must be editable for admin user
                        // TODO: change to AssignmentCard
                        // TODO: add ContextMenu for admin user to edit/delete/copy
                        <AssignmentCard
                          key={index}
                          assignment={assignment}
                          employee={employee}
                        />
                      ))}
                  </div> */}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
