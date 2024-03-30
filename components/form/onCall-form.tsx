'use client'

import { createTask } from '@/actions/create-task'
import { UsersTypeName } from '@/actions/get-user/types'
import { useAction } from '@/lib/hooks/useAction'
import { useState } from 'react'
import { Button } from '../ui/button'
import { CustomToast } from '../ui/toaster'
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import FormSelect from './ui/form-select'
import { DialogClose } from '../dialog/ui/dialog-cancel'

interface OnCallFormProps {
  users: UsersTypeName
  onCreate: () => void
}

function OnCallForm({ users, onCreate }: OnCallFormProps) {
  const [userId, setUserId] = useState('')

  const { execute, fieldErrors } = useAction(createTask, {
    onSuccess: (task) => {
      CustomToast({
        title: `Aufgabe ${task.title} erstellt`,
      })()
      onCreate()
    },
    onError: (error) => {
      CustomToast({
        title: `Die Aufgabe konnte nicht erstellt werden`,
        description: error,
        duration: 15000,
      })()
    },
  })

  // const onSubmit = (formData: FormData) => {
  //   const userId = formData.get('userId') as string

  //   execute({
  //     userId,
  //   })
  // }

  return (
    <form className='space-y-4'>
      {/* <form action={onSubmit} className='space-y-4'> */}
      {/* TOOD: add date range */}
      <div className='flex flex-col space-y-2'>
        <FormSelect
          id='userId'
          label='Mitarbeiter'
          placeholder='Wähle einen Mitarbeiter aus'
          options={users}
          value={userId}
          onValueChange={setUserId}
          errors={fieldErrors}
        />
      </div>
      <div className='!mt-8 flex justify-end space-x-3'>
        <DialogClose />
        <FormSubmit>Anlegen</FormSubmit>
      </div>
    </form>
  )
}

export default OnCallForm
// 'use client'

// import { createTask } from '@/actions/create-task'
// import { UsersTypeName } from '@/actions/get-user/types'
// import { useAction } from '@/lib/hooks/useAction'
// import { useState } from 'react'
// import { Button } from '../ui/button'
// import { CustomToast } from '../ui/toaster'
// import { FormInput } from './ui/form-input'
// import FormSelectMultiple from './ui/form-select-multiple'
// import { FormSubmit } from './ui/form-submit'
// import FormSelect from './ui/form-select'
// import { DialogClose } from '../dialog/ui/dialog-cancel'

// interface OnCallFormProps {
//   Users: UsersTypeName
//   onCreate: () => void
// }

// function OnCallForm({ Users, onCreate }: OnCallFormProps) {
//   const [userId, setuserId] = useState('')

//   const { execute, fieldErrors } = useAction(createTask, {
//     onSuccess: (task) => {
//       CustomToast({
//         title: `Aufgabe ${task.title} erstellt`,
//       })()
//       onCreate()
//     },
//     onError: (error) => {
//       CustomToast({
//         title: `Die Aufgabe konnte nicht erstellt werden`,
//         description: error,
//         duration: 15000,
//       })()
//     },
//   })

//   // const onSubmit = (formData: FormData) => {
//   //   const userId = formData.get('userId') as string

//   //   execute({
//   //     userId,
//   //   })
//   // }

//   return (
//     <form className='space-y-4'>
//       {/* <form action={onSubmit} className='space-y-4'> */}
//       {/* TOOD: add date range */}
//       <div className='flex flex-col space-y-2'>
//         <FormSelect
//           id='userId'
//           label='Mitarbeiter'
//           placeholder='Wähle einen Mitarbeiter aus'
//           options={Users}
//           value={userId}
//           onValueChange={setuserId}
//           errors={fieldErrors}
//         />
//       </div>
//       <div className='!mt-8 flex justify-end space-x-3'>
//         <DialogClose />
//         <FormSubmit>Anlegen</FormSubmit>
//       </div>
//     </form>
//   )
// }

// export default OnCallForm
