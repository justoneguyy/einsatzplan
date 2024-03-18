import { getEmployees } from '@/actions/get-employee'
import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import { Options } from '@/components/table/data/options'
import { EmployeeColumns } from '@/components/table/employee-columns'
import { EmployeeDataTable } from '@/components/table/employee-data-table'
import GroupProvider from '@/lib/provider/group-provider'
import RoleProvider from '@/lib/provider/role-provider'

export default async function SettingsEmployeeAdministrationPage() {
  const employees = await getEmployees()

  const { roleOptions, groupOptions } = await Options()

  const roles = await getRoles()
  const groups = await getGroups()

  return (
    <div className='space-y-6'>
      <RoleProvider _roles={roles}>
        <GroupProvider _groups={groups}>
          <EmployeeDataTable
            columns={EmployeeColumns}
            data={employees}
            roleOptions={roleOptions}
            groupOptions={groupOptions}
            roles={roles}
            groups={groups}
          />
        </GroupProvider>
      </RoleProvider>
    </div>
  )
}
