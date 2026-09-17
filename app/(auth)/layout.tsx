import Link from "next/link";
import { ReactNode } from "react";


export default function AuthLayout({children}: {children: ReactNode}) {
  return (
    <div className="flex justify-center items-center relative">
      <Link href="/" className="btn absolute top-2 left-2">Go Back</Link>

      {children}
    </div>
  )
}
