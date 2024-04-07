import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { UserTaskType } from '@/data/user/types'

import { OperationalPlanDataType } from '@/actions/aggregate-operationalPlan-data'
import { HolidayType } from '@/data/holiday/types'
import { OnCallServiceType } from '@/data/onCallService/types'
import { OptionType } from '@/data/schema'
import { SchoolHolidayType } from '@/data/schoolHoliday/types'
import { getWeekInterval } from '@/lib/helper/date-utils'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { SicknessEntry } from '@prisma/client'
import { isSameDay, isWithinInterval } from 'date-fns'
import { TaskDialog } from '../../dialog/task-dialog'
import { CellNoContent } from './cell-noContent'
import { CellSchoolHoliday } from './cell-schoolHoliday'
import { CellSicknessEntry } from './cell-sicknessEntry'
import { CellVacation } from './cell-vacation'

// TODO: component cleanup

// TODO: make this more elegant
// type CellUserProps = Omit<
//   UserTaskType,
//   'id' | 'email' | 'roleId' | 'role' | 'tasks' | 'groups' | 'onCallServices'
// > & {
//   index: number
// }

type CellUserProps = Pick<
  UserTaskType,
  'firstName' | 'lastName' | 'initials' | 'profilePicture'
  // 'onCallServices'
> & {
  index: number
}

export const CellUser = ({
  index,
  firstName,
  lastName,
  initials,
  profilePicture,
  // onCallServices,
}: CellUserProps) => {
  const daysOfWeek = getWeekInterval()
  const day = daysOfWeek[index]

  // const onCallServiceForDay = onCallServices.filter((onCallService) => {
  //   const onCallServiceStartDate = onCallService.dateFrom
  //   const onCallServiceEndDate = onCallService.dateTo

  //   return (
  //     isSameDay(day, onCallServiceStartDate) ||
  //     isSameDay(day, onCallServiceEndDate)
  //   )
  // })

  return (
    <div className='flex h-full items-center gap-2'>
      {/* TODO: popover for clicked on user OR just go to profile .. idk yet */}
      {/* TODO: might make this a separate component since used already twice */}
      {/* TODO: maybe use a popover with a button as trigger for this */}
      <div className=''>
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
      <div className='flex items-center'>
        <p className='hidden md:flex'>
          {firstName} {lastName}
        </p>
      </div>
      <div className='flex h-full grow justify-end'>
        {/* {onCallServiceForDay.map((onCallService) => {
          const dateFrom = format(onCallService.dateFrom, 'dd.MM')
          const dateTo = format(onCallService.dateTo, 'dd.MM')
          return (
            <TooltipProvider key={onCallService.id} delayDuration={0}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Indicator orientation='vertical' />
                </TooltipTrigger>
                <TooltipContent className='bg-secondary shadow-sm'>
                  <p className='text-center text-secondary-foreground'>
                    Rufbereitschaft
                    <br />
                    vom {dateFrom} - {dateTo}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )
        })} */}
      </div>
    </div>
  )
}

interface CellWeekdayProps {
  index: number
  rowIndex: number
  tasks: OperationalPlanDataType['tasks']
  holidays: HolidayType[]
  schoolHolidays: SchoolHolidayType[]
  sicknessEntries: SicknessEntry[]
  onCallServices: OnCallServiceType[]
  vacations: OperationalPlanDataType['vacations']
  users: OptionType[]
}

