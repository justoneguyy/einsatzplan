'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getGroups = cache(async function () {
  const groups = await db.group.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  // return groups

  const mappedGroups = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))

  return mappedGroups
})
