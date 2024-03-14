'use client'

import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import {
  useReactTable,
  ColumnDef,
  flexRender,
  SortingState,
  VisibilityState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { Button } from '../ui/button'
import {
  DataTableToolbarProps,
  EmployeeDataTableToolbar,
} from './employee-date-table-toolbar'

interface DataTableProps<TData, TValue>
  extends DataTableToolbarProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// TODO: if performance is bad, add memoization
export function EmployeeDataTable<TData, TValue>({
  columns,
  data,
  roleOptions,
  groupOptions,
  column,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [filter, setFilter] = useState('')

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 200,
      maxSize: 800,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: 0,
        pageSize: data.length,
      },
      globalFilter: filter,
    },
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onGlobalFilterChange: setFilter,
    onColumnVisibilityChange: setColumnVisibility,
  })

  return (
    <div className='max-w-full space-y-2'>
      <EmployeeDataTableToolbar
        table={table}
        column={column}
        roleOptions={roleOptions}
        groupOptions={groupOptions}
        filter={filter}
        setFilter={setFilter}
      />
      <div className='rounded-md border'>
        <Table className='w-full'>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      colSpan={header.colSpan}
                      style={{
                        position: 'relative',
                        width: `calc(var(--header-${header?.id}-size) * 1px)`,
                      }}
                      className='border-b border-r pl-4 text-center last:border-r-0'
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {header.column.columnDef.enableResizing && (
                        <div
                          onMouseDown={header.getResizeHandler()}
                          onTouchStart={header.getResizeHandler()}
                          className={`absolute right-0 top-0 h-full w-[1px] cursor-ew-resize select-none bg-transparent ${
                            header.column.getIsResizing()
                              ? 'bg-primary opacity-100'
                              : ''
                          }`}
                        >
                          <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform'>
                            <div className='z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border'>
                              <DragHandleDots2Icon className='h-2.5 w-2.5' />
                            </div>
                          </div>
                        </div>
                      )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell
                        key={cell.id}
                        style={{ width: cell.column.getSize() }}
                        className='border-r last:border-r-0'
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    )
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </div>
      {/* modal or add table row? */}
      <div className='flex justify-end'>
        <Button variant='outline'>Mitarbeiter hinzugefügen</Button>
      </div>
    </div>
  )
}
