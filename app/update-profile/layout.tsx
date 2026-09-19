'use client';

import Link from "next/link";
import { ReactNode } from "react";
import UserAuthError from "@/components/authError";
import { myStore } from "@/store/zodstore";

export default function UpdateProfileLayout({children}: {children: ReactNode}){
  const error = myStore(state => state.authError);
  return(
     <div className="flex justify-center items-center relative h-full">
      <Link href="/" className="btn absolute top-2 left-2 z-12">Go Back</Link>
      {error && <UserAuthError error={error}/>}
      {children}
    </div>
  )

}