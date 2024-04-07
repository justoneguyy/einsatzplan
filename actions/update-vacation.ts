'use server'

import { VacationUpdateSchema } from '@/data/vacation/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateVacation = async (
  values: z.infer<typeof VacationUpdateSchema>
) => {
  const validatedFields = VacationUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id, type, duration, date, userId } = validatedFields.data

  // TODO: add more validation

  await db.vacation.update({
    where: {
      id: id,
    },
    data: {
      type,
      duration,
      dateFrom: date.from,
      dateTo: date.to,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  })

  revalidatePath('/')
  // TODO: add better messages
  return { success: 'Urlaubseintrag erfolgreich bearbeitet!' }
}
