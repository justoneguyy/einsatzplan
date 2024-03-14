import { getGroups } from '@/actions/get-group'
import { getRoles } from '@/actions/get-role'
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CircleIcon,
  QuestionMarkCircledIcon,
} from '@radix-ui/react-icons'

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

// export const roles = [
//   {
//     value: 'user',
//     label: 'User',
//     icon: QuestionMarkCircledIcon,
//   },
//   {
//     value: 'admin',
//     label: 'Admin',
//     icon: CircleIcon,
//   },
// ]

// export const groups = [
//   {
//     label: 'Software Developer',
//     value: 'SOFTWARE_DEVELOPER',
//     icon: ArrowDownIcon,
//   },
//   {
//     label: 'Systems Engineer',
//     value: 'SYSTEMS_ENGINEER',
//     icon: ArrowRightIcon,
//   },
//   {
//     label: 'Apprentice',
//     value: 'APPRENTICE',
//     icon: ArrowUpIcon,
//   },
//   {
//     label: 'On-call service',
//     value: 'ON_CALL_SERVICE',
//     icon: ArrowUpIcon,
//   },
// ]
