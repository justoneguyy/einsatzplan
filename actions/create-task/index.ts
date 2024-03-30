'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'
import { CreateTask } from './schema'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'

const handler = async (data: InputType): Promise<ReturnType> => {
  // TODO: add auth check

  const { title, description, dateFrom, dateTil, timeFrom, timeTil, userIds } =
    data

  let task

  try {
    task = await db.task.create({
      data: {
        title,
        description,
        dateFrom,
        dateTil,
        timeFrom,
        timeTil,
        users: {
          create: userIds.map((userId) => ({
            user: {
              connect: {
                id: userId,
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
  revalidatePath('/')
  return { data: task }
}

export const createTask = createSafeAction(CreateTask, handler)
