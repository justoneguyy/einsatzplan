'use server'

import { getSicknessEntryByEmployeeDate } from '@/data/sicknessEntry'
import { SicknessEntryCreateSchema } from '@/data/sicknessEntry/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const createSicknessEntry = async (
  values: z.infer<typeof SicknessEntryCreateSchema>
) => {
  const validatedFields = SicknessEntryCreateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }

  const { title, date, userId } = validatedFields.data

  const existingSicknessEntry = await getSicknessEntryByEmployeeDate(
    userId,
    date.from,
    date.to
  )

  if (existingSicknessEntry) {
    return {
      error:
        'Fuer diesen Tag besteht fuer diesen Mitarbeiter bereits ein Krankheitseintrag!',
    }
  }

  await db.sicknessEntry.create({
    data: {
      title,
      dateFrom: date.from,
      dateTo: date.to,
      userId,
    },
  })

  revalidatePath('/')
  return { success: 'Krankheitseintrag erfolgreich hinzugefuegt!' }
}
