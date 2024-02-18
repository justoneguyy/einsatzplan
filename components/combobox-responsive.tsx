'use client'

import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { useMediaQuery } from '@/lib/hooks/useMediaQuery'

import { Assignment, Employee } from '@/lib/types'
import { employees, weekDays } from '@/_dev/mockdata/constants'
import { useState } from 'react'

// TODO: maybe add checkboxes so multiple employees can be selected at once
// TODO: change this so the employee is added on click (or like above mentioned with checkboxes)

export function ComboBoxResponsive() {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 768px)')
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  )

  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant='outline' className='justify-start'>
            {selectedEmployee ? (
              <>{selectedEmployee.name}</>
            ) : (
              <>+ Mitarbeiter</>
            )}
          </Button>
        </PopoverTrigger>
        {/* TODO: change scrollbar (currently ugly af) */}
        <PopoverContent className='w-[200px] p-0' align='start'>
          <EmployeeList
            setOpen={setOpen}
            setSelectedEmployee={setSelectedEmployee}
          />
        </PopoverContent>
      </Popover>
    )
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant='outline' className='w-[150px] justify-start'>
          {selectedEmployee ? <>{selectedEmployee.name}</> : <>+ Mitarbeiter</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className='mt-4 border-t'>
          <EmployeeList
            setOpen={setOpen}
            setSelectedEmployee={setSelectedEmployee}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function EmployeeList({
  setOpen,
  setSelectedEmployee,
}: {
  setOpen: (open: boolean) => void
  setSelectedEmployee: (employee: Employee | null) => void
}) {
  return (
    <Command>
      <CommandInput placeholder='Mitarbeiter suchen' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {employees.map((employee) => (
            <CommandItem
              key={employee.id}
              value={employee.id}
              onSelect={(value: any) => {
                setSelectedEmployee(
                  employees.find((priority) => priority.id === value) || null
                )
                setOpen(false)
              }}
            >
              {employee.name}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}
