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
  id: number
  name: string
  profilePicture?: string
  availability: Availability[]
  assignments: {
    [key: string]: Assignment[]
  }
}
