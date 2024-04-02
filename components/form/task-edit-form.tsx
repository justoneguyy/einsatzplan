'use client'

import { TaskType } from '@/actions/get-task/types'
import { updateTask } from '@/actions/update-task'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { DialogClose } from '../dialog/ui/dialog-cancel'
import { dialogClose } from '../ui/dialog'
import { Form } from '../ui/form'
import { FormDateRangePicker } from './ui/form-date-range-picker'
import { FormError } from './ui/form-error'
import { FormInput } from './ui/form-input'
import FormSelectMultiple from './ui/form-select-multiple'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'
import { TaskUpdateSchema } from '@/data/task/schema'

interface TaskEditFormProps {
  task: TaskType
}

function TaskEditForm({ task }: TaskEditFormProps) {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof TaskUpdateSchema>>({
    resolver: zodResolver(TaskUpdateSchema),
    // TODO: currently if e.g. the date is not set in the defaultValues, the custom error message isnt being passed. change this behaviour
    defaultValues: {
      id: task.id,
      title: task.title,
      description: task.description,
      date: {
        from: task.dateFrom,
        to: task.dateTo,
      },
      timeFrom: task.timeFrom,
      timeTo: task.timeTo,
      userIds: task.users.map((user) => ({
        value: user.id,
        label: `${user.user.firstName} ${user.user.lastName}`,
      })),
    },
  })

  const onSubmit = (values: z.infer<typeof TaskUpdateSchema>) => {
    setError('')
    setSuccess('')

    startTransition(() => {
      updateTask(values)
        .then((data) => {
          if (data?.error) {
            form.reset()
            setError(data.error)
          }

          if (data?.success) {
            form.reset()
            setSuccess(data.success)
            dialogClose()
            toast.success(`${data.success}`)
          }
        })
        .catch(() => setError('Etwas ist schief gelaufen'))
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
        <div className='space-y-4'>
          <FormInput
            control={form.control}
            name='title'
            label='Titel'
            placeholder='Projektarbeit'
            disabled={isPending}
          />
          <FormDateRangePicker
            control={form.control}
            name='date'
            label='Datum'
            disabled={isPending}
          />
          {/* TODO: add custom time picker with a dropdown menu starting at 06:00 and ending at 20:00 */}
          <div className='flex gap-4'>
            <FormInput
              control={form.control}
              name='timeFrom'
              label='Zeit von'
              placeholder='08:00'
              optional
            />
            <FormInput
              control={form.control}
              name='timeTo'
              label='Zeit bis'
              placeholder='10:00'
              optional
            />
          </div>
          {/* TODO: add groups */}
          <FormSelectMultiple
            control={form.control}
            name='userIds'
            label='Mitarbeiter'
            options={users}
            placeholder='Mitarbeiter auswählen'
            disabled={isPending}
          />
        </div>
        <FormError message={error} />
        <FormSuccess message={success} />
        <div className='flex justify-end space-x-3 pt-6'>
          <DialogClose />
          <FormSubmit className='w-min' title='Anlegen' disabled={isPending} />
        </div>
      </form>
    </Form>
  )
}

export default TaskEditForm

// 'use client'

// import { useAction } from '@/lib/hooks/useAction'
// import { useState } from 'react'
// import { DateRange } from 'react-day-picker'
// import { DialogClose } from '../dialog/ui/dialog-cancel'
// import { CustomToast } from '../ui/toast'
// import { FormDatePicker } from './ui_alt/form-date-picker'
// import { FormInput } from './ui_alt/form-input'
// import FormSelectMultiple from './ui_alt/form-select-multiple'
// import { FormSubmit } from './ui_alt/form-submit'
// import { updateTask } from '@/actions/update-task'
// import { GetTaskType } from '@/actions/get-task/schema'
// import { useUserContext } from '@/lib/provider/user-provider'

// interface TaskEditFormProps {
//   task: GetTaskType
//   onCreate: () => void
// }

// // maybe change zod mode to insta check
// function TaskEditForm({ task, onCreate }: TaskEditFormProps) {
//   const title = task.title
//   const description = task.description
//   const [userIds, setUserIds] = useState(task.users.map((user) => user.task.id))
//   const timeFrom = task.timeFrom
//   const timeTo = task.timeTo

//   const [date, setDate] = useState<DateRange | undefined>({
//     from: task.dateFrom,
//     to: task.dateTo,
//   })

//   const { _users } = useUserContext()

//   // TODO: add later on
//   // const [urlIds, setUrlIds] = useState<string[]>([])

//   // TODO: the toast seems to be messed up because of the dialog. fix this.
//   const { execute, fieldErrors } = useAction(updateTask, {
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

//   const onSubmit = (formData: FormData) => {
//     const title = formData.get('title') as string
//     const description = formData.get('description') as string
//     /* TODO: validate if the user already has a task on that day with that time */
//     const timeFrom = formData.get('timeFrom') as string
//     const timeTo = formData.get('timeTo') as string
//     const formUserIds = formData.getAll('userId') as string[]
//     // const formUrlIds = formData.getAll('urlId') as string[]

//     if (!date?.from || !date?.to) {
//       return
//     }

//     const dateFrom = date.from
//     const dateTo = date.to

//     execute({
//       id: task.id,
//       title,
//       description,
//       dateFrom,
//       dateTo,
//       timeFrom,
//       timeTo,
//       userIds: formUserIds,
//     })
//   }

//   return (
//     <form action={onSubmit} className='space-y-4'>
//       <div className='flex flex-col space-y-2'>
//         <FormInput
//           id='title'
//           defaultValue={title}
//           label='Titel'
//           type='text'
//           errors={fieldErrors}
//         />
//         {/* <FormInput
//           id='description'
//           label='Beschreibung'
//           type='text'
//           errors={fieldErrors}
//         /> */}
//         <FormDatePicker
//           id='date'
//           label='Ausführungsdatum'
//           date={date}
//           setDate={setDate}
//           errors={fieldErrors}
//         />
//         {/* TODO: add custom time picker with a dropdown menu starting at 06:00 and ending at 20:00 */}
//         {timeFrom && timeTo && (
//           <div className='flex justify-between gap-3'>
//             <FormInput
//               id='timeFrom'
//               defaultValue={timeFrom}
//               label='Zeit von'
//               type='text'
//               errors={fieldErrors}
//             />
//             <FormInput
//               id='timeTo'
//               defaultValue={timeTo}
//               label='Zeit bis'
//               type='text'
//               errors={fieldErrors}
//             />
//           </div>
//         )}
//         <FormSelectMultiple
//           deleteButton
//           id='userId'
//           name='userId'
//           label='Mitarbeiter'
//           placeholder='Wähle einen Mitarbeiter aus'
//           options={_users}
//           values={userIds}
//           onValuesChange={setUserIds}
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

// export default TaskEditForm
