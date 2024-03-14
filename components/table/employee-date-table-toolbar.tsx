import { DataTableFilter } from '../ui/data-table-filter'
import {
  DataTableSearchbar,
  DataTableSearchbarProps,
} from '../ui/data-table-searchbar'
import {
  DataTableFacetedFilter,
  DataTableFacetedFilterProps,
} from '../ui/data-table-faceted-filter'
import { Table } from '@tanstack/react-table'
import { Option } from '@/lib/types'

export interface DataTableToolbarProps<TData, TValue>
  extends DataTableFacetedFilterProps<TData, TValue>,
    DataTableSearchbarProps {
  table?: Table<TData>
  // roleOptions: TOption[]
  // groupOptions: TOption[]
  roleOptions: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
  groupOptions: {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
  }[]
}

export function EmployeeDataTableToolbar<TData, TValue>({
  table,
  column,
  roleOptions,
  groupOptions,
  filter,
  setFilter,
}: DataTableToolbarProps<TData, TValue>) {
  const isFiltered = table!.getState().columnFilters.length > 0

  return (
    <div className='flex justify-between'>
      <div className='flex space-x-5'>
        <DataTableSearchbar title='' filter={filter} setFilter={setFilter} />
        <DataTableFacetedFilter
          column={column}
          title='Rolle'
          options={roleOptions}
        />
        <DataTableFacetedFilter
          column={column}
          title='Gruppe'
          options={groupOptions}
        />
      </div>
      <DataTableFilter table={table} />
    </div>
  )
}
