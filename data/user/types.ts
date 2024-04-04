import { UnwrapArray, UnwrapPromise } from '@/lib/types'
import { getUsers, getUsersName, getUsersWithTasks } from '@/actions/get-user'

export type UsersTypeName = UnwrapPromise<ReturnType<typeof getUsersName>>

export type UserType = UnwrapArray<UnwrapPromise<ReturnType<typeof getUsers>>>

export type UserTaskType = UnwrapArray<
  UnwrapPromise<ReturnType<typeof getUsersWithTasks>>
>