export const CellWeekday = ({
  index,
  rowIndex,
  tasks,
  holidays,
  schoolHolidays,
  sicknessEntries,
  onCallServices,
  vacations,
  users,
}: CellWeekdayProps) => {
  const daysOfWeek = getWeekInterval()
  const day = daysOfWeek[index]

  // TODO: maybe I should check for 'isWithinInterval' etc. in the direct call. might lead to better performance

  // TODO: this should show/have an indicator on every day. dont know how yet
  // 1. onCallService - should have a like 50% opacity baby-blueish background (there is an indicator for this in the CellUserProps already but it might not be enough)
  const onCallServiceForDay = onCallServices.find((onCallService) => {
    const onCallServiceStartDate = onCallService.dateFrom
    const onCallServiceEndDate = onCallService.dateTo

    const onCallServiceForCurrentUser = onCallService.userId === users[0].value

    return (
      onCallServiceForCurrentUser &&
      isWithinInterval(day, {
        start: onCallServiceStartDate,
        end: onCallServiceEndDate,
      })
    )
    // return (
    //   (onCallServiceForCurrentUser &&
    //     isWithinInterval(day, {
    //       start: onCallServiceStartDate,
    //       end: onCallServiceEndDate,
    //     })) ||
    //   (isSameDay(day, onCallServiceStartDate) &&
    //     isSameDay(day, onCallServiceEndDate))
    // )
  })

  // 2. priority - holidays
  const holidayForDay = holidays.find((holiday) => {
    const holidayDate = holiday.date

    return isSameDay(day, holidayDate)
  })

  // 3. priority - vocationalSchoolDays for apprentices
  // I think this should be in indicator on the left side of the cell / on the right side of the CellUserProps
  const schoolHolidayForDay = schoolHolidays.find((schoolHoliday) => {
    const schoolHolidayStartDate = schoolHoliday.dateFrom
    const schoolHolidayEndDate = schoolHoliday.dateTo

    return isWithinInterval(day, {
      start: schoolHolidayStartDate,
      end: schoolHolidayEndDate,
    })
  })

  // 4. priority - vacation days (maybe the same as with sickness days)
  const vacationForDay = vacations.find((vacation) => {
    const vacationStartDate = vacation.dateFrom
    const vacationEndDate = vacation.dateTo

    const vacationForCurrentUser = vacation.userId === users[0].value

    return (
      vacationForCurrentUser &&
      isWithinInterval(day, {
        start: vacationStartDate,
        end: vacationEndDate,
      })
    )
  })

  // 5. priority - sickness days (these should render a fully rendered red cell for the normal users. the admins should also have this background with the task(s) which he would have had on this day, so it can still be editable. )
  const sicknessEntryForDay = sicknessEntries.find((sicknessEntry) => {
    const sicknessEntryStartDate = sicknessEntry.dateFrom
    const sicknessEntryEndDate = sicknessEntry.dateTo

    const sicknessEntryForCurrentUser = sicknessEntry.userId === users[0].value

    return (
      sicknessEntryForCurrentUser &&
      isWithinInterval(day, {
        start: sicknessEntryStartDate,
        end: sicknessEntryEndDate,
      })
    )
  })

  // 6. priority - tasks
  const tasksForDay = tasks.filter((task) => {
    const taskStartDate = task.task.dateFrom
    const taskEndDate = task.task.dateTo

    return (
      isWithinInterval(day, {
        start: taskStartDate,
        end: taskEndDate,
      }) ||
      (isSameDay(day, taskStartDate) && isSameDay(day, taskEndDate))
    )
  })

  // TODO: use different components instead of this mess
  return (
    <div className='relative h-full'>
      {schoolHolidayForDay && (
        <CellSchoolHoliday
          rowIndex={rowIndex}
          dateFrom={schoolHolidayForDay.dateFrom}
          dateTo={schoolHolidayForDay.dateTo}
        />
      )}
      {holidayForDay ? (
        // TODO: make this prettier
        <div className='flex h-full items-center justify-center rounded-md bg-green-950'>
          <p className='select-none'>{holidayForDay.name}</p>
        </div>
      ) : sicknessEntryForDay ? (
        <CellSicknessEntry sicknessEntry={sicknessEntryForDay} />
      ) : vacationForDay ? (
        <CellVacation vacation={vacationForDay} />
      ) : tasksForDay.length === 0 ? (
        <CellNoContent date={day} user={users[0]} users={users} />
      ) : (
        <Carousel className='h-full'>
          <CarouselContent
            className={`${tasksForDay.length > 0 ? '-ml-3 cursor-pointer' : 'ml-0 cursor-default'} h-full`}
          >
            {tasksForDay.map((task) => (
              // TODO: rotate the carousel items according to the current time
              // TODO: make these draggable for the admin (quick re-assign)?
              <CarouselItem
                key={task.task.id}
                className={cn(
                  'rounded-md pl-3',
                  tasksForDay.length > 1 ? 'basis-10/12' : 'base-full',
                  // TODO: change this
                  onCallServiceForDay ? 'border border-blue-500' : ''
                )}
              >
                <TaskDialog task={task} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  )
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
