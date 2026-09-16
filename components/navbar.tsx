import Image from "next/image";
import Link from "next/link";
import SearchInputField from "./searchInputfield";

export default function Navbar(){
  return(
    <div className="relative w-full flex justify-between items-center gap-5">
      <div className="w-100 lg:w-200 flex justify-start items-center">
        <Image 
          src="/icon.png" 
          alt="crytogram logo" 
          width={90} height={90} 
          className="size-10 sm:size-13 md:size-12 lg:size-14 xl:size-15"/>
        <h1 className="text-l font-mono md:text-xl lg:text-2xl text-accent-yellow">CRYPTOGRAM</h1>
      </div>
      
      <SearchInputField className={"hidden sm:flex"}/>
      
      <div  className="w-100 lg:w-200 flex justify-end items-center rounded-4xl">
        <div className="flex justify-end items-center gap-4 w-full font-mono font-medium">
          <Link href="/signin" className="btn">
            Sign In
          </Link>
          <Link href="/signup" className="btn">
            Sign Up
          </Link>
        </div>
      </div>
      

    </div>
  )
}