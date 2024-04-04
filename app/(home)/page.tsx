import { aggregateOperationalPlanData } from '@/actions/aggregate-operationalPlan-data'
import { getUsersName, getUsersWithTasks } from '@/actions/get-user'
import { OperationalPlanTable } from '@/components/table/operationalPlan-table'
import { OperationalPlanColumns } from '@/components/table/operationalPlan-table-columns'
import { searchParamsCache } from '@/lib/params/searchparams'
import UserProvider from '@/lib/provider/user-provider'
import type { SearchParams } from 'nuqs/server'

interface DashboardPageProps {
  searchParams: SearchParams
}

export default async function DashboardPage({
  searchParams,
}: DashboardPageProps) {
  const usersName = await getUsersName()

  const data = await aggregateOperationalPlanData()

  searchParamsCache.parse(searchParams)

  return (
    <section>
      <UserProvider _users={usersName}>
        <OperationalPlanTable columns={OperationalPlanColumns} data={data} />
      </UserProvider>
    </section>
  )
}
