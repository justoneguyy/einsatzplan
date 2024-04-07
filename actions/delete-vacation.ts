'use server'

import { getVacationById } from '@/data/vacation'
import { VacationDeleteSchema } from '@/data/vacation/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteVaction = async (
  values: z.infer<typeof VacationDeleteSchema>
) => {
  const validatedFields = VacationDeleteSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id } = validatedFields.data

  const existingVacation = await getVacationById(id)
  if (!existingVacation) {
    return {
      error: 'Diesen Urlaubseintrag gibt es nicht!',
    }
  }

  // TODO: add more validation

  await db.vacation.delete({
    where: {
      id,
    },
  })

  revalidatePath('/')
  return { success: 'Urlaubseintrag erfolgreich geloescht!' }
}
