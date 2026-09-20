'use server';

import { NextRequest, NextResponse } from "next/server";
import { auth } from "./lib/auth";
import { headers } from "next/headers";


export async function proxy(request: NextRequest) {

  const authUser = await auth.api.getSession({headers: await headers()});

  if(!authUser){
    NextResponse.redirect(new URL('/signup',request.url));
  }

  NextResponse.next();
}

export const config = {
  matcher: '/update-profile'
}