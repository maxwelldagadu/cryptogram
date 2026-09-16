import Navbar from "@/components/navbar"
import type { ReactNode } from "react"

export default function HomeLayout({children}: { children: ReactNode }){
  return (
    <div className="h-full w-full min-h-full  flex flex-col gap-10">
      <Navbar/>
      {children}
    </div>
  )
}