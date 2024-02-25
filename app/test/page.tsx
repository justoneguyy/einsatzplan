import { AssignmentCard } from '@/components/assignment-card'
import { AssignmentUserCard } from '@/components/assignmentUser-card'

export default function Test() {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-20'>
      {/* <AssignmentCard /> */}
      <AssignmentUserCard />
    </div>
  )
}
