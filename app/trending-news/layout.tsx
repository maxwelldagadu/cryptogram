'use client';

import Link from "next/link";
import { ReactNode } from "react";
import MostPopular from "@/components/trending-news";


export default function UpdateProfileLayout({children}: {children: ReactNode}){
  
  return(
     <div className="flex justify-center items-center relative h-full w-full">
      <Link href="/" className="btn absolute top-2 left-2 z-12">Go Back</Link>
      <MostPopular/>
    </div>
  )

}