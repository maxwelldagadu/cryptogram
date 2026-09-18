'use client';

import {Card,CardContent,CardDescription,CardHeader,} from "@/components/ui/card";
import {Field,FieldError,FieldGroup,FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useForm,Controller} from 'react-hook-form';
import z from 'zod';
import { SignInSchema } from "@/schemas/zodschemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader } from 'lucide-react';
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { myStore } from "@/store/zodstore";


export default function Login() {

  // Router for navigation
  const router = useRouter();

  // Initializing react hook form
  const {control,handleSubmit,formState:{isSubmitting},reset} = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      email: '',
      password: ''
    },
    mode: 'onChange'
  })

  // Zod store
  const setAuthError = myStore((state) => state.setAuthError);

  // User signin logic
  async function UserSignIn(data: z.infer<typeof SignInSchema>){
    await authClient.signIn.email({
        email: data.email,
        password: data.password,
      },
      {
        onSuccess: () => {
          reset();
          router.replace('/');
        },
        onError: (ctx) => {
          console.log(ctx)
          setAuthError(ctx.error.message)
        }
      }
    )
  }

  return (
    <div className="w-70 md:w-100 lg:w-120 font-mono text-white font-medium mt-30">
      <Card className="flex flex-col justify-center items-start p-4">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="text-nowrap p-0 text-accent-yellow">LogIn to your account</CardHeader>
          <Link href="/signup" className="underline underline-offset-3 text-accent-yellow">SignUp</Link>
        </div>
        <CardDescription>Enter your email below to login to your account</CardDescription>
          
        <CardContent className="w-full px-0">
          <form onSubmit={handleSubmit(UserSignIn)}>
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

              <Button type="submit" disabled={isSubmitting} className="btn h-7.5 md:h-8 lg:h-10">
                 {isSubmitting ? 
                  <div className="flex justify-center items-center gap-4">
                    <Loader className="text-base animate-spin text-white"/> 
                    <span className="text-accent-yellow"> Signing you in...</span>
                  </div> : 
                  "SignIn"}
              </Button>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
