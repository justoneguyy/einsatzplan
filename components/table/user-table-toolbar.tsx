import { Option } from '@/lib/types'
import { Table } from '@tanstack/react-table'
import { TableFilter } from './ui/table-filter'
import { TableSearchbar } from './ui/table-searchbar'

interface UserTableToolbarProps<TData> {
  table: Table<TData>
  roleOptions: Option[]
  groupOptions: Option[]
  filter: string
  setFilter: (value: string) => void
}

export function UserTableToolbar<TData>({
  table,
  roleOptions,
  groupOptions,
  filter,
  setFilter,
}: UserTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0

  return (
    <div className='flex items-center justify-between'>
      <div className='flex space-x-2'>
        <TableSearchbar
          title='Mitarbeiter'
          filter={filter}
          setFilter={setFilter}
        />
        {/* TODO: the FacetedFilter currently do not work (when a value is selected, no value is actually passed) fix this */}
        {/* {table.getColumn('role') && (
          <TableFacetedFilter
            column={table.getColumn('role')}
            title='Rolle'
            options={roleOptions}
          />
        )}
        {table.getColumn('groups') && (
          <TableFacetedFilter
            column={table.getColumn('groups')}
            title='Gruppe'
            options={groupOptions}
          />
        )} */}
        {/* {isFiltered && (
          <Button
            variant='ghost'
            onClick={() => table.resetColumnFilters()}
            className='h-8 px-2 lg:px-3'
          >
            Reset
            <Cross2Icon className='ml-2 h-4 w-4' />
          </Button>
        )} */}
      </div>
      <TableFilter table={table} />
    </div>
  )
}
