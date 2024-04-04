'use server'

import { cache } from 'react'
import { getUsersWithTasks } from './get-user'
import { getHolidays } from './get-holiday'
import { getSchoolHolidays } from './get-schoolHoliday'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export const aggregateOperationalPlanData = cache(async function () {
  const users = await getUsersWithTasks()

  const holidays = await getHolidays()

  const schoolHolidays = await getSchoolHolidays()

  const data = users.flatMap((user) =>
    user.tasks.map((task) => {
      // prob not needed TODO: remove this
      const isHoliday = holidays.some(
        (holiday) =>
          holiday.date.getTime() === task.task.dateFrom.getTime() ||
          holiday.date.getTime() === task.task.dateTo.getTime()
      )
      const isSchoolHoliday = schoolHolidays.some(
        (schoolHoliday) =>
          schoolHoliday.dateFrom.getTime() <= task.task.dateFrom.getTime() &&
          schoolHoliday.dateTo.getTime() >= task.task.dateTo.getTime()
      )

      return {
        ...user,
        ...task,
        holidays,
        schoolHolidays,
        isHoliday,
        isSchoolHoliday,
      }
    })
  )

  return data
})

export type OperationalPlanDataType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof aggregateOperationalPlanData>>
>
