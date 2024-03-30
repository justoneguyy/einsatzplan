import { User, Task } from '@prisma/client'

export interface Option {
  label: string
  value: string
  icon?: React.ComponentType<{ className?: string }>
}

export interface TaskProps extends Omit<Task, 'createdAt' | 'updatedAt'> {}

export interface UserProps extends Pick<User, 'firstName' | 'lastName'> {}
