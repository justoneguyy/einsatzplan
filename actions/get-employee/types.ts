import { getEmployees, getEmployeesName, getEmployeesWithTasks } from '.'

type UnwrapPromise<T> = T extends Promise<infer U> ? U : T

export type EmployeesType = UnwrapPromise<ReturnType<typeof getEmployees>>

export type EmployeesTaskType = UnwrapPromise<
  ReturnType<typeof getEmployeesWithTasks>
>

export type EmployeesTypeName = UnwrapPromise<
  ReturnType<typeof getEmployeesName>
>
