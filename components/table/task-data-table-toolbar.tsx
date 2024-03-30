import { DataTableFilter } from './ui/data-table-filter'
import { Table } from '@tanstack/react-table'
import { DataTableSearchbar } from './ui/data-table-searchbar'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  filter?: string
  setFilter?: (value: string) => void
}

export function TaskDataTableToolbar<TData>({
  table,
  filter,
  setFilter,
}: DataTableToolbarProps<TData>) {
  return (
    // TODO: set filter fn in task-columns for weekdays. otherwise this doesnt make sense since only the employees can be filtered by default
    // <div className='flex items-center justify-between'>
    //   <DataTableSearchbar title='' filter={filter} setFilter={setFilter} />
    //   <DataTableFilter table={table} />
    // </div>
    <div className='flex items-center justify-end'>
      <DataTableFilter table={table} />
    </div>
  )
}
