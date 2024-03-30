'use client'

import * as z from 'zod'
import { useEffect, useState, useTransition } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { RegisterSchema } from '@/schemas'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { AuthCardWrapper } from '../card/auth-card-wrapper'
import { FormError } from './ui/form-error'
import { FormSuccess } from './ui/form-success'
import {
  formatFirstName,
  formatLastName,
  generateEmail,
  generateUsername,
} from '@/lib/helper/format'

export const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('')
  const [success, setSuccess] = useState<string | undefined>('')
  const [isPending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
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

  // const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
  //   setError("");
  //   setSuccess("");

  //   startTransition(() => {
  //     register(values)
  //       .then((data) => {
  //         setError(data.error);
  //         setSuccess(data.success);
  //       });
  //   });
  // };

  // Version 2
  return (
    <AuthCardWrapper
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
              <FormField
                control={form.control}
                name='firstName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Vorname</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Justin'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='lastName'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Nachname</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        disabled={isPending}
                        placeholder='Hoffmann'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-2'>
              <FormField
                control={form.control}
                name='username'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Benutzername</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='disabled:opacity-100'
                        disabled
                        placeholder='justin.hoffmann'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='w-full'>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        className='disabled:opacity-100'
                        disabled
                        placeholder='justin.hoffmann@uhlhorn.de'
                        type='email'
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Passwort</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder='********'
                      type='password'
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button disabled={isPending} type='submit' className='w-full'>
            Account erstellen
          </Button>
        </form>
      </Form>
    </AuthCardWrapper>
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
