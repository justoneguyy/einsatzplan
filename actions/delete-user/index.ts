'use server'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'
import { DeleteUser } from './schema'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  // add auth check

  const { id } = data

  let user

  try {
    user = await db.user.delete({
      where: {
        id,
      },
    })
  } catch (e: any) {
    return { error: e.message }
  }

  revalidatePath('/settings/user-administration')
  return {
    data: user,
  }
}

export const deleteUser = createSafeAction(DeleteUser, handler)
