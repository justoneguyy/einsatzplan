import { getUsers } from '@/actions/get-user'
import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import { Options } from '@/components/table/data/options'
import { UserColumns } from '@/components/table/user-table-columns'
import { UserTable } from '@/components/table/user-table'
import GroupProvider from '@/lib/provider/group-provider'
import RoleProvider from '@/lib/provider/role-provider'

export default async function SettingsUserAdministrationPage() {
  const users = await getUsers()

  const { roleOptions, groupOptions } = await Options()

  const roles = await getRoles()
  const groups = await getGroups()

  return (
    <div className='space-y-6'>
      <RoleProvider _roles={roles}>
        <GroupProvider _groups={groups}>
          <UserTable
            columns={UserColumns}
            data={users}
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
