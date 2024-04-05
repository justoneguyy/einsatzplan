'use server'

import { cache } from 'react'
import { getUsersWithTasks } from './get-user'
import { getHolidays } from './get-holiday'
import { getSchoolHolidays } from './get-schoolHoliday'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

// TODO: cache
export const aggregateOperationalPlanData = cache(async function () {
  const users = await getUsersWithTasks()

  const holidays = await getHolidays()

  const schoolHolidays = await getSchoolHolidays()

  const data = users.map((user) => ({
    ...user,
    holidays,
    schoolHolidays,
  }))

  return data
})

export type OperationalPlanDataType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof aggregateOperationalPlanData>>
>
