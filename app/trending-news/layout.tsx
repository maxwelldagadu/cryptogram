import Link from "next/link";
import type { ReactNode } from "react";


export default function TrendingNewsLayout({children}: {children: ReactNode}){
  
  return(
     <div className="flex flex-col justify-center items-center h-full w-full gap-10">
      <Link href="/" className="btn self-start ml-4 mt-5">Go Back</Link>
      {children}
    </div>
  )

}