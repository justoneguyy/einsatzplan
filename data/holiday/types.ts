import { getHolidays } from '@/actions/get-holiday'
import { UnwrapArray, UnwrapPromise } from '@/lib/types'

export type HolidayType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof getHolidays>>
>
