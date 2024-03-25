import { getEmployeesName, getEmployeesWithTasks } from '@/actions/get-employee'
import { getTasks } from '@/actions/get-task'
import { TaskColumns } from '@/components/table/task-columns'
import { TaskDataTable } from '@/components/table/task-data-table'
import EmployeeProvider from '@/lib/provider/employee-provider'

export default async function DashboardPage() {
  const employees = await getEmployeesWithTasks()

  const tasks = await getTasks()

  const employeesWithNames = await getEmployeesName()

  return (
    <section className=''>
      <EmployeeProvider _employees={employeesWithNames}>
        <TaskDataTable columns={TaskColumns} data={employees} />
      </EmployeeProvider>
    </section>
  )
}
