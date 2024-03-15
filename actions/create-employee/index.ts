'use server'

import { revalidatePath } from 'next/cache'

import db from '@/lib/db'
import { Employee } from '@prisma/client'

const handler = async (data: any): Promise<any> => {
  const {
    username,
    firstName,
    lastName,
    initials,
    profilePicture,
    roleId,
    groupId,
  } = data

  let employee

  employee = await db.employee.create({
    data: {
      username,
      firstName,
      lastName,
      initials,
      profilePicture,
      role: {
        connect: {
          id: roleId,
        },
      },
      groups: {
        create: [
          {
            group: {
              connect: {
                id: groupId,
              },
            },
          },
        ],
      },
    },
  })

  console.log('Employee:', employee)

  // TODO: make this dynamic (take the actual path as an argument while using this inside a component)
  revalidatePath('/settings/employee-administration')
  return { data: employee }
}

export const createEmployee = handler

// export const createEmployee = createSafeAction(CreateEmployee, handler)

// 'use server'

// import { revalidatePath } from 'next/cache'
// import { Employee } from '@prisma/client'

// import db from '@/lib/db'
// import { createSafeAction } from '@/lib/create-safe-action'

// import { CreateEmployee } from './schema'
// import { InputType, ReturnType } from './types'

// const handler = async (data: any): Promise<ReturnType> => {
//   // const handler = async (data: InputType): Promise<ReturnType> => {
//   // TODO: add auth check

//   const {
//     username,
//     firstName,
//     lastName,
//     initials,
//     profilePicture,
//     roleId,
//     groupId,
//   } = data

//   let employee

//   try {
//     employee = await db.employee.create({
//       data: {
//         username,
//         firstName,
//         lastName,
//         initials,
//         profilePicture,
//         role: {
//           connect: {
//             id: roleId,
//           },
//         },
//         groups: {
//           create: [
//             {
//               group: {
//                 connect: {
//                   id: groupId,
//                 },
//               },
//             },
//           ],
//         },
//       },
//     })
//   } catch (e) {
//     return {
//       error: 'Der Mitarbeiter konnte nicht erstellt werden.',
//     }
//   }

//   // TODO: make this dynamic (take the actual path as an argument while using this inside a component)
//   revalidatePath('/settings/employee-administration')
//   return { data: employee }
// }

// export const createEmployee = createSafeAction(CreateEmployee, handler)
