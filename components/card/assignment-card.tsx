import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/ui/tooltip'
import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'

import { UserTaskType } from '@/data/user/types'
import { UnwrapArray } from '@/lib/types'
import { Badge } from '../ui/badge'
import { UsersRound } from 'lucide-react'

interface AssignmentCardProps {
  task: UnwrapArray<UserTaskType['tasks']>
  onOpen: () => void
}

export function AssignmentCard({ task, onOpen }: AssignmentCardProps) {
  const title = task.task.title
  const timeFrom = task.task.timeFrom
  const timeTo = task.task.timeTo
  const users = task.task.users

  return (
    <Card className='h-full rounded-md shadow-none' onClick={onOpen}>
      <CardContent className='flex h-full min-w-20 select-none flex-col p-2'>
        <div className='relative text-muted-foreground'>
          {timeFrom && timeTo && (
            <span className='mb-1 flex items-center gap-1 text-xs'>
              {timeFrom}
              <ArrowRightIcon />
              {timeTo}
            </span>
          )}
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className='absolute right-2 top-0'>
                  {users.length > 1 ? (
                    <UsersRound className='h-4 w-4' />
                  ) : (
                    <PersonIcon className='h-4 w-4' />
                  )}
                </span>
              </TooltipTrigger>
              <TooltipContent usePortal={true} className='bg-transparent p-0'>
                <Card>
                  <CardHeader className='p-4'>
                    <CardTitle className='text-center text-base'>
                      Mitarbeiter
                    </CardTitle>
                  </CardHeader>
                  {/* TODO: make this prettier */}
                  <CardContent className='flex flex-col justify-start gap-2 px-4'>
                    {task.task.users.map((user) => {
                      return (
                        <Badge key={user.id} className=''>
                          {user.user.firstName} {user.user.lastName}
                        </Badge>
                      )
                    })}
                  </CardContent>
                </Card>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className='flex grow items-center'>
          <p className='cursor-pointer leading-tight'>{title}</p>
        </div>
      </CardContent>
    </Card>
  )
}
// import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
// import { Label } from '@/components/ui/label'
// import {
//   Tooltip,
//   TooltipContent,
//   TooltipProvider,
//   TooltipTrigger,
// } from '@/ui/tooltip'
// import { ArrowRightIcon, PersonIcon } from '@radix-ui/react-icons'

// import { UserTaskType } from '@/data/user/types'
// import { UnwrapArray } from '@/lib/types'
// import { Badge } from '../ui/badge'
// import { UsersRound } from 'lucide-react'

// interface AssignmentCardProps {
//   task: UnwrapArray<UserTaskType['tasks']>
// }

// export function AssignmentCard({ task }: AssignmentCardProps) {
//   const title = task.task.title
//   const timeFrom = task.task.timeFrom
//   const timeTo = task.task.timeTo
//   const users = task.task.users

//   return (
//     <Card className='rounded-md'>
//       <CardContent className='flex h-14 min-h-14 select-none flex-col p-2'>
//         <div className='relative text-muted-foreground'>
//           {timeFrom && timeTo && (
//             <span className='mb-1 flex items-center gap-1 text-xs'>
//               {timeFrom}
//               <ArrowRightIcon />
//               {timeTo}
//             </span>
//           )}
//           <TooltipProvider delayDuration={0}>
//             <Tooltip>
//               <TooltipTrigger asChild>
//                 <span className='absolute right-2 top-0'>
//                   {users.length > 1 ? (
//                     <UsersRound className='h-4 w-4' />
//                   ) : (
//                     <PersonIcon className='h-4 w-4' />
//                   )}
//                 </span>
//               </TooltipTrigger>
//               <TooltipContent usePortal={true} className='bg-transparent p-0'>
//                 <Card>
//                   <CardHeader className='p-4'>
//                     <CardTitle className='text-center text-base'>
//                       Mitarbeiter
//                     </CardTitle>
//                   </CardHeader>
//                   {/* TODO: make this prettier */}
//                   <CardContent className='flex flex-col justify-start gap-2 px-4'>
//                     {task.task.users.map((user) => {
//                       return (
//                         <Badge key={user.id} className=''>
//                           {user.user.firstName} {user.user.lastName}
//                         </Badge>
//                       )
//                     })}
//                   </CardContent>
//                 </Card>
//               </TooltipContent>
//             </Tooltip>
//           </TooltipProvider>
//         </div>
//         <div className='flex grow items-center'>
//           <Label className='cursor-pointer leading-tight'>{title}</Label>
//         </div>
//       </CardContent>
//     </Card>
//   )
// }
