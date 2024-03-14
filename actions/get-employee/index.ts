'use server'

import db from '@/lib/db'

export async function getEmployees() {
  const employees = await db.employee.findMany({
    orderBy: {
      firstName: 'asc',
    },
  })

  return employees
}
