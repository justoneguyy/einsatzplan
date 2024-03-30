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
              dateTil: true,
              timeFrom: true,
              timeTil: true,
            },
          },
          user: true,
        },
      },
      // tasks: {
      //   select: {
      //     task: {
      //       select: {
      //         id: true,
      //         title: true,
      //         description: true,
      //         dateFrom: true,
      //         dateTil: true,
      //         timeFrom: true,
      //         timeTil: true,
      //       },
      //     },
      //     user: true,
      //   },
      // },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  // users.forEach((user) => {
  //   console.log(user.tasks)
  // })

  // console.log(users)

  return users
})

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

  // return users
  return users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }))
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

  return users.map((user) => ({
    id: user.id,
    name: `${user.firstName} ${user.lastName}`,
  }))
})
