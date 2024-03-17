'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'
import { Employee } from '@prisma/client'

import { createSafeAction } from '@/lib/create-safe-action'
import { InputType, ReturnType } from './types'

import { UpdateEmployee } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  // TODO: add auth check

  const {
    username,
    firstName,
    lastName,
    initials,
    profilePicture,
    roleId,
    groupIds,
  } = data

  let employee

  try {
    employee = await db.employee.update({
      where: {
        id: data.id,
      },
      data: {
        username,
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
  revalidatePath('/settings/employee-administration')
  return { data: employee }
}

export const updateEmployee = createSafeAction(UpdateEmployee, handler)
