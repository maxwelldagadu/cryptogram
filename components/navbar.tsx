import Image from "next/image";
import SearchInputField from "./searchInputfield";
import AuthToggle from "./authtoggle";
import UserProfile from "./userprofile";

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

      {currentUser ? <UserProfile/> : <AuthToggle/>}
    </div>
  )
}