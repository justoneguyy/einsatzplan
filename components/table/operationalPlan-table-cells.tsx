import { AssignmentCard } from '@/components/card/assignment-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'

import { GetTaskType } from '@/actions/get-task/schema'
import { GetUserTaskType } from '@/actions/get-user/schema'
import { useWeekInterval } from '@/lib/hooks/useWeekInterval'
import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { User } from '@prisma/client'
import { isWithinInterval, setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

// TODO: make this more elegant
type CellUserProps = Omit<
  User,
  | 'id'
  | 'email'
  | 'roleId'
  | 'role'
  | 'groups'
  | 'availabilityId'
  | 'availability'
>

export const CellUser = ({
  firstName,
  lastName,
  initials,
  profilePicture,
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
        {/* TODO: only show if the user currently has Rufbereitschaft -> only one should be active at a time */}
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

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

interface CellWeekdayProps {
  tasks: GetUserTaskType['tasks']
  index: number
}

export const CellWeekday = ({ tasks, index }: CellWeekdayProps) => {
  const daysOfWeek = useWeekInterval()
  const day = daysOfWeek[index]

  const tasksForDay = tasks.filter((task) => {
    const taskStartDate = new Date(task.task.dateFrom)
    const taskEndDate = new Date(task.task.dateTil)

    return isWithinInterval(day, { start: taskStartDate, end: taskEndDate })
  })

  return (
    <Carousel>
      <CarouselContent className='-ml-3 cursor-pointer'>
        {tasksForDay.map((i) => (
          // TODO: rotate the carousel items according to the current time
          <CarouselItem key={i.task.id} className='basis-10/12 rounded-md pl-3'>
            {/* TODO: pass all of the users which have the same task (need to aggregate them or use task.getUnique where... call) */}
            {/* <TaskDialog task={task}> */}
            <AssignmentCard
              id={i.task.id}
              title={i.task.title}
              description={i.task.description}
              dateFrom={i.task.dateFrom}
              dateTil={i.task.dateTil}
              timeFrom={i.task.timeFrom}
              timeTil={i.task.timeTil}
            />
            {/* </TaskDialog> */}
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

// TODO: use this to order the tasks depending on their time (maybe we should do this in the actual call, dont know yet)
function sortTasks(tasks: GetTaskType[]): GetTaskType[] {
  // Filter tasks with both timeFrom and timeTil defined
  const tasksWithTime = tasks.filter((task) => task.timeFrom && task.timeTil)
  // Sort tasks by their timeFrom and timeTil values
  tasksWithTime.sort((a, b) => {
    // Convert timeFrom and timeTil to Date objects for comparison
    const timeAFrom = new Date(a.timeFrom!)
    const timeBFrom = new Date(b.timeFrom!)
    const timeATil = new Date(a.timeTil!)
    const timeBTil = new Date(b.timeTil!)

    // Compare timeFrom and timeTil of tasks
    if (timeAFrom < timeBFrom && timeATil < timeBTil) return -1
    if (timeAFrom > timeBFrom && timeATil > timeBTil) return 1
    return 0
  })

  // Concatenate sorted tasks with tasks without timeFrom and timeTil
  const sortedTasks = [
    ...tasksWithTime,
    ...tasks.filter((task) => !task.timeFrom || !task.timeTil),
  ]

  return sortedTasks
}
