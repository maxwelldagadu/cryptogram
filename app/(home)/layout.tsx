import Navbar from "@/components/navbar"
import SearchInputField from "@/components/searchInputfield"
import type { ReactNode } from "react"

export default function HomeLayout({children}: { children: ReactNode }){
  return (
    <div className="h-full w-full min-h-full flex flex-col gap-5">
      <Navbar/>
      <SearchInputField className={"sm:hidden w-2/3 self-center"}/>
      {children}
    </div>
  )
}