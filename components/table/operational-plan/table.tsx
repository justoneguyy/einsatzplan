'use client'

import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { memo, useMemo, useState } from 'react'
import { OperationalPlanTableToolbar } from './toolbar'

interface OperationalPlanTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

// TODO: add memoization
export function OperationalPlanTable<TData, TValue>({
  columns,
  data,
}: OperationalPlanTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [filter, setFilter] = useState('')

  const table = useReactTable({
    data: data,
    columns,
    defaultColumn: {
      minSize: 60,
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

  const columnSizeVars = useMemo(() => {
    const headers = table.getFlatHeaders()
    const colSizes: { [key: string]: number } = {}
    for (let i = 0; i < headers.length; i++) {
      const header = headers[i]!
      colSizes[`--header-${header.id}-size`] = header.getSize()
      colSizes[`--col-${header.column.id}-size`] = header.column.getSize()
    }
    return colSizes
  }, [table.getState().columnSizingInfo])

  return (
    <div className='space-y-2'>
      <OperationalPlanTableToolbar
        table={table}
        filter={filter}
        setFilter={setFilter}
      />
      <div className='overflow-x-auto rounded-md border'>
        <Table
          className='min-w-full'
          style={{
            ...columnSizeVars,
            width: table.getTotalSize(),
          }}
        >
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className='border-b border-r pl-4 last:border-r-0'
                    style={{
                      position: 'relative',
                      width: `calc(var(--header-${header?.id}-size) * 1px)`,
                    }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    {header.column.columnDef.enableResizing && (
                      <div
                        // TODO: add doubleClick?
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
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <MemoizedTableBody table={table} />
        </Table>
      </div>
    </div>
  )
}

function TableBodyCustom({ table }: { table: TableType<any> }) {
  return (
    <TableBody>
      {table.getRowModel().rows.map((row) => {
        return (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => {
              return (
                <TableCell
                  key={cell.id}
                  className='h-18 border-r last:border-r-0'
                  style={{
                    width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              )
            })}
          </TableRow>
        )
      })}
    </TableBody>
  )
}

const MemoizedTableBody = memo(
  TableBodyCustom,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof TableBodyCustom
