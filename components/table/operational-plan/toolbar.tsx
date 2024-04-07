import { Table } from '@tanstack/react-table'
import { TableFilter } from '../ui/table-filter'

interface OperationalPlanTableToolbarProps<TData> {
  table: Table<TData>
  filter?: string
  setFilter?: (value: string) => void
}

export function OperationalPlanTableToolbar<TData>({
  table,
  filter,
  setFilter,
}: OperationalPlanTableToolbarProps<TData>) {
  return (
    // TODO: set filter fn in task-columns for weekdays. otherwise this doesnt make sense since only the users can be filtered by default
    // <div className='flex items-center justify-between'>
    //   <TableSearchbar title='' filter={filter} setFilter={setFilter} />
    //   <TableFilter table={table} />
    // </div>
    <div className='flex items-center justify-end'>
      <TableFilter table={table} />
    </div>
  )
}
