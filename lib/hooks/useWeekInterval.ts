import { searchParams } from '@/lib/params/searchparams'
import { eachDayOfInterval } from 'date-fns'
import { useQueryStates } from 'nuqs'

// TODO: maybe separate this into two hooks, so it can be used without the weekInterval (e.g. for CalendarWeek component)
export function useWeekInterval() {
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
