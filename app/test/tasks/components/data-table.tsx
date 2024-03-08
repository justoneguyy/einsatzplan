'use client'

import { DragHandleDots2Icon } from '@radix-ui/react-icons'
import {
  ColumnDef,
  SortingState,
  Table,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'

import { memo, useMemo, useState } from 'react'
import { DataTableColumnHeaderAscDescReset } from './data-table-column-header'
import { DataTableViewOptions } from './data-table-view-options'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

  const memoEnabled: boolean = true

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
      // TOOD: calculate these values later on
      minSize: 200,
      maxSize: 400,
    },
    columnResizeMode: 'onChange',
    onSortingChange: setSorting,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    // TODO: remove later on
    debugTable: true,
    debugHeaders: true,
    debugColumns: true,
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
    <div
      className='space-y-2'
      style={{
        width: table.getTotalSize(),
      }}
    >
      <div className='flex justify-end'>
        <DataTableViewOptions table={table} />
      </div>
      <div
        className='overflow-x-none w-fit rounded-md border'
        style={{
          ...columnSizeVars,
        }}
      >
        <div>
          {table.getHeaderGroups().map((headerGroup) => (
            <div key={headerGroup.id} className='flex h-10 w-fit'>
              {headerGroup.headers.map((header) => (
                <div
                  key={header.id}
                  className='relative h-10 border-b border-r pl-4 font-medium text-muted-foreground last:border-r-0'
                  style={{
                    width: `calc(var(--header-${header?.id}-size) * 1px)`,
                  }}
                >
                  <span className='flex h-full items-center text-sm'>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </span>
                  {header.column.columnDef.enableResizing && (
                    <div
                      // this seems to be buggy
                      // onDoubleClick={() => header.column.resetSize()}
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
                </div>
              ))}
            </div>
          ))}
        </div>
        {table.getState().columnSizingInfo.isResizingColumn && memoEnabled ? (
          <MemoizedTableBody table={table} />
        ) : (
          <CustomTableBody table={table} />
        )}
      </div>
    </div>
  )
}

function CustomTableBody<TData>({ table }: { table: Table<TData> }) {
  return (
    <div>
      {table.getRowModel().rows.map((row) => (
        <div key={row.id} className='flex w-fit border-b last:border-b-0'>
          {row.getVisibleCells().map((cell) => {
            return (
              <div
                key={cell.id}
                className='border-r p-2 pl-4 last:border-r-0'
                style={{
                  width: `calc(var(--col-${cell.column.id}-size) * 1px)`,
                }}
              >
                {cell.renderValue<any>()}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}

export const MemoizedTableBody = memo(
  CustomTableBody,
  (prev, next) => prev.table.options.data === next.table.options.data
) as typeof CustomTableBody
