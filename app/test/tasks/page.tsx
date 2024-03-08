import { promises as fs } from 'fs'
import path from 'path'
import { columns } from './components/columns'
import { DataTable } from './components/data-table'
import { z } from 'zod'
import { taskSchema } from './data/schema'

async function getTasks() {
  const data = await fs.readFile(
    path.join(process.cwd(), 'app/test/tasks/data/tasks.json')
  )

  const tasks = JSON.parse(data.toString())

  return z.array(taskSchema).parse(tasks)
}

export default async function DemoPage() {
  const tasks = await getTasks()

  return <DataTable columns={columns} data={tasks} />
}
