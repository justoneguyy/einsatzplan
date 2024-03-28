import { AssignmentCard } from '@/components/assignment-card'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { EmployeeProps, TaskProps } from '@/lib/types'

import { Avatar, AvatarFallback, AvatarImage } from '@/ui/avatar'
import { Employee, Task } from '@prisma/client'
import { TaskDialog } from '../dialog/task-dialog'
import { GetTaskType } from '@/actions/get-task/schema'
import { getEmployeesName } from '@/actions/get-employee'
import EmployeeProvider from '@/lib/provider/employee-provider'
import { GetEmployeeTaskType } from '@/actions/get-employee/schema'
import { useEffect, useState } from 'react'
import { getTaskWithEmployees } from '@/actions/get-task'

// TODO: make this more elegant
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

interface TaskCellProps {
  tasks: GetEmployeeTaskType['tasks']
}

export const CellWeekday = ({ tasks }: TaskCellProps) => {
  // const sortedTasks = sortTasks(tasks)

  return (
    <Carousel>
      <CarouselContent className='-ml-3 cursor-pointer'>
        {tasks.map((i) => (
          // TODO: rotate the carousel items according to the current time
          <CarouselItem key={i.task.id} className='basis-10/12 rounded-md pl-3'>
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
// interface TaskCellProps {
//   tasks: GetTaskType[]
// }

// export const CellWeekday = ({ tasks }: TaskCellProps) => {
//   const sortedTasks = sortTasks(tasks)

//   return (
//     <Carousel>
//       <CarouselContent className='-ml-3 cursor-pointer'>
//         {sortedTasks.map((task) => (
//           // TODO: rotate the carousel items according to the current time
//           <CarouselItem key={task.id} className='basis-10/12 rounded-md pl-3'>
//             <TaskDialog task={task}>
//               <AssignmentCard
//                 id={task.id}
//                 title={task.title}
//                 description={task.description}
//                 dateFrom={task.dateFrom}
//                 dateTil={task.dateTil}
//                 timeFrom={task.timeFrom}
//                 timeTil={task.timeTil}
//                 // firstName={task.employees.map(
//                 //   (employee) => employee.task.firstName
//                 // )}
//                 // lastName={task.employees.map(
//                 //   (employee) => employee.task.lastName
//                 // )}
//               />
//             </TaskDialog>
//           </CarouselItem>
//         ))}
//       </CarouselContent>
//     </Carousel>
//   )
// }

// function sortTasks(tasks: GetTaskType[]): GetTaskType[] {
//   // Filter tasks with both timeFrom and timeTil defined
//   const tasksWithTime = tasks.filter((task) => task.timeFrom && task.timeTil)
//   // Sort tasks by their timeFrom and timeTil values
//   tasksWithTime.sort((a, b) => {
//     // Convert timeFrom and timeTil to Date objects for comparison
//     const timeAFrom = new Date(a.timeFrom!)
//     const timeBFrom = new Date(b.timeFrom!)
//     const timeATil = new Date(a.timeTil!)
//     const timeBTil = new Date(b.timeTil!)

//     // Compare timeFrom and timeTil of tasks
//     if (timeAFrom < timeBFrom && timeATil < timeBTil) return -1
//     if (timeAFrom > timeBFrom && timeATil > timeBTil) return 1
//     return 0
//   })

//   // Concatenate sorted tasks with tasks without timeFrom and timeTil
//   const sortedTasks = [
//     ...tasksWithTime,
//     ...tasks.filter((task) => !task.timeFrom || !task.timeTil),
//   ]

//   return sortedTasks
// }
