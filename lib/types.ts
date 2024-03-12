// import { Column, Table } from '@tanstack/react-table'

// export interface TanstackTableProps<TData> {
//   table: Table<TData>
// }

// export interface TanstackColumnProps<TData, TValue> {
//   column?: Column<TData, TValue>
// }

export type Assignment = {
  timeFrom: string
  timeTil: string
  task: string
}

type Availability = {
  status: string
  color: string
}

export type Employee = {
  id: string
  name: string
  profilePicture?: string
  availability: Availability[]
  assignments: {
    day: string
    tasks: Assignment[]
  }[]
}
