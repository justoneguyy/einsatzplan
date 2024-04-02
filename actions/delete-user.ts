'use server'

import { getUserById } from '@/data/user'
import { UserDeleteSchema } from '@/data/user/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const deleteUser = async (values: z.infer<typeof UserDeleteSchema>) => {
  const validatedFields = UserDeleteSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const { id } = validatedFields.data

  const existingUser = await getUserById(id)
  if (!existingUser) {
    return {
      error: 'Diesen Benutzer gibt es nicht!',
    }
  }

  // TODO: add more validation

  await db.user.delete({
    where: {
      id,
    },
  })

  revalidatePath('/settings/user-administration')
  return { success: 'Mitarbeiter erfolgreich geloescht!' }
}
