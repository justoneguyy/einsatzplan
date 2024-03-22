import { AssignmentCard } from '@/components/assignment-card'
import TaskDialog from '@/components/dialog/task-dialog'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Employee, Task } from '@prisma/client'

type EmployeeCellProps = Omit<
  Employee,
  | 'id'
  | 'email'
  | 'roleId'
  | 'role'
  | 'groups'
  | 'availabilityId'
  | 'availability'
>

export const CellEmployee = ({
  firstName,
  lastName,
  initials,
  profilePicture,
}: EmployeeCellProps) => {
  return (
    <div className='flex items-center gap-2'>
      {/* TODO: popover for clicked on employee OR just go to profile .. idk yet */}
      {/* TODO: might make this a separate component since used already twice */}
      {/* TODO: maybe use a popover with a button as trigger for this */}
      <div className='relative'>
        <Avatar className='h-10 w-10'>
          {profilePicture && <AvatarImage src={profilePicture} alt='avatar' />}
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
        {/* <TooltipProvider delayDuration={0}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className='absolute bottom-0 right-0 h-2 w-2 rounded-full bg-green-500 p-1' />
            </TooltipTrigger>
            <TooltipContent>
              <p>Verfügbar</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider> */}
      </div>
      {/* TOOD: only lastname? */}
      <div className='flex flex-col items-center gap-1'>
        <p className='hidden lg:flex'>
          {firstName} {lastName}
        </p>
        {/* TODO: only show if the employee currently has Rufbereitschaft -> only one should be active at a time */}
        {/* {onCall && (
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Indicator className='w-3/4' />
              </TooltipTrigger>
              <TooltipContent>
                <p>
                  Hat aktuell Rufbereitschaft
                  <br />
                  (vom 01.01. - 08.01.)
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )} */}
      </div>
    </div>
  )
}

export const CellWeekday = ({
  id,
  title,
  description,
  dateFrom,
  dateTil,
  timeFrom,
  timeTil,
}: Task) => {
  return (
    <Carousel className=''>
      <CarouselContent className='-ml-3 cursor-pointer'>
        <CarouselItem key={id} className='basis-10/12 rounded-md pl-3'>
          {/* TODO: maybe these cards should just be quickly editable? dont know yet */}
          <TaskDialog>
            <AssignmentCard />
          </TaskDialog>
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  )
}
