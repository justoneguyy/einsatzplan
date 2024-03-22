'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'

import { CreateEmployee } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  // TODO: add auth check

  const {
    firstName,
    lastName,
    email,
    initials,
    profilePicture,
    roleId,
    groupIds,
  } = data

  let employee

  try {
    employee = await db.employee.create({
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

export const createEmployee = createSafeAction(CreateEmployee, handler)
