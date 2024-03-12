'use client'

import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState } from 'react'
import { EmployeeDataTableToolbar } from './employee-date-table-toolbar'
import { DataTableFacetedFilterProps } from '../ui/data-table-faceted-filter'
import { Button } from '../ui/button'

interface DataTableProps<TData, TValue>
  extends DataTableFacetedFilterProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function EmployeeDataTable<TData, TValue>({
  columns,
  data,
  column,
  title,
  options,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      pagination: {
        pageIndex: 0,
        pageSize: data.length,
      },
    },
    defaultColumn: {
      minSize: 200,
      maxSize: 800,
    },
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className='max-w-full space-y-2'>
      <EmployeeDataTableToolbar
        table={table}
        column={column}
        title={title}
        options={options}
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
