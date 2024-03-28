'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getTasks = cache(async function () {
  // TODO: include createdBy etc?
  const tasks = await db.task.findMany({
    // include: {
    //   employees: true,
    // },
    include: {
      employees: {
        include: {
          employee: true,
        },
      },
    },
  })

  // console.log(tasks)

  // tasks.forEach((task) => {
  //   console.log(task.employees)
  // })

  return tasks
})

export const getTaskWithEmployees = cache(async function (taskId: string) {
  const task = await db.task.findUnique({
    where: { id: taskId },
    select: {
      employees: {
        select: {
          employee: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              initials: true,
              email: true,
              profilePicture: true,
              roleId: true,
              availabilityId: true,
            },
          },
        },
      },
    },
  })

  console.log(task?.employees.map((employee) => employee.employee.firstName))

  return task
})
