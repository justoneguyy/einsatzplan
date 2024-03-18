import { getEmployees } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type EmployeesType = UnwrapPromise<ReturnType<typeof getEmployees>>
