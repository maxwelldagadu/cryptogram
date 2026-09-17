import {Card,CardContent,CardDescription,CardHeader,} from "@/components/ui/card";
import {Field,FieldError,FieldGroup,FieldLabel,} from "@/components/ui/field"
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {useForm,Controller} from 'react-hook-form';
import z from 'zod';


const hookForm = useForm<RegisterUser>({
  ressolver: ZodRessolver(RegisterUser)
})

export default function Login() {
  return (
    <div className="lg:w-100 font-mono text-white font-medium">
      <Card className="flex flex-col justify-center items-start">
        <div className="w-full flex justify-between items-center">
          <CardHeader className="text-nowrap">LogIn to your account</CardHeader>
          <Link href="/signup" className="underline underline-offset-3">SignUp</Link>
        </div>
        <CardDescription className="px-3">Enter your email below to login to your account</CardDescription>
          
        <CardContent>
          <form>
            <FieldGroup>
              <Controller
                name='email'
                control={hookForm.control}
                render={({field,fieldState}) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                    <Input 
                      placeholder="maxphilips@gmail.com"
                      id={field.name}
                      aria-invalid={fieldState.invalid}
                      {...field}
                    />
                    {fieldState.error && <FieldError errors={[fieldState.error]}/>}
                  </Field>
                )}
              />
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
