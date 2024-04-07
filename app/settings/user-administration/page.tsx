import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import { getUsers } from '@/actions/get-user'
import { UserTable } from '@/components/table/user-administration/table'
import { UserColumns } from '@/components/table/user-administration/columns'
import GroupProvider from '@/lib/provider/group-provider'
import RoleProvider from '@/lib/provider/role-provider'

export default async function SettingsUserAdministrationPage() {
  const users = await getUsers()

  const roles = await getRoles()
  const groups = await getGroups()

  return (
    <div className='space-y-6'>
      <RoleProvider _roles={roles}>
        <GroupProvider _groups={groups}>
          <UserTable
            columns={UserColumns}
            data={users}
            roles={roles}
            groups={groups}
          />
        </GroupProvider>
      </RoleProvider>
    </div>
  )
}
