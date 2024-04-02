'use server'

import { z } from 'zod'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { getUserByName } from '@/data/user'
import { UserSchema } from '@/data/user/schema'

export const createUser = async (values: z.infer<typeof UserSchema>) => {
  const validatedFields = UserSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const {
    firstName,
    lastName,
    email,
    initials,
    profilePicture,
    roleId,
    groupIds,
  } = validatedFields.data

  const existingUser = await getUserByName(firstName, lastName)
  if (existingUser) {
    return {
      error: 'Diesen Benutzer gibt es bereits!',
    }
  }

  // TODO: add more validation

  await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      initials,
      profilePicture,
      role: {
        connect: {
          id: roleId,
        },
      },
      groups: {
        create: groupIds.map((groupId) => ({
          group: {
            connect: {
              id: groupId.value,
            },
          },
        })),
      },
    },
  })

  // TODO: check if this messes up the queue
  revalidatePath('/settings/user-administration')
  return { success: 'Mitarbeiter erfolgreich angelegt!' }
}
