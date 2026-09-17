import z from 'zod';

export const SignInSchema = z.object({
  email: z.email({message: 'Enter a valid email'}).min(8,{message: 'Check that email is correct'}),
  password: z.string().min(7,{message: 'Must be more than 7 characters'}),
})