'use server'

import { cache } from 'react'
import { getUsersWithTasks } from './get-user'
import { getHolidays } from './get-holiday'
import { getSchoolHolidays } from './get-schoolHoliday'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'
import { getSicknessEntries } from './get-sicknessEntry'
import { getOnCallServices } from './get-onCallService'

// TODO: cache
export const aggregateOperationalPlanData = cache(async function () {
  const users = await getUsersWithTasks()

  const holidays = await getHolidays()

  const schoolHolidays = await getSchoolHolidays()

  const sicknessEntries = await getSicknessEntries()

  const onCallServices = await getOnCallServices()

  const data = users.map((user) => ({
    ...user,
    holidays,
    schoolHolidays,
    sicknessEntries,
    onCallServices,
  }))

  return data
})

export type OperationalPlanDataType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof aggregateOperationalPlanData>>
>
