import Link from "next/link";
import { ReactNode } from "react";



export default function UpdateProfileLayout({children}: {children: ReactNode}){
  
  return(
     <div className="flex justify-center items-center relative h-full">
      <Link href="/" className="btn absolute top-2 left-2 z-12">Go Back</Link>
      {children}
    </div>
  )

}