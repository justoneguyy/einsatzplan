'use server'

import { UserUpdateSchema } from '@/data/user/schema'
import db from '@/lib/db'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

export const updateUser = async (values: z.infer<typeof UserUpdateSchema>) => {
  const validatedFields = UserUpdateSchema.safeParse(values)

  if (!validatedFields.success) {
    return { error: 'ungültige Felder' }
  }
  // TODO: add auth check

  const {
    id,
    firstName,
    lastName,
    email,
    initials,
    profilePicture,
    roleId,
    groupIds,
  } = validatedFields.data

  // TODO: add more validation (
  // 1. check if nothing was changed at all
  // 2. check if any other employee already exists with the !new name (should skip for own name if it wasnt changed));
  // 3. check if the user is not the last admin in the system
  // 4. etc.

  // TODO: think about using transactions instead
  let deleteSuccessful = false

  try {
    await db.userGroup.deleteMany({
      where: {
        userId: id,
      },
    })
    deleteSuccessful = true
  } catch (e: any) {
    return { error: e.message }
  }

  if (deleteSuccessful) {
    await db.user.update({
      where: {
        id: id,
      },
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

    revalidatePath('/settings/user-administration')
    return { success: 'Mitarbeiter erfolgreich geupdatet!' }
  }
}
