'use server'

import { z } from 'zod'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getTaskByEmployeeDateTitle } from '@/data/task'
import { TaskCreateSchema } from '@/data/task/schema'

export const createTask = async (values: z.infer<typeof TaskCreateSchema>) => {
  const validatedFields = TaskCreateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }

  // TODO: add auth check

  const { title, description, date, userIds } = validatedFields.data

  const existingTask = await getTaskByEmployeeDateTitle(
    title,
    date.from,
    date.to,
    userIds.map((user) => user.value)
  )

  // TODO: add check for holidays. add check if the employee already has a task. add check if the employee is sick etc. or rather not show them at all.
  if (existingTask) {
    return {
      error:
        'Dieser Mitarbeiter hat an diesem Tag & um diese Uhrzeit bereits eine Aufgabe!',
    }
  }

  // TODO: add more validation

  await db.task.create({
    data: {
      title,
      description,
      dateFrom: date.from,
      dateTo: date.to,
      users: {
        create: userIds.map((userId) => ({
          user: {
            connect: {
              id: userId.value,
            },
          },
        })),
      },
    },
  })

  // TODO: check if this messes up the queue
  revalidatePath('/')
  return { success: 'Aufgabe erfolgreich angelegt!' }
}
