'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getTasks = cache(async function () {
  // TODO: include createdBy etc?
  const tasks = await db.task.findMany({
    include: {
      employees: {
        include: {
          employee: true,
          // task: true,
        },
      },
    },
  })

  tasks.forEach((task) => {
    console.log(task.employees)
  })

  return tasks
})
