import { getSchoolHolidays } from '@/actions/get-schoolHoliday'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export type SchoolHolidayType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof getSchoolHolidays>>
>
