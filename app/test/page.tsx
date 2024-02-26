import { AssignmentCard } from '@/components/assignment-card'
import { AssignmentUserCard } from '@/components/assignmentUser-card'
import { CalendarFull, CalendarWeek } from '@/components/calendar'
import { Calendar } from './components/calendar'

export default function Test() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-20'>
      {/* <AssignmentCard /> */}
      {/* <AssignmentUserCard /> */}
      <CalendarFull />
      <CalendarWeek className='rounded-md border shadow' />
      <Calendar className='rounded-md border shadow' />
    </div>
  )
}
