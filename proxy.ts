'use server';

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


export async function proxy(request: NextRequest) {
  // Checks if user if authenticated
  const userSession = await auth.api.getSession({headers: await headers()});

  if(!userSession){
    return NextResponse.redirect(new URL('/signin',request.url));
  }

  // Proceed the request if user is authenticated
  return NextResponse.next();
}

export const config = {
  matcher: '/update-profile'
}