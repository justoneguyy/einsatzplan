'use server'

import db from '@/lib/db'
import { cache } from 'react'

export const getUsers = cache(async function () {
  const users = await db.user.findMany({
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

  return users
})

export const getUsersWithTasks = cache(async function () {
  const users = await db.user.findMany({
    include: {
      tasks: {
        include: {
          task: {
            select: {
              id: true,
              title: true,
              description: true,
              dateFrom: true,
              dateTo: true,
              timeFrom: true,
              timeTo: true,
              users: {
                include: {
                  user: true,
                },
              },
            },
          },
          user: true,
        },
      },
      groups: {
        include: {
          group: true,
        },
      },
      onCallServices: {
        include: {
          user: true,
        },
      },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  return users
})

// export const getUsersWithTasks = cache(async function () {
//   const users = await db.user.findMany({
//     include: {
//       role: true,
//       groups: {
//         include: {
//           group: true,
//         },
//       },
//       tasks: {
//         include: {
//           task: {
//             select: {
//               id: true,
//               title: true,
//               description: true,
//               dateFrom: true,
//               dateTo: true,
//               timeFrom: true,
//               timeTo: true,
//               users: {
//                 include: {
//                   user: true,
//                 },
//               },
//             },
//           },
//           user: true,
//         },
//       },
//     },
//     orderBy: {
//       firstName: 'asc',
//     },
//   })

//   return users
// })

// TODO: remove
export const testgetUsersWithTasks = async () => {
  const users = await db.user.findMany({
    include: {
      role: true,
      groups: {
        include: {
          group: true,
        },
      },
      tasks: {
        include: {
          task: {
            select: {
              id: true,
              title: true,
              description: true,
              dateFrom: true,
              dateTo: true,
              timeFrom: true,
              timeTo: true,
              // users: true,
              users: {
                include: {
                  user: true,
                },
              },
            },
          },
          user: true,
        },
      },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  const test = users.forEach((user) => {
    user.tasks = user.tasks.filter((task) =>
      task.task.users.map((user) => user.user.firstName)
    )
  })

  console.log(test)

  return users
}

// TODO: add another query or change this one to only include the users that are not on holiday etc..
export const getUsersName = cache(async function () {
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  const mappedUsers = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }))

  return mappedUsers
})

export const getUsersOnCallService = cache(async function () {
  const users = await db.user.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    where: {
      groups: {
        some: {
          group: {
            name: 'Rufbereitschaft',
          },
        },
      },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  const mappedUsers = users.map((user) => ({
    value: user.id,
    label: `${user.firstName} ${user.lastName}`,
  }))

  return mappedUsers
})
