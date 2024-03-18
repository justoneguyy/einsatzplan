'use server'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/helper/create-safe-action'
import { InputType, ReturnType } from './types'
import { DeleteEmployee } from './schema'
import { revalidatePath } from 'next/cache'

const handler = async (data: InputType): Promise<ReturnType> => {
  // add auth check

  const { id } = data

  let employee

  try {
    employee = await db.employee.delete({
      where: {
        id,
      },
    })
  } catch (e: any) {
    return { error: e.message }
  }

  revalidatePath('/settings/employee-administration')
  return {
    data: employee,
  }
}

export const deleteEmployee = createSafeAction(DeleteEmployee, handler)
