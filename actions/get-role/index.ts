'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getRoles = cache(async function () {
  const roles = await db.role.findMany({
    orderBy: {
      name: 'asc',
    },
  })

  return roles
})

// export const getRoles = cache(async function () {
//   try {
//     const roles = await db.role.findMany({
//       orderBy: {
//         name: 'asc',
//       },
//     })

//     return roles
//   } catch (error) {
//     return error
//   }
// })
