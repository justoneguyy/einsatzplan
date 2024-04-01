import {
  addDays,
  addWeeks,
  endOfWeek,
  setDefaultOptions,
  startOfWeek,
} from 'date-fns'
import { de } from 'date-fns/locale'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

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
