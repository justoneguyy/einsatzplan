import { getGroups } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type GroupsType = UnwrapPromise<ReturnType<typeof getGroups>>
