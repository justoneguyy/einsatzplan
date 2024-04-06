'use server'

import { TaskUpdateSchema } from '@/data/task/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateTask = async (values: z.infer<typeof TaskUpdateSchema>) => {
  const validatedFields = TaskUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id, title, description, date, userIds } = validatedFields.data

  // TODO: add more validation (
  // 1. check if nothing was changed at all
  // 2. check if any other task already exists with the title, dateFrom etc.);
  // 3. etc.

  // TODO: think about using a transaction instead
  let deleteSuccessful = false

  try {
    await db.userTask.deleteMany({
      where: {
        taskId: id,
      },
    })
    deleteSuccessful = true
  } catch (e: any) {
    return { error: e.message }
  }

  if (deleteSuccessful) {
    await db.task.update({
      where: {
        id: id,
      },
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

    revalidatePath('/')
    // TODO: add better messages
    return { success: 'Aufgabe erfolgreich bearbeitet!' }
  }
}
