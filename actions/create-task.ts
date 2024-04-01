'use server'

import { z } from 'zod'
import db from '@/lib/db'
import { TaskSchema } from '@/schemas'
import { getTaskByEmployeeDateTitle } from '@/data/task'
import { revalidatePath } from 'next/cache'

export const createTask = async (values: z.infer<typeof TaskSchema>) => {
  const validatedFields = TaskSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }

  // TODO: add auth check

  const { title, description, date, timeFrom, timeTo, userIds } =
    validatedFields.data

  const existingTask = await getTaskByEmployeeDateTitle(
    title,
    date.from,
    date.to,
    userIds.map((user) => user.value),
    timeFrom,
    timeTo
  )

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
      timeFrom,
      timeTo,
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