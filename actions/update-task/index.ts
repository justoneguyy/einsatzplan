'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'

import { UpdateTask } from './schema'

const handler = async (data: InputType): Promise<ReturnType> => {
  // TODO: add auth check

  const {
    title,
    description,
    dateFrom,
    dateTil,
    timeFrom,
    timeTil,
    employeeIds,
  } = data

  let task

  // workaround so that updating groups work. This is currently the only way to update many-to-many relationships in a context of explicit models
  try {
    await db.employeeTask.deleteMany({
      where: {
        employeeId: data.id,
      },
    })

    try {
      task = await db.task.update({
        where: {
          id: data.id,
        },
        data: {
          title,
          description,
          dateFrom,
          dateTil,
          timeFrom,
          timeTil,
          employees: {
            create: employeeIds.map((employeeId) => ({
              employee: {
                connect: {
                  id: employeeId,
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
  } catch (e: any) {
    return { error: e.message }
  }
}

export const updateTask = createSafeAction(UpdateTask, handler)
