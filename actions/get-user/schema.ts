import { z } from 'zod'

const GetUser = z.object({
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
})

export type GetUserType = z.infer<typeof GetUser>

const GetUserTask = z.object({
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
      id: z.string(),
      userId: z.string(),
      taskId: z.string(),
      user: z.object({
        id: z.string(),
        firstName: z.string(),
        lastName: z.string(),
        initials: z.string(),
        email: z.string(),
        profilePicture: z.string().nullable(),
        roleId: z.string(),
      }),
      task: z.object({
        id: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        dateFrom: z.date(),
        dateTo: z.date(),
        timeFrom: z.string().nullable(),
        timeTo: z.string().nullable(),
      }),
    })
  ),
})

export type GetUserTaskType = z.infer<typeof GetUserTask>
