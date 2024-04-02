import { UnwrapArray, UnwrapPromise } from '@/lib/types'
import { getUsers, getUsersName } from '@/actions/get-user'

export type UsersTypeName = UnwrapPromise<ReturnType<typeof getUsersName>>

export type UserType = UnwrapArray<UnwrapPromise<ReturnType<typeof getUsers>>>
