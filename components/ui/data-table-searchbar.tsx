'use client'

import { Input } from '@/ui/input'
import { Table } from '@tanstack/react-table'

interface DataTableSearchbarProps<TData> {
  table: Table<TData>
  title?: string
}

export function DataTableSearchbar<TData>({
  table,
  title,
}: DataTableSearchbarProps<TData>) {
  const placeholder = title + ' filtern...'
  const placeholderDefault = 'Suchen...'

  return (
    <div>
      <Input
        placeholder={title ? placeholder : placeholderDefault}
        value={(table.getColumn('title')?.getFilterValue() as string) ?? ''}
        onChange={(event) =>
          table.getColumn('title')?.setFilterValue(event.target.value)
        }
        className='h-8 w-[150px] lg:w-[250px]'
      />
    </div>
  )
}
