'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getTasks = cache(async function () {
  // TODO: include createdBy etc?
  const tasks = await db.task.findMany({
    include: {
      employees: true,
    },
  })

  return tasks
})
