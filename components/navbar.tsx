import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@base-ui/react";
import { Search } from 'lucide-react';
import { Separator } from "@/components/ui/separator"
import Link from "next/link";


export default function Navbar(){
  return(
    <div className="w-full flex justify-between items-center gap-5 p-3">
      <div className="w-200 flex justify-start items-center">
        <Image src="/icon.png" alt="crytogram logo" width={90} height={90}/>
        <h1 className="text-l font-mono md:text-xl lg:text-2xl text-accent-yellow">CRYTOGRAM</h1>
      </div>
      
      <div className="flex justify-center gap-1 items-center w-full border-2 rounded-4xl bg-light-dark/5">
        <button className="hover:cursor-pointer">
          <Search  className="text-custom-gray ml-1 "/>
        </button>
        <Input className="w-full border-0 rounded-none outline-0 h-10 text-muted-foreground font-mono placeholder:font-mono" placeholder="Search"/>
      </div>
     
      <div  className="w-200 flex justify-end items-center rounded-4xl">
        <div className="flex justify-end items-center gap-4 w-full font-mono font-medium">
          <Link href="/signin" className="border py-2 px-3.5 rounded-4xl cursor-pointer text-accent-yellow bg-light-dark/20 hover:text-black hover:bg-accent-yellow">
            Sign In
          </Link>
          <Link href="/signup" className="border py-2 px-3.5 rounded-4xl cursor-pointer text-accent-yellow bg-light-dark/20 hover:text-black hover:bg-accent-yellow">
            Sign Up
          </Link>
        </div>
      </div>
      

    </div>
  )
}