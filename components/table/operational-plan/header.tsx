import { getWeekInterval } from '@/lib/helper/date-utils'
import { format } from 'date-fns'

interface HeaderProps {
  index: number
}

export function HeaderWeekday({ index }: HeaderProps) {
  const daysOfWeek = getWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')
  const formattedDateShort = format(day, 'EE, dd.MM.yyyy').replace('.', '')
  const formattedDateShorter = format(day, 'EE, dd.MM.').replace('.', '')

  return (
    <>
      <p className='hidden 2xl:flex'>{formattedDate}</p>
      <p className='hidden xl:flex 2xl:hidden'>{formattedDateShort}</p>
      <p className='xl:hidden'>{formattedDateShorter}</p>
    </>
  )
}

export function HeaderWeekend({ index }: HeaderProps) {
  const daysOfWeek = getWeekInterval()

  const day = daysOfWeek[index]
  const formattedDate = format(day, 'EEEE, dd.MM.yyyy')
  const formattedDateShort = format(day, 'EE, dd.MM.yyyy').replace('.', '')
  const formattedDateShorter = format(day, 'EE, dd.MM.').replace('.', '')

  return (
    <>
      <p className='hidden 2xl:flex'>{formattedDate}</p>
      <p className='hidden xl:flex 2xl:hidden'>{formattedDateShort}</p>
      <p className='xl:hidden'>{formattedDateShorter}</p>
    </>
  )
  // TODO: currently not working because I cant correctly pass the column. change the mapping over the columns in task-columns component to single columns
  // return <TableColumnHeaderHide column={column} title='hallo' />
}
