import db from '@/lib/db'

// TODO: combine these for cleaner validation (validate one by one)

export const getUserById = async (id: string) => {
  try {
    const user = await db.user.findUnique({
      where: {
        id,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByName = async (firstName: string, lastName: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        firstName,
        lastName,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByRole = async (roleId: string) => {
  try {
    const user = await db.user.findFirst({
      where: {
        roleId,
      },
    })

    return user
  } catch {
    return null
  }
}

export const getUserByAllGroups = async (groupIds: string[]) => {
  try {
    const user = await db.user.findFirst({
      where: {
        groups: {
          every: {
            groupId: {
              in: groupIds,
            },
          },
        },
      },
    })

    return user
  } catch {
    return null
  }
}
