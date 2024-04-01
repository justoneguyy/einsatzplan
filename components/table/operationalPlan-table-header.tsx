import { getWeekInterval } from '@/lib/helper/getWeekInterval'
import { format, setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'

setDefaultOptions({
  locale: de,
  weekStartsOn: 1,
})

interface HeaderProps {
  index: number
}

export function HeaderWeekday({ index }: HeaderProps) {
  const daysOfWeek = getWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')

  return <p>{formattedDate}</p>
}

// export function HeaderWeekend({ index }: HeaderProps) {
//   const daysOfWeek = getWeekInterval()

//   const day = daysOfWeek[index]
//   const formattedDate = format(day, 'EEEE, dd.MM.yyyy')

//   return <p>{formattedDate}</p>
// }

export function HeaderWeekend({ index }: HeaderProps) {
  const daysOfWeek = getWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')

  return <p>{formattedDate}</p>
  // TODO: currently not working because I cant correctly pass the column. change the mapping over the columns in task-columns component to single columns
  // return <TableColumnHeaderHide column={column} title='hallo' />
}
