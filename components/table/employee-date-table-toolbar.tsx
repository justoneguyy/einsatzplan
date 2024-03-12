import { DataTableFilter } from '../ui/data-table-filter'
import { DataTableSearchbar } from '../ui/data-table-searchbar'
import {
  DataTableFacetedFilter,
  DataTableFacetedFilterProps,
} from '../ui/data-table-faceted-filter'
import { Table } from '@tanstack/react-table'

export interface DataTableToolbarProps<TData, TValue>
  extends DataTableFacetedFilterProps<TData, TValue> {
  table: Table<TData>
}

export function EmployeeDataTableToolbar<TData, TValue>({
  table,
  column,
  title,
  options,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex justify-between'>
      <div className='flex space-x-5'>
        <DataTableSearchbar table={table} title='' />
        <DataTableFacetedFilter
          column={column}
          title={title}
          options={options}
        />
        {/* <DataTableFacetedFilter
          column={column}
          title={title}
          options={options}
        /> */}
      </div>
      <DataTableFilter table={table} />
    </div>
  )
}
