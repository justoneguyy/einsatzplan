import { getEmployeesWithTasks } from '@/actions/get-employee'
import { TaskColumns } from '@/components/table/task-columns'
import { TaskDataTable } from '@/components/table/task-data-table'

export default async function DashboardPage() {
  const employees = await getEmployeesWithTasks()

  return (
    <section className=''>
      <TaskDataTable columns={TaskColumns} data={employees} />
    </section>
  )
}
