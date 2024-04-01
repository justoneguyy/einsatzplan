'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import * as z from 'zod'

import { Form } from '@/components/ui/form'
import {
  formatFirstName,
  formatLastName,
  generateEmail,
  generateUsername,
} from '@/lib/helper/format'
import { RegisterSchema } from '@/schemas'
import { EyeNoneIcon, EyeOpenIcon } from '@radix-ui/react-icons'
import { CardFormWrapper } from '../card/ui/card-form-wrapper'
import { FormError } from './ui/form-error'
import { FormInput } from './ui/form-input'
import { FormSubmit } from './ui/form-submit'
import { FormSuccess } from './ui/form-success'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    // seems to be required, otherwise the form will not show the correct errors
    defaultValues: {
      firstName: '',
      lastName: '',
      username: '',
      email: '',
      password: '',
    },
  })

  const firstName = useWatch({
    control: form.control,
    name: 'firstName',
    defaultValue: '',
  })

  const lastName = useWatch({
    control: form.control,
    name: 'lastName',
    defaultValue: '',
  })

  useEffect(() => {
    if (firstName) {
      form.setValue('firstName', formatFirstName(firstName))
    }
    if (lastName) {
      form.setValue('lastName', formatLastName(lastName))
    }
  }, [firstName, lastName, form])

  useEffect(() => {
    form.setValue('username', generateUsername(firstName, lastName))
    form.setValue('email', generateEmail(firstName, lastName))
  }, [firstName, lastName, form])

  // const onSubmit = (values: z.infer<typeof UserSchema>) => {
  //   setError('')
  //   setSuccess('')

  //   startTransition(() => {
  //     const initials = generateInitials(values.firstName, values.lastName)
  //     const valuesWithInitials = { ...values, initials }

  //     register(valuesWithInitials)
  //       .then((data) => {
  //         if (data?.error) {
  //           setError(data.error)
  //         }

  //         if (data?.success) {
  //           form.reset()
  //           setSuccess(data.success)
  //           dialogClose()
  //           toast.success(`${data.success}`)
  //         }
  //       })
  //       .catch(() => setError('Etwas ist schief gelaufen'))
  //   })
  // }

  // Version 2
  return (
    <CardFormWrapper
      className='w-[550px]'
      headerLabel='Registrierung'
      backButtonLabel='Du hast schon einen Account?'
      backButtonHref='/auth/login'
    >
      <Form {...form}>
        <form
          // onSubmit={form.handleSubmit(onSubmit)}
          onSubmit={form.handleSubmit(() => {})}
          className='space-y-6'
        >
          <div className='space-y-4'>
            <div className='flex gap-2'>
              <FormInput
                control={form.control}
                className='w-full'
                name='firstName'
                label='Vorname'
                placeholder='Justin'
                disabled={isPending}
              />
              <FormInput
                control={form.control}
                className='w-full'
                name='lastName'
                label='Nachname'
                placeholder='Hoffmann'
                disabled={isPending}
              />
            </div>
            <div className='flex gap-2'>
              <FormInput
                control={form.control}
                className='w-full disabled:opacity-100'
                name='username'
                label='Benutzername'
                placeholder='justin.hoffmann'
                disabled
              />
              <FormInput
                control={form.control}
                className='w-full disabled:opacity-100'
                name='email'
                label='Email'
                placeholder='justin.hoffmann@uhlhorn.de'
                type='email'
                disabled
              />
            </div>
            <FormInput
              control={form.control}
              name='password'
              label='Passwort'
              disabled={isPending}
              placeholder='********'
              type={showPassword ? 'text' : 'password'}
              icon={
                showPassword ? (
                  <EyeNoneIcon
                    className='h-4 w-4'
                    onClick={() => setShowPassword(false)}
                  />
                ) : (
                  <EyeOpenIcon
                    className='h-4 w-4'
                    onClick={() => setShowPassword(true)}
                  />
                )
              }
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <FormSubmit title='Anmelden' disabled={isPending} showIcon />
        </form>
      </Form>
    </CardFormWrapper>
  )

  // Version 2
  //
  // return (
  //   <AuthCardWrapper
  //     headerLabel='Registrierung'
  //     backButtonLabel='Du hast schon einen Account?'
  //     backButtonHref='/auth/login'
  //   >
  //     <Form {...form}>
  //       <form
  //         // onSubmit={form.handleSubmit(onSubmit)}
  //         onSubmit={form.handleSubmit(() => {})}
  //         className='space-y-6'
  //       >
  //         <div className='space-y-4'>
  //           <FormField
  //             control={form.control}
  //             name='firstName'
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Vorname</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     {...field}
  //                     disabled={isPending}
  //                     placeholder='Justin'
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //           <FormField
  //             control={form.control}
  //             name='lastName'
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Nachname</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     {...field}
  //                     disabled={isPending}
  //                     placeholder='Hoffmann'
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //           <FormField
  //             control={form.control}
  //             name='username'
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Benutzername</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     {...field}
  //                     className='disabled:opacity-100'
  //                     disabled
  //                     placeholder='justin.hoffmann'
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //           <FormField
  //             control={form.control}
  //             name='email'
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Email</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     {...field}
  //                     className='disabled:opacity-100'
  //                     disabled
  //                     placeholder='justin.hoffmann@uhlhorn.de'
  //                     type='email'
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //           <FormField
  //             control={form.control}
  //             name='password'
  //             render={({ field }) => (
  //               <FormItem>
  //                 <FormLabel>Passwort</FormLabel>
  //                 <FormControl>
  //                   <Input
  //                     {...field}
  //                     disabled={isPending}
  //                     placeholder='********'
  //                     type='password'
  //                   />
  //                 </FormControl>
  //                 <FormMessage />
  //               </FormItem>
  //             )}
  //           />
  //         </div>
  //         <FormError message={error} />
  //         <FormSuccess message={success} />
  //         <Button disabled={isPending} type='submit' className='w-full'>
  //           Account erstellen
  //         </Button>
  //       </form>
  //     </Form>
  //   </AuthCardWrapper>
  // )
}
