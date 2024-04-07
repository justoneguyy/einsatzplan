'use server'

import { SicknessEntryUpdateSchema } from '@/data/sicknessEntry/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateSicknessEntry = async (
  values: z.infer<typeof SicknessEntryUpdateSchema>
) => {
  const validatedFields = SicknessEntryUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id, title, date, userId } = validatedFields.data

  // TODO: add more validation

  await db.sicknessEntry.update({
    where: {
      id: id,
    },
    data: {
      title,
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
  return { success: 'Krankheitseintrag erfolgreich bearbeitet!' }
}
