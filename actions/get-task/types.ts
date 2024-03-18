import { getTasks } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type TasksType = UnwrapPromise<ReturnType<typeof getTasks>>
