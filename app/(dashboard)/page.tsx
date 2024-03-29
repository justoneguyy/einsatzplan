import { getEmployeesName, getEmployeesWithTasks } from '@/actions/get-employee'
import { TaskColumns } from '@/components/table/task-columns'
import { TaskDataTable } from '@/components/table/task-data-table'
import type { SearchParams } from 'nuqs/server'
import EmployeeProvider from '@/lib/provider/employee-provider'
import { searchParamsCache } from '@/lib/params/searchparams'
import { setDefaultOptions } from 'date-fns'
import { de } from 'date-fns/locale'

interface DashboardPageProps {
  searchParams: SearchParams
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const employees = await getEmployeesWithTasks()

  const employeesWithNames = await getEmployeesName()

  searchParamsCache.parse(searchParams)

  return (
    <section>
      <EmployeeProvider _employees={employeesWithNames}>
        <TaskDataTable columns={TaskColumns} data={employees} />
      </EmployeeProvider>
    </section>
  )
}
