'use client'

import { UsersTypeName } from '@/actions/get-user/types'
import { createContext, useContext } from 'react'

interface UserContextProps {
  _users: UsersTypeName
}

export const UserContext = createContext<UserContextProps>({
  _users: [],
})

interface UserProviderProps {
  _users: UsersTypeName
  children: React.ReactNode
}

export default function UserProvider({ _users, children }: UserProviderProps) {
  return (
    <UserContext.Provider value={{ _users }}>{children}</UserContext.Provider>
  )
}

export function useUserContext() {
  return useContext(UserContext)
}
