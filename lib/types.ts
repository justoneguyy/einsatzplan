export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

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
