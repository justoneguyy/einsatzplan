import db from '@/lib/db'

export const getTaskByEmployeeDateTitle = async (
  title: string,
  dateFrom: Date,
  dateTo: Date,
  userIds: string[],
  timeFrom?: string,
  timeTo?: string
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
        timeFrom,
        timeTo,
      },
    })

    return task
  } catch {
    return null
  }
}
