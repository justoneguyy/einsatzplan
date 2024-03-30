import { getUsers, getUsersName, getUsersWithTasks } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type UsersType = UnwrapPromise<ReturnType<typeof getUsers>>

export type UsersTaskType = UnwrapPromise<ReturnType<typeof getUsersWithTasks>>

export type UsersTypeName = UnwrapPromise<ReturnType<typeof getUsersName>>
