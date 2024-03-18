'use client'

import { RolesType } from '@/actions/get-role/type'
import { createContext, useContext } from 'react'

interface RoleContextProps {
  _roles: RolesType
}

export const RoleContext = createContext<RoleContextProps>({
  _roles: [],
})

interface RoleProviderProps {
  _roles: RolesType
  children: React.ReactNode
}

export default function RoleProvider({ _roles, children }: RoleProviderProps) {
  return (
    <RoleContext.Provider value={{ _roles }}>{children}</RoleContext.Provider>
  )
}

export function useRoleContext() {
  return useContext(RoleContext)
}
