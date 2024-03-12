'use server'

import db from '@/lib/db'

export async function getRoles() {
  const roles = await db.role.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return roles
}
