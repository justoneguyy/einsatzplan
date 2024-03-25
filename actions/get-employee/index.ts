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

export const getEmployeesWithTasks = cache(async function () {
  const employees = await db.employee.findMany({
    include: {
      role: true,
      groups: {
        include: {
          group: true,
        },
      },
      tasks: {
        include: {
          task: true,
        },
      },
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  // for (let employee of employees) {
  //   employee.tasks.sort((a, b) => a.timeFrom.localeCompare(b.timeFrom));
  // }

  return employees
})

// TODO: add another query or change this one to only include the employees that are not on holiday etc..
export const getEmployeesName = cache(async function () {
  const employees = await db.employee.findMany({
    select: {
      id: true,
      firstName: true,
      lastName: true,
    },
    orderBy: {
      firstName: 'asc',
    },
  })

  // return employees
  return employees.map((employee) => ({
    id: employee.id,
    name: `${employee.firstName} ${employee.lastName}`,
  }))
})

export const getEmployeesOnCallService = cache(async function () {
  const employees = await db.employee.findMany({
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

  return employees.map((employee) => ({
    id: employee.id,
    name: `${employee.firstName} ${employee.lastName}`,
  }))
})
