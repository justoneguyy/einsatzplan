'use server'

import { getVacationEntryByEmployeeDate } from '@/data/vacation'
import { VacationCreateSchema } from '@/data/vacation/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const createVacation = async (
  values: z.infer<typeof VacationCreateSchema>
) => {
  const validatedFields = VacationCreateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }

  const { type, duration, date, userId } = validatedFields.data

  const existingVacationEntry = await getVacationEntryByEmployeeDate(
    userId,
    date.from,
    date.to
  )

  if (existingVacationEntry) {
    return {
      error:
        'An diesem Tag besteht bereits ein Urlaubseintrag fuer diesen Mitarbeiter!',
    }
  }

  await db.vacation.create({
    data: {
      type,
      duration,
      dateFrom: date.from,
      dateTo: date.to,
      userId,
    },
  })

  revalidatePath('/')
  return { success: 'Urlaubseintrag erfolgreich angelegt!' }
}
