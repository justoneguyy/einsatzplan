'use server'

import { getSicknessEntryById } from '@/data/sicknessEntry'
import { SicknessEntryDeleteSchema } from '@/data/sicknessEntry/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteSicknessEntry = async (
  values: z.infer<typeof SicknessEntryDeleteSchema>
) => {
  const validatedFields = SicknessEntryDeleteSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id } = validatedFields.data

  const existingSicknessEntry = await getSicknessEntryById(id)
  if (!existingSicknessEntry) {
    return {
      error: 'Diesen Krankheitseintrag gibt es nicht!',
    }
  }

  // TODO: add more validation

  await db.sicknessEntry.delete({
    where: {
      id,
    },
  })

  revalidatePath('/')
  return { success: 'Krankheitseintrag erfolgreich geloescht!' }
}
