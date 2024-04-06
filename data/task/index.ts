import db from '@/lib/db'

export const getTaskById = async (id: string) => {
  try {
    const task = await db.task.findUnique({
      where: {
        id,
      },
    })

    return task
  } catch {
    return null
  }
}

export const getTaskByEmployeeDateTitle = async (
  title: string,
  dateFrom: Date,
  dateTo: Date,
  userIds: string[]
) => {
  try {
    const task = await db.task.findFirst({
      where: {
        title,
        dateFrom,
        dateTo,
        users: {
          some: {
            userId: {
              in: userIds,
            },
          },
        },
      },
    })

    return task
  } catch {
    return null
  }
}
