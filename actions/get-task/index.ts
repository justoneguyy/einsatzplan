'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getTasks = cache(async function () {
  // TODO: include createdBy etc?
  const tasks = await db.task.findMany({
    // include: {
    //   users: true,
    // },
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  })

  // console.log(tasks)

  // tasks.forEach((task) => {
  //   console.log(task.users)
  // })

  return tasks
})

export const getTaskWithUsers = cache(async function (taskId: string) {
  const task = await db.task.findUnique({
    where: { id: taskId },
    select: {
      users: {
        select: {
          user: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              initials: true,
              email: true,
              profilePicture: true,
              roleId: true,
            },
          },
        },
      },
    },
  })

  console.log(task?.users.map((user) => user.user.firstName))

  return task
})
