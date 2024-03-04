'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Employee } from '@/lib/types'
import { Cross2Icon } from '@radix-ui/react-icons'
import { useEffect, useState } from 'react'

interface ListItemProps {
  onRemove: () => void
  isRemoving: boolean
  isAdding: boolean
  value: string
  employees: Employee[]
}

const ListItem: React.FC<ListItemProps> = ({
  onRemove,
  isRemoving,
  isAdding,
  value,
  employees,
}) => {
  const itemClassName = `flex gap-3 justify-between transition-all items-center duration-300 ease-in-out ${isRemoving ? 'translate-y-4 opacity-0' : isAdding ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100'}`

  return (
    <li className={itemClassName}>
      <Select>
        <SelectTrigger>
          {/* TODO: be careful with this when the db is implemented */}
          <SelectValue placeholder={value} />
        </SelectTrigger>
        <SelectContent className='max-h-72'>
          {employees.map((employee) => (
            // TODO: add onSelect handler when db is implemented
            <SelectItem key={employee.id} value={employee.id}>
              {employee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button variant='outline' onClick={onRemove}>
        Entfernen
        <Cross2Icon className='ml-2 h-4 w-4' />
      </Button>
    </li>
  )
}

interface ListItemData {
  id: string
  isRemoving: boolean
  isAdding: boolean
  value: string
}

export const SelectResponsive: React.FC<{
  employees: Employee[]
}> = ({ employees }) => {
  const [listItems, setListItems] = useState<ListItemData[]>([])

  const removeListItem = (employeeId: string) => {
    setListItems((prevList) =>
      prevList.map((item) =>
        item.id === employeeId ? { ...item, isRemoving: true } : item
      )
    )

    setTimeout(() => {
      setListItems((prevList) =>
        prevList.filter((item) => item.id !== employeeId)
      )
    }, 400)
  }

  const addListItem = (employeeId: string) => {
    const employee = employees.find((e) => e.id === employeeId)
    if (!employee) return
    setListItems((prevList) => [
      ...prevList,
      {
        id: employeeId,
        isRemoving: false,
        isAdding: true,
        value: employee.name,
      },
    ])
  }

  useEffect(() => {
    if (listItems.length > 0 && listItems[listItems.length - 1].isAdding) {
      setTimeout(() => {
        setListItems((prevList) =>
          prevList.map((item, index) =>
            index === prevList.length - 1 ? { ...item, isAdding: false } : item
          )
        )
      }, 300)
    }
  }, [listItems])

  return (
    <ul className='grid gap-2'>
      {listItems.map((item) => (
        <ListItem
          key={item.id}
          onRemove={() => removeListItem(item.id)}
          isRemoving={item.isRemoving}
          isAdding={item.isAdding}
          value={item.value}
          employees={employees}
        />
      ))}
      <Select
        onValueChange={(value) => {
          addListItem(value)
        }}
      >
        <SelectTrigger className=''>
          <Label>Mitarbeiter hinzufuegen</Label>
        </SelectTrigger>
        <SelectContent className='max-h-72'>
          {employees.map((employee) => (
            // TODO: add toast notification if the employee was already selected?
            <SelectItem
              key={employee.id}
              value={employee.id}
              showIndicator={false}
            >
              {employee.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </ul>
  )
}
