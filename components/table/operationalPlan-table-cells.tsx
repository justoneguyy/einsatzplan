import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { UserTaskType, UserType } from '@/data/user/types'

import { HolidayType } from '@/data/holiday/types'
import { SchoolHolidayType } from '@/data/schoolHoliday/types'
import { getWeekInterval } from '@/lib/helper/getWeekInterval'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { isSameDay, isWithinInterval, setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'
import { TaskDialog } from '../dialog/task-dialog'
import { Indicator } from '../ui/indicator'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '../ui/tooltip'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

// TODO: make this more elegant
type CellUserProps = Omit<
  UserTaskType,
  'id' | 'email' | 'roleId' | 'role' | 'tasks'
> & {}
// type CellUserProps = User & {}

export const CellUser = ({
  firstName,
  lastName,
  initials,
  profilePicture,
  groups,
  onCallServices,
}: CellUserProps) => {
  return (
    <div className='flex items-center gap-2'>
      {/* TODO: popover for clicked on user OR just go to profile .. idk yet */}
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
        {groups.some((group) => group.group.name === 'Rufbereitschaft') && (
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
        )}
      </div>
    </div>
  )
}

interface CellWeekdayProps {
  index: number
  rowIndex: number
  tasks: UserTaskType['tasks']
  holidays: HolidayType[]
  schoolHolidays: SchoolHolidayType[]
}

export const CellWeekday = ({
  index,
  rowIndex,
  tasks,
  holidays,
  schoolHolidays,
}: CellWeekdayProps) => {
  const daysOfWeek = getWeekInterval()
  const day = daysOfWeek[index]

  // 1. priority - holidays
  const holidayForDay = holidays.find((holiday) => {
    const holidayDate = new Date(holiday.date)

    return isSameDay(day, holidayDate)
  })

  // 2. priority - vocationalSchoolDays for apprentices
  // I think this should be in indicator on the left side of the cell / on the right side of the CellUserProps
  const schoolHolidayForDay = schoolHolidays.find((schoolHoliday) => {
    const schoolHolidayStartDate = new Date(schoolHoliday.dateFrom)
    const schoolHolidayEndDate = new Date(schoolHoliday.dateTo)

    return isWithinInterval(day, {
      start: schoolHolidayStartDate,
      end: schoolHolidayEndDate,
    })
  })

  // 3. priority - vacation days (maybe the same as with sickness days)

  // 4. priority - sickness days (these should render a fully rendered red cell for the normal users. the admins should also have this background with the task(s) which he would have had on this day, so it can still be editable. )

  // 5. priority - tasks
  const tasksForDay = tasks.filter((task) => {
    const taskStartDate = new Date(task.task.dateFrom)
    const taskEndDate = new Date(task.task.dateTo)

    return isWithinInterval(day, { start: taskStartDate, end: taskEndDate })
  })

  // 6. onCallService - should have a like 50% opacity baby-blueish background

  return holidayForDay ? (
    // TODO: make this prettier
    <div className='bg-green-950 flex h-full items-center justify-center rounded-md'>
      <p className='select-none'>{holidayForDay.name}</p>
    </div>
  ) : (
    <Carousel className='h-full'>
      <CarouselContent className='-ml-3 h-full cursor-pointer'>
        {tasksForDay.map((task) => (
          // TODO: rotate the carousel items according to the current time
          // TODO: if only one task is present, show it in full width
          // TODO: make these draggable for the admin (quick re-assign)?
          <CarouselItem
            key={task.task.id}
            className='basis-10/12 rounded-md pl-3'
          >
            <TaskDialog task={task} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )

  // TODO: either use this or an indicator at the right side of the apprentices in the CellUserProps
  // const schoolHolidayCellStyle =
  //   schoolHolidayForDay && rowIndex === 0
  //     ? 'border-t border-pink-500 -mt-4'
  //     : ''

  // return (
  //   <div className={`h-full ${schoolHolidayCellStyle}`}>
  //     {holidayForDay ? (
  //       <div className='bg-green-950 flex h-full items-center justify-center rounded-md'>
  //         <p className='select-none'>{holidayForDay.name}</p>
  //       </div>
  //     ) : (
  //       <Carousel className='h-full'>
  //         <CarouselContent className='-ml-3 h-full cursor-pointer'>
  //           {tasksForDay.map((task) => (
  //             <CarouselItem
  //               key={task.task.id}
  //               className='basis-10/12 rounded-md pl-3'
  //             >
  //               <TaskDialog task={task} />
  //             </CarouselItem>
  //           ))}
  //         </CarouselContent>
  //       </Carousel>
  //     )}
  //   </div>
  // )
}

// TODO: use this to order the tasks depending on their time (maybe we should do this in the actual call, dont know yet)
// function sortTasks(tasks: UserTaskType[]): UserTaskType[] {
//   // Filter tasks with both timeFrom and timeTo defined
//   const tasksWithTime = tasks.filter((task) => task.timeFrom && task.timeTo)
//   // Sort tasks by their timeFrom and timeTo values
//   tasksWithTime.sort((a, b) => {
//     // Convert timeFrom and timeTo to Date objects for comparison
//     const timeAFrom = new Date(a.timeFrom!)
//     const timeBFrom = new Date(b.timeFrom!)
//     const timeATil = new Date(a.timeTo!)
//     const timeBTil = new Date(b.timeTo!)

//     // Compare timeFrom and timeTo of tasks
//     if (timeAFrom < timeBFrom && timeATil < timeBTil) return -1
//     if (timeAFrom > timeBFrom && timeATil > timeBTil) return 1
//     return 0
//   })

//   // Concatenate sorted tasks with tasks without timeFrom and timeTo
//   const sortedTasks = [
//     ...tasksWithTime,
//     ...tasks.filter((task) => !task.timeFrom || !task.timeTo),
//   ]

//   return sortedTasks
// }
