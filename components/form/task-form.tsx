'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { employees } from '@/_dev/mockdata/constants'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useFieldArray, useForm } from 'react-hook-form'
import { toast } from 'sonner'
import { z } from 'zod'
import { timeHHmmRegex } from '@/lib/regex'

// TODO: adjust min, max
const taskFormSchema = z.object({
  // TODO: maybe change this, so no title is required if a ticket is provided -> then the title is just e.g. "Ticket Nr. 1337"
  title: z
    .string({ required_error: 'Der Titel ist erforderlich' })
    .min(2, { message: 'Der Titel muss mindestens 2 Zeichen lang sein' })
    .max(100, { message: 'Der Titel darf maximal 100 Zeichen lang sein' }),
  // the required_error doesnt seem to work since this is a select? TODO: change this
  employees: z
    .array(
      z.object({
        value: z.string({
          required_error: 'Es ist mindestens ein Mitarbeiter erforderlich',
        }),
      })
    )
    .optional(),
  // idk yet if I just want have one date or a date range
  dateFrom: z.date({ required_error: 'Das Startdatum ist erforderlich' }),
  dateTo: z.date({ required_error: 'Das Enddatum ist erforderlich' }),
  timeFrom: z
    .string()
    .regex(timeHHmmRegex, {
      message: 'Bitte gib eine valide Uhrzeit ein.',
    })
    .optional(),
  timeTo: z
    .string()
    .regex(timeHHmmRegex, {
      message: 'Bitte gib eine valide Uhrzeit ein.',
    })
    .optional(),
  // TODO: need to implement a custom validation for this which checks if it is either a valid URL OR a valid number -> then converts to a URL
  urls: z
    .array(
      z.object({
        value: z.string().optional(),
        // value: z.string().url({ message: 'Bitte gib eine valide URL ein.' }),
      })
    )
    .optional(),
})

type TaskFormValues = z.infer<typeof taskFormSchema>

const defaultValues: Partial<TaskFormValues> = {
  dateFrom: new Date(),
  dateTo: new Date(),
  employees: [{ value: '' }],
  urls: [{ value: '' }],
}

export function TaskForm({
  onCancel,
  onCreate,
}: {
  onCancel?: () => void
  onCreate?: () => void
}) {
  const form = useForm<TaskFormValues>({
    resolver: zodResolver(taskFormSchema),
    defaultValues,
    mode: 'onChange',
  })

  const {
    fields: urlFields,
    append: appendUrl,
    remove: removeUrl,
  } = useFieldArray({
    control: form.control,
    name: 'urls',
  })

  const {
    fields: employeeFields,
    append: appendEmployee,
    remove: removeEmployee,
  } = useFieldArray({
    control: form.control,
    name: 'employees',
  })

  function onSubmit(data: TaskFormValues) {
    toast('Aufgabe erstellt', {
      description: 'Die Aufgabe wurde erfolgreich erstellt.',
      duration: 5000,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-4 p-4 md:p-0'
      >
        <FormField
          control={form.control}
          name='title'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Titel</FormLabel>
              <FormControl>
                <Input placeholder='Projektarbeit' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <ul>
            {employeeFields.map((field, index) => (
              <li key={field.id}>
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`employees.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Mitarbeiter
                      </FormLabel>
                      <div className='flex gap-3'>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Mitarbeiter auswaehlen' />
                            </SelectTrigger>
                          </FormControl>
                          {/* TODO: only show employees which are not on vacation and which are not sick. also, add tooltip for this so the user knows */}
                          <SelectContent>
                            {employees.map((employee) => (
                              <SelectItem
                                key={employee.id}
                                value={employee.name}
                              >
                                {employee.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {/* TODO: dont know about this yet (if it looks good or not) */}
                        {index !== 0 && (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => removeEmployee(index)}
                          >
                            Entfernen
                            <Cross2Icon className='ml-2 mt-0.5 h-4 w-4' />
                          </Button>
                        )}
                        {/* {index === 0 ? (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() =>
                              field.onChange('Mitarbeiter auswaehlen')
                            }
                          >
                            Zurücksetzen
                          </Button>
                        ) : (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => removeEmployee(index)}
                          >
                            Entfernen
                            <Cross2Icon className='ml-2 mt-0.5 h-4 w-4' />
                          </Button>
                        )} */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
            ))}
          </ul>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => appendEmployee({ value: '' })}
          >
            Mitarbeiter hinzufügen
          </Button>
        </div>
        <div>
          <ul>
            {urlFields.map((field, index) => (
              <li key={field.id}>
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`urls.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Ticket
                      </FormLabel>
                      <div className='flex gap-3'>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder='1337 | redmine.uhlhorn.lan/1337'
                          />
                        </FormControl>
                        {index !== 0 && (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => removeUrl(index)}
                          >
                            Entfernen
                            <Cross2Icon className='ml-2 mt-0.5 h-4 w-4' />
                          </Button>
                        )}
                        {/* {index === 0 ? (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => field.onChange('')}
                          >
                            Zurücksetzen
                          </Button>
                        ) : (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => removeUrl(index)}
                          >
                            Entfernen
                            <Cross2Icon className='ml-2 mt-0.5 h-4 w-4' />
                          </Button>
                        )} */}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </li>
            ))}
          </ul>
          <Button
            type='button'
            variant='outline'
            size='sm'
            className='mt-2'
            onClick={() => appendUrl({ value: '' })}
          >
            Ticket hinzufügen
          </Button>
        </div>
        <div className='!mt-8 flex justify-end space-x-3'>
          <Button type='button' variant='outline' onClick={onCancel}>
            Abbrechen
          </Button>
          {/* close on Click? */}
          <Button type='submit' onClick={onCreate}>
            Erstellen
          </Button>
        </div>
      </form>
    </Form>
  )
}
