'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { groups } from '@/_dev/mockdata/constants'
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

const CreateEmployee = z.object({
  firstName: z.string({ required_error: 'Der Vorname ist erforderlich' }),
  lastName: z.string({ required_error: 'Der Nachname ist erforderlich' }),
  // role: z.object({
  //   value: z.string({
  //     required_error: 'Bitte waehele eine Rolle aus',
  //   }),
  // }),
  role: z.string({
    required_error: 'Bitte waehle eine Rolle aus',
  }),
  groups: z.array(
    z.object({
      value: z.string({
        required_error: 'Bitte waehle mindestens eine Gruppe aus',
      }),
    })
  ),
})

type EmployeeAdministrationFormValues = z.infer<typeof CreateEmployee>

const defaultValues: Partial<EmployeeAdministrationFormValues> = {
  groups: [{ value: '' }],
}

export function CreateEmployeeForm({
  onCancel,
  onCreate,
}: {
  onCancel?: () => void
  onCreate?: () => void
}) {
  const form = useForm<EmployeeAdministrationFormValues>({
    resolver: zodResolver(CreateEmployee),
    defaultValues,
    mode: 'onChange',
  })

  const {
    fields: groupsFields,
    append: appendGroup,
    remove: removeGroup,
  } = useFieldArray({
    control: form.control,
    name: 'groups',
  })

  function onSubmit(data: EmployeeAdministrationFormValues) {
    toast('Mitarbeiter erstellt', {
      description: 'Der Mitarbeiter wurde erfolgreich erstellt.',
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
          name='firstName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Vorname</FormLabel>
              <FormControl>
                <Input placeholder='Justin' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='lastName'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nachname</FormLabel>
              <FormControl>
                <Input placeholder='Hoffmann' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='role'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rolle</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder='Rolle auswaehlen' />
                    </SelectTrigger>
                  </FormControl>
                  {/* TODO: only show groups which are not on vacation and which are not sick. also, add tooltip for this so the user knows */}
                  <SelectContent>
                    <SelectItem key='1' value='user'>
                      user
                    </SelectItem>
                    <SelectItem key='1' value='admin'>
                      admin
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <ul>
            {groupsFields.map((field, index) => (
              <li key={field.id}>
                <FormField
                  control={form.control}
                  key={field.id}
                  name={`groups.${index}.value`}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className={cn(index !== 0 && 'sr-only')}>
                        Gruppen
                      </FormLabel>
                      <div className='flex gap-3'>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder='Gruppe auswaehlen' />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {groups.map((group) => (
                              <SelectItem key={group.id} value={group.name}>
                                {group.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {index !== 0 && (
                          <Button
                            type='button'
                            variant='outline'
                            onClick={() => removeGroup(index)}
                          >
                            Entfernen
                            <Cross2Icon className='ml-2 mt-0.5 h-4 w-4' />
                          </Button>
                        )}
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
            onClick={() => appendGroup({ value: '' })}
          >
            Gruppe hinzufügen
          </Button>
        </div>
        <div className='!mt-8 flex justify-end space-x-3'>
          <Button type='submit' onClick={onCreate}>
            Anlegen
          </Button>
        </div>
      </form>
    </Form>
  )
}
