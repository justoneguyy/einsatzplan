'use server'

import db from '@/lib/db'

export async function getEmployees() {
  const employees = await db.employee.findMany({
    orderBy: {
      firstName: 'asc',
    },
  })

  console.log(employees)

  return employees
}
