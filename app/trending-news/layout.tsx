import Link from "next/link";
import type { ReactNode } from "react";


export default function TrendingNewsLayout({children}: {children: ReactNode}){
  
  return(
     <div className="flex flex-col justify-center items-center h-full w-full">
      <Link href="/" className="btn absolute top-2 left-2 z-12">Go Back</Link>
      {children}
    </div>
  )

}