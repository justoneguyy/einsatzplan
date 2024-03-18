import { getTasks } from '@/actions/get-task'
import { TaskColumns } from '@/components/table/task-columns'
import { TaskDataTable } from '@/components/table/task-data-table'

export default async function DashboardPage() {
  const tasks = await getTasks()

  return (
    <section className=''>
      <TaskDataTable columns={TaskColumns} data={tasks} />
    </section>
  )
}
