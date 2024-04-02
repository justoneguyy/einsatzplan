export type UnwrapPromise<T> = T extends Promise<infer U> ? U : T
export type UnwrapArray<T> = T extends Array<infer U> ? U : T

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}
