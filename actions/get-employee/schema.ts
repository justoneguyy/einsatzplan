import { z } from 'zod'

const GetEmployee = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  initials: z.string(),
  email: z.string(),
  profilePicture: z.string().nullable(),
  roleId: z.string(),
  role: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  groups: z.array(
    z.object({
      group: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
      }),
    })
  ),
  availabilityId: z.string().nullable(),
  availability: z
    .object({
      id: z.string(),
      name: z.string(),
      description: z.string().nullable(),
      color: z.string(),
    })
    .nullable(),
})

export type GetEmployeeType = z.infer<typeof GetEmployee>

const GetEmployeeTask = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  initials: z.string(),
  email: z.string(),
  profilePicture: z.string().nullable(),
  roleId: z.string(),
  role: z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().nullable(),
  }),
  groups: z.array(
    z.object({
      group: z.object({
        id: z.string(),
        name: z.string(),
        description: z.string().nullable(),
      }),
    })
  ),
  tasks: z.array(
    z.object({
      task: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        dateFrom: z.date(),
        dateTil: z.date(),
        timeFrom: z.string().nullable(),
        timeTil: z.string().nullable(),
      }),
    })
  ),
  availabilityId: z.string().nullable(),
})

export type GetEmployeeTaskType = z.infer<typeof GetEmployeeTask>
