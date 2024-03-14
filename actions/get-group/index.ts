'use server'

import db from '@/lib/db'

export async function getGroups() {
  const groups = await db.group.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return groups
}
