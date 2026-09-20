import z from 'zod';

export const SignInSchema = z.object({
  email: z.email({message: 'Enter a valid email'}).min(8,{message: 'Check that email is correct'}),
  password: z.string().min(7,{message: 'Must be more than 7 characters'}),
})


export const SignUpSchema = z.object({
  email: z.email({message: 'Enter a valid email'}),
  password: z.string().min(7,{message: 'Must be more than 7 characters'}),
  confirmPassword: z.string().min(7,{message: 'Must be more than 7 characters'}),
  name: z.string().min(3,{message: 'Name must be greater than 2 characters'}),
}).refine((data) => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
})