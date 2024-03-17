'use server'

import db from '@/lib/db'

import { createSafeAction } from '@/lib/create-safe-action'
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
  } catch (error) {
    return {
      error: 'Der Mitarbeiter konnte nicht gelöscht werden',
    }
  }

  revalidatePath('/settings/employee-administration')
  return {
    data: employee,
  }
}

export const deleteEmployee = createSafeAction(DeleteEmployee, handler)
