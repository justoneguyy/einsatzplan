import {
  addDays,
  addWeeks,
  eachDayOfInterval,
  endOfWeek,
  format,
  startOfWeek,
} from 'date-fns'

import { searchParams } from '@/lib/params/searchparams'
import { useQueryStates } from 'nuqs'

export function getWeek(weekOffset: number = 0) {
  const now = addWeeks(new Date(), weekOffset)
  const start = startOfWeek(now)
  const end = endOfWeek(now)

  return { start, end }
}

export function getDay(dayOffset: number = 0) {
  const day = addDays(new Date(), dayOffset)

  return day
}

// TODO: maybe separate this into two hooks, so it can be used without the weekInterval (e.g. for CalendarWeek component)
export function getWeekInterval() {
  const [dateWeek, setDateWeek] = useQueryStates(
    {
      dateFrom: searchParams.dateFrom,
      dateTo: searchParams.dateTo,
    },
    {
      history: 'push',
      shallow: false, // Send updates to the server
    }
  )

  const weekInterval = { start: dateWeek.dateFrom, end: dateWeek.dateTo }
  const daysOfWeek = eachDayOfInterval(weekInterval)

  return daysOfWeek
}

export const isMidnight = (date?: Date) =>
  date?.getHours() === 0 && date?.getMinutes() === 0

export const formatTime = (
  date: Date,
  isMidnight: boolean,
  dateFormat: string
) => (!isMidnight ? format(date, dateFormat) : '')
