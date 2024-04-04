'use client'

import { GroupsType } from '@/data/group/types'
import { createContext, useContext } from 'react'

interface GroupContextProps {
  _groups: GroupsType
}

export const GroupContext = createContext<GroupContextProps>({
  _groups: [],
})

interface GroupProviderProps {
  _groups: GroupsType
  children: React.ReactNode
}

export default function GroupProvider({
  _groups,
  children,
}: GroupProviderProps) {
  return (
    <GroupContext.Provider value={{ _groups }}>
      {children}
    </GroupContext.Provider>
  )
}

export function useGroupContext() {
  return useContext(GroupContext)
}
