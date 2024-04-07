'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getTasks = cache(async function () {
  const tasks = await db.task.findMany({
    include: {
      users: {
        include: {
          user: true,
        },
      },
    },
  })

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

  return task
})
