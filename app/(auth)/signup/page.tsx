'use client';
import {Card,CardContent,CardDescription,CardHeader,} from "@/components/ui/card";
import {Field,FieldError,FieldGroup,FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useForm,Controller} from 'react-hook-form';
import z from 'zod';
import { SignUpSchema } from "@/schemas/zodschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";



export default function SignUp() {


  // Initializing react hook form
  const {control,handleSubmit} = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: ''
    },
    mode: 'onChange'
  })

  return (
    <div className="w-70 md:w-100 lg:w-120 font-mono text-white font-medium mt-30">
      <Card className="flex flex-col justify-center items-start p-4">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="text-nowrap p-0 text-accent-yellow">Create your account</CardHeader>
          <Link href="/signin" className="underline underline-offset-3 text-accent-yellow">SignIn</Link>
        </div>

        <CardDescription>Create a user account and explore Crypto insights</CardDescription>
          
        <CardContent className="w-full px-0">
          <form>
            <FieldGroup>
              <Controller
                name='email'
                control={control}
                render={({field,fieldState}) => (
                  <Field>
                    <FieldLabel htmlFor={field.name} className="text-accent-yellow">Email</FieldLabel>
                    <div className="rounded-3xl w-full">
                      <Input 
                        placeholder="maxphilips@gmail.com"
                        id={field.name}
                        aria-invalid={fieldState.invalid}
                        {...field}
                        className="appInput rounded-3xl"
                      />
                    </div>
                    {fieldState.error && <FieldError className="text-nowrap" errors={[fieldState.error]}/>}
                  </Field>
                )}
              />

              <Controller
                name='password'
                control={control}
                render={({field,fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-accent-yellow">Password</FieldLabel>
                    <Input 
                      placeholder="*********"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      className="appInput"
                    />
                    {fieldState.error && <FieldError className="text-nowrap" errors={[fieldState.error]}/>}
                  </Field>
                )}
              />

              <Controller
                name='confirmPassword'
                control={control}
                render={({field,fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name} className="text-accent-yellow">Confirm Password</FieldLabel>
                    <Input 
                      placeholder="*********"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                      className="appInput"
                    />
                    {fieldState.error && <FieldError className="text-nowrap" errors={[fieldState.error]}/>}
                  </Field>
                )}
              />
              <Button className="btn h-7.5 md:h-8 lg:h-10">
                SignUp
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
