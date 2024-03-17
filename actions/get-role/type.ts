import { getRoles } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type RolesType = UnwrapPromise<ReturnType<typeof getRoles>>
