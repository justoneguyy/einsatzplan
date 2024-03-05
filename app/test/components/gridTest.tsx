import { employees, weekDays } from '@/_dev/mockdata/constants'
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@/components/ui/resizable'
import { Card, CardContent } from '@/ui/card'
import { Carousel, CarouselContent, CarouselItem } from '@/ui/carousel'

// TODO: always fill grid (height)
export function GridTest() {
  const defaultSizeEmployees = 10
  const defaultSizeWeekDays = ((100 - defaultSizeEmployees) / 7) * 5
  const defaultSizeWeekEndDays = ((100 - defaultSizeEmployees) / 7) * 2

  return (
    <ResizablePanelGroup direction='horizontal' className='rounded-md border'>
      {/* Employees */}
      <ResizablePanel defaultSize={defaultSizeEmployees}>
        <div className='grid grid-cols-1'>
          <div className='flex items-center border-b py-2'>
            <span className='ml-3'>Mitarbeiter</span>
          </div>
          {employees.map((employee) => (
            <div
              className='flex items-center border-b py-2 last:border-b-0'
              key={employee.id}
            >
              <span className='ml-3'>{employee.name}</span>
            </div>
          ))}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* WeekDays */}
      <ResizablePanel defaultSize={defaultSizeWeekDays}>
        <div className='grid grid-cols-5'>
          {employees[0].assignments.slice(0, 5).map((assignment) => (
            <div
              className='col-span-1 flex flex-col border-r last:border-r-0'
              key={assignment.day}
            >
              <div className='border-b py-2'>
                <span className='ml-3'>{assignment.day}</span>
              </div>
              {employees.map((employee) => {
                const dayAssignments = employee.assignments.find(
                  (a) => a.day === assignment.day
                )
                return (
                  <div
                    key={employee.id}
                    className='border-b p-2 last:border-b-0'
                  >
                    <Carousel className='cursor-pointer'>
                      <CarouselContent className=''>
                        {dayAssignments?.tasks.map((task, index: number) => (
                          <CarouselItem
                            key={index}
                            className='shrink-0 grow-0 basis-10/12 rounded-md pl-4'
                          >
                            <Card>
                              <CardContent className='flex items-center justify-center p-6'>
                                <span>{task.task}</span>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      {/* WeekEndDays */}
      <ResizablePanel defaultSize={defaultSizeWeekEndDays}>
        <div className='grid grid-cols-2'>
          {employees[0].assignments.slice(5, 7).map((assignment) => (
            <div
              className='col-span-1 flex flex-col border-r last:border-r-0'
              key={assignment.day}
            >
              <div className='border-b py-2'>
                <span className='ml-3'>{assignment.day}</span>
              </div>
              {employees.map((employee) => {
                const dayAssignments = employee.assignments.find(
                  (a) => a.day === assignment.day
                )
                return (
                  <div
                    key={employee.id}
                    className='border-b p-2 last:border-b-0'
                  >
                    <Carousel className='cursor-pointer'>
                      <CarouselContent className=''>
                        {dayAssignments?.tasks.map((task, index: number) => (
                          <CarouselItem
                            key={index}
                            className='shrink-0 grow-0 basis-10/12 rounded-md pl-4'
                          >
                            <Card>
                              <CardContent className='flex items-center justify-center p-6'>
                                <span>{task.task}</span>
                              </CardContent>
                            </Card>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </Carousel>
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

// // TODO: always fill grid (height)
// export function GridTest() {
//   const defaultSizeEmployees = 10
//   const defaultSizeWeekDays = ((100 - defaultSizeEmployees) / 7) * 5
//   const defaultSizeWeekEndDays = ((100 - defaultSizeEmployees) / 7) * 2

//   return (
//     <ResizablePanelGroup direction='horizontal' className='rounded-md border'>
//       {/* Employees */}
//       <ResizablePanel defaultSize={defaultSizeEmployees}>
//         <div className='grid grid-cols-1'>
//           <div className='flex items-center border-b py-2'>
//             <span className='ml-3'>Mitarbeiter</span>
//           </div>
//           {employees.map((employee) => (
//             <div
//               className='flex items-center border-b py-2 last:border-b-0'
//               key={employee.id}
//             >
//               <span className='ml-3'>{employee.name}</span>
//             </div>
//           ))}
//         </div>
//       </ResizablePanel>

//       <ResizableHandle withHandle />

//       {/* WeekDays */}
//       <ResizablePanel defaultSize={defaultSizeWeekDays}>
//         <div className='grid grid-cols-5'>
//           {employees[0].assignments.slice(0, 5).map((assignment) => (
//             <div
//               className='col-span-1 flex flex-col border-r last:border-r-0'
//               key={assignment.day}
//             >
//               <div className='border-b py-2'>
//                 <span className='ml-3'>{assignment.day}</span>
//               </div>
//               {employees.map((employee) => {
//                 const dayAssignments = employee.assignments.find(
//                   (a) => a.day === assignment.day
//                 )
//                 return (
//                   <div
//                     key={employee.id}
//                     className='border-b p-2 last:border-b-0'
//                   >
//                     <Carousel className='cursor-pointer'>
//                       <CarouselContent className=''>
//                         {dayAssignments?.tasks.map((task, index: number) => (
//                           <CarouselItem
//                             key={index}
//                             className='shrink-0 grow-0 basis-10/12 rounded-md pl-4'
//                           >
//                             <Card>
//                               <CardContent className='flex items-center justify-center p-6'>
//                                 <span>{task.task}</span>
//                               </CardContent>
//                             </Card>
//                           </CarouselItem>
//                         ))}
//                       </CarouselContent>
//                     </Carousel>
//                   </div>
//                 )
//               })}
//             </div>
//           ))}
//         </div>
//       </ResizablePanel>

//       <ResizableHandle withHandle />

//       {/* WeekEndDays */}
//       <ResizablePanel defaultSize={defaultSizeWeekEndDays}>
//         <div className='grid grid-cols-2'>
//           {employees[0].assignments.slice(5, 7).map((assignment) => (
//             <div
//               className='col-span-1 flex flex-col border-r last:border-r-0'
//               key={assignment.day}
//             >
//               <div className='border-b py-2'>
//                 <span className='ml-3'>{assignment.day}</span>
//               </div>
//               {employees.map((employee) => {
//                 const dayAssignments = employee.assignments.find(
//                   (a) => a.day === assignment.day
//                 )
//                 return (
//                   <div
//                     key={employee.id}
//                     className='border-b p-2 last:border-b-0'
//                   >
//                     <Carousel className='cursor-pointer'>
//                       <CarouselContent className=''>
//                         {dayAssignments?.tasks.map((task, index: number) => (
//                           <CarouselItem
//                             key={index}
//                             className='shrink-0 grow-0 basis-10/12 rounded-md pl-4'
//                           >
//                             <Card>
//                               <CardContent className='flex items-center justify-center p-6'>
//                                 <span>{task.task}</span>
//                               </CardContent>
//                             </Card>
//                           </CarouselItem>
//                         ))}
//                       </CarouselContent>
//                     </Carousel>
//                   </div>
//                 )
//               })}
//             </div>
//           ))}
//         </div>
//       </ResizablePanel>
//     </ResizablePanelGroup>
//   )
// }
