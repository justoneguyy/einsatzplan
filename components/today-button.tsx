'use client'

import { endOfWeek, startOfWeek } from 'date-fns'
import { Button } from './ui/button'
import { searchParams } from '@/lib/params/searchparams'
import { useQueryStates } from 'nuqs'

export function TodayButton() {
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

  const handleDayChange = () => {
    const now = new Date()
    const start = startOfWeek(now)
    const end = endOfWeek(now)
    setDateWeek({ dateFrom: start, dateTo: end })
  }

  return (
    <Button onClick={handleDayChange} variant='outline'>
      Heute
    </Button>
  )
}
