'use client'

import { GroupsType } from '@/actions/get-group/types'
import { createContext, useContext } from 'react'

interface GroupContextProps {
  _groups: GroupsType
}

export const GroupContext = createContext<GroupContextProps>({
  _groups: [],
})

interface RoleProviderProps {
  _groups: GroupsType
  children: React.ReactNode
}

export default function GroupProvider({
  _groups,
  children,
}: RoleProviderProps) {
  return (
    <GroupContext.Provider value={{ _groups }}>
      {children}
    </GroupContext.Provider>
  )
}

export function useGroupContext() {
  return useContext(GroupContext)
}
