import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'

export async function EmployeeOptions() {
  const roles = await getRoles()

  const roleOptions = roles.map((role) => ({
    value: role.id,
    label: role.name,
  }))

  const groups = await getGroups()

  const groupOptions = groups.map((group) => ({
    value: group.id,
    label: group.name,
  }))

  return { roleOptions, groupOptions }
}
