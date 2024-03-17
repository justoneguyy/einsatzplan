'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getGroups = cache(async function () {
  const groups = await db.group.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return groups
})

// export const getGroups = cache(async function () {
//   try {
//     const groups = await db.group.findMany({
//       orderBy: {
//         name: 'asc',
//       },
//     })

//     return groups
//   } catch (error) {
//     return error
//   }
// })
