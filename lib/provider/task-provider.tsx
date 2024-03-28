'use client'

import { GetTaskType } from '@/actions/get-task/schema'
import { createContext, useContext } from 'react'

interface TaskContextProps {
  _task: GetTaskType
}

export const TaskContext = createContext<TaskContextProps>({
  _task: {} as GetTaskType,
})

interface TaskProviderProps {
  _task: GetTaskType
  children: React.ReactNode
}

export default function TaskProvider({ _task, children }: TaskProviderProps) {
  return (
    <TaskContext.Provider value={{ _task }}>{children}</TaskContext.Provider>
  )
}

export function useTaskContext() {
  return useContext(TaskContext)
}
