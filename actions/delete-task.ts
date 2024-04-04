'use server'

import { getTaskById } from '@/data/task'
import { TaskDeleteSchema } from '@/data/task/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteTask = async (values: z.infer<typeof TaskDeleteSchema>) => {
  const validatedFields = TaskDeleteSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id } = validatedFields.data

  const existingTask = await getTaskById(id)
  if (!existingTask) {
    return {
      error: 'Diese Aufgabe gibt es nicht!',
    }
  }

  // TODO: add more validation

  await db.task.delete({
    where: {
      id,
    },
  })

  revalidatePath('/')
  return { success: 'Aufgabe erfolgreich geloescht!' }
}
