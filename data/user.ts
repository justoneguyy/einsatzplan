import db from '@/lib/db'

export const getUser = async (firstName: string, lastName: string) => {
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
