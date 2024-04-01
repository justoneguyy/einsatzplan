'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'

import { UpdateUser } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  // TODO: add auth check

  const { firstName, lastName, initials, profilePicture, roleId, groupIds } =
    data

  let user

  // workaround so that updating groups work. This is currently the only way to update many-to-many relationships in a context of explicit models
  try {
    await db.userGroup.deleteMany({
      where: {
        userId: data.id,
      },
    })

    try {
      user = await db.user.update({
        where: {
          id: data.id,
        },
        data: {
          firstName,
          lastName,
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
                  id: groupId,
                },
              },
            })),
          },
        },
      })
    } catch (e: any) {
      return { error: e.message }
    }

    // TODO: make this dynamic (take the actual path as an argument while using this inside a component)
    revalidatePath('/settings/user-administration')
    return { data: user }
  } catch (e: any) {
    return { error: e.message }
  }
}

export const updateUser = createSafeAction(UpdateUser, handler)
