import { DataTableFilter } from './ui/data-table-filter'
import { Table } from '@tanstack/react-table'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
}

export function TaskDataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  return (
    <div className='flex items-center justify-end'>
      <DataTableFilter table={table} />
    </div>
  )
}
