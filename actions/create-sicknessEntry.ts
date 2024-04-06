'use server'

import { getSicknessEntryByEmployeeDate } from '@/data/sickness'
import { SicknessEntrySchema } from '@/data/sickness/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const createSicknessEntry = async (
  values: z.infer<typeof SicknessEntrySchema>
) => {
  const validatedFields = SicknessEntrySchema.safeParse(values)

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

  await db.sickness.create({
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
