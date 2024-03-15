import { DataTableFilter } from '../ui/data-table-filter'
import { DataTableSearchbar } from '../ui/data-table-searchbar'
import { DataTableFacetedFilter } from '../ui/data-table-faceted-filter'
import { Table } from '@tanstack/react-table'
import { Option } from '@/lib/types'
import { Button } from '../ui/button'
import { Cross2Icon } from '@radix-ui/react-icons'

interface DataTableToolbarProps<TData> {
  table: Table<TData>
  roleOptions: Option[]
  groupOptions: Option[]
  filter: string
  setFilter: (value: string) => void
}

export function EmployeeDataTableToolbar<TData>({
  table,
  roleOptions,
  groupOptions,
  filter,
  setFilter,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex space-x-2'>
        <DataTableSearchbar
          title='Mitarbeiter'
          filter={filter}
          setFilter={setFilter}
        />
        <DataTableFacetedFilter
          column={table.getColumn('role')}
          title='Rolle'
          options={roleOptions}
        />
        <DataTableFacetedFilter
          column={table.getColumn('groups')}
          title='Gruppe'
          options={groupOptions}
        />
        {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )}
      </div>
      <DataTableFilter table={table} />
    </div>
  )
}
