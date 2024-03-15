'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getEmployees = cache(async function () {
  const employees = await db.employee.findMany({
    include: {
      role: true,
      groups: {
        include: {
          group: true,
        },
      },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  return employees
})
// export const getEmployees = cache(async function () {
//   try {
//     const employees = await db.employee.findMany({
//       include: {
//         role: true,
//         groups: {
//           include: {
//             group: true,
//           },
//         },
//       },
//       orderBy: {
//         firstName: 'asc',
//       },
//     })

//     return employees
//   } catch (error) {
//     return error
//   }
// })
