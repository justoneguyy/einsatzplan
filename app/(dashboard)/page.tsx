import { TableWeek } from '@/components/table-week'

import { promises as fs } from 'fs'
import path from 'path'
import { columns } from '@/components/table/columns'
import { DataTable } from '@/components/table/data-table'
import { z } from 'zod'
import { taskSchema } from '@/components/table/data/schema'

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'components/table/data/tasks.json')
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function DashboardPage() {
  const tasks = await getTasks()

  return (
    <section className=''>
      {/* <TableWeek /> */}
      <DataTable columns={columns} data={tasks} />
    </section>
  )
}
