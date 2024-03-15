'use server'

import db from '@/lib/db'
import { Employee } from '@prisma/client'

const handler = async (data: any): Promise<any> => {
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
    return error
  }
}

export const deleteEmployee = handler
