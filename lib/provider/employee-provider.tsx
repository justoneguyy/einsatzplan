'use client'

import { EmployeesTypeName } from '@/actions/get-employee/types'
import { createContext, useContext } from 'react'

interface EmployeeContextProps {
  _employees: EmployeesTypeName
}

export const EmployeeContext = createContext<EmployeeContextProps>({
  _employees: [],
})

interface EmployeeProviderProps {
  _employees: EmployeesTypeName
  children: React.ReactNode
}

export default function EmployeeProvider({
  _employees,
  children,
}: EmployeeProviderProps) {
  return (
    <EmployeeContext.Provider value={{ _employees }}>
      {children}
    </EmployeeContext.Provider>
  )
}

export function useEmployeeContext() {
  return useContext(EmployeeContext)
}
