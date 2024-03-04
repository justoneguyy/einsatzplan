'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

import { Employee } from '@/lib/types'
import { employees, weekDays } from '@/_dev/mockdata/constants'
import { useState } from 'react'
import { CaretSortIcon, CheckIcon } from '@radix-ui/react-icons'
import { ScrollArea } from './ui/scroll-area'
import { Checkbox } from './ui/checkbox'
import { Label } from './ui/label'
import { cn } from '@/lib/utils'

// TODO: im not sure which 'version' to use yet. we have the following options:
// 1. Command with search functionality and either Checkboxes or CheckIcon
// 2. Command with not search functionality and either Checkboxes or CheckIcon
// 3. Select with without the ScrollArea (that component has by default a different one)
// -> either only choose on of these or let the user choose between them in the settings
export default function ComboBoxResponsive() {
  const isDesktop = useMediaQuery('(min-width: 768px)')

  const [open, setOpen] = useState(false)
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )
  const [selectedEmployees, setSelectedEmployees] = useState<Employee[]>([])

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='w-[250px] justify-between'>
            {selectedEmployee ? (
              <>{selectedEmployee.name}</>
            ) : (
              <>
                Mitarbeiter auswaehlen
                <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
              </>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className='w-[250px] p-0' align='start'>
          <EmployeeList
            setOpen={setOpen}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedEmployees={setSelectedEmployees}
            selectedEmployees={selectedEmployees}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='justify-start'>
          {selectedEmployee ? (
            <>{selectedEmployee.name}</>
          ) : (
            <>
              Mitarbeiter auswaehlen
              <CaretSortIcon className='ml-2 h-4 w-4 shrink-0 opacity-50' />
            </>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <EmployeeList
            setOpen={setOpen}
            setSelectedEmployee={setSelectedEmployee}
            setSelectedEmployees={setSelectedEmployees}
            selectedEmployees={selectedEmployees}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function EmployeeList({
  setOpen,
  setSelectedEmployee,
  setSelectedEmployees,
  selectedEmployees,
}: {
  setOpen: (open: boolean) => void
  setSelectedEmployee: (employee: Employee | null) => void
  setSelectedEmployees: (employees: Employee[]) => void
  selectedEmployees: Employee[]
}) {
  return (
    <Command>
      {/* <CommandInput placeholder='Mitarbeiter suchen...' /> */}
      {/* TODO: adjust later based on height of x divs of employees in list */}
      <ScrollArea className='h-[200px]'>
        <CommandList className='max-h-none overflow-hidden'>
          {/* <CommandEmpty>Der Mitarbeiter wurde nicht gefunden</CommandEmpty> */}
          <CommandGroup>
            {employees.map((employee) => (
              <CommandItem
                key={employee.id}
                value={employee.id}
                onSelect={(id) => {
                  const isAlreadySelected = selectedEmployees.some(
                    (selectedEmployee) => selectedEmployee.id === id
                  )
                  setSelectedEmployees(
                    isAlreadySelected
                      ? selectedEmployees.filter(
                          (selectedEmployee) => selectedEmployee.id !== id
                        )
                      : [...selectedEmployees, employee]
                  )
                }}
              >
                <Label htmlFor={employee.id} className='w-full leading-5'>
                  {employee.name}
                </Label>
                <CheckIcon
                  className={cn(
                    'ml-auto h-4 w-4',
                    selectedEmployees.some(
                      (selectedEmployee) => selectedEmployee.id === employee.id
                    )
                      ? 'opacity-100'
                      : 'opacity-0'
                  )}
                />
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </ScrollArea>
    </Command>
  )
}

// return (
//   <Command>
//     <CommandInput placeholder='Mitarbeiter suchen...' />
//     {/* TODO: adjust later based on height of x divs of employees in list */}
//     <ScrollArea className='h-[200px]'>
//       <CommandList className='max-h-none overflow-hidden'>
//         {/* <CommandEmpty>Der Mitarbeiter wurde nicht gefunden</CommandEmpty> */}
//         <CommandGroup>
//           {employees.map((employee) => (
//             <CommandItem
//               key={employee.id}
//               value={employee.name}
//               onSelect={(id) => {
//                 // setSelectedEmployee(employee)
//                 employees.find((employee) => employee.id === id) || null
//               }}
//             >
//               <Checkbox id={employee.id} className='mr-3' />
//               <Label htmlFor={employee.id} className='w-full leading-5'>
//                 {employee.name}
//               </Label>
//             </CommandItem>
//           ))}
//         </CommandGroup>
//       </CommandList>
//     </ScrollArea>
//   </Command>
// )
