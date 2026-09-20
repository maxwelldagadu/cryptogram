'use server';

import {auth} from '@/lib/auth';
import { headers } from 'next/headers';


// Checks if user if login. iF yes we return TRUE else False
export async function  CheckUserLoggedIn() {
  const userSession = await auth.api.getSession({headers: await headers()});
  return userSession;
}
