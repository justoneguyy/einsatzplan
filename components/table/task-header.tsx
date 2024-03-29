import { da, de } from 'date-fns/locale'
import {
  eachDayOfInterval,
  endOfWeek,
  format,
  setDefaultOptions,
  startOfWeek,
} from 'date-fns'
import { useQueryStates } from 'nuqs'
import { searchParams } from '@/lib/params/searchparams'
import { useWeekInterval } from '@/lib/hooks/useWeekInterval'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

interface HeaderProps {
  index: number
}

export function HeaderWeekday({ index }: HeaderProps) {
  const daysOfWeek = useWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')

  return <p>{formattedDate}</p>
}

export function HeaderWeekend({ index }: HeaderProps) {
  const daysOfWeek = useWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')

  return <p>{formattedDate}</p>
}
