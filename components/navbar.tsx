'use client';

import Image from "next/image";
import Link from "next/link";
import SearchInputField from "./searchInputfield";
import AuthToggle from "./authtoggle";
import UserProfile from "./userprofile";
import { CheckUserLoggedIn } from "@/server-actions/current-user";
import { myStore } from "@/store/zodstore";
import { useEffect } from "react";

export default function Navbar(){
 
  // Getting the currentUserSession and the setter from store
  const setCurrentUserSession = myStore(state => state.setCurrentUserSession);
  const currentUserSession = myStore(state => state.currentUserSession);

  useEffect(() => {
    async function getUser() {
      const sessionData = await CheckUserLoggedIn();
      setCurrentUserSession(sessionData?.session.id ?? null);
    }

    getUser();

  },[currentUserSession]);

 
  return(
    <div className="relative w-full flex justify-between items-center gap-5">
      <div className="w-100 lg:w-200 flex justify-start items-center">
        <Link href="/" className="flex justify-start items-center">
          <Image 
          src="/icon.png" 
          alt="crytogram logo" 
          width={90} height={90} 
          className="size-10 sm:size-13 md:size-12 lg:size-14 xl:size-15"/>
          <h1 className="text-base font-mono md:text-xl lg:text-2xl text-accent-yellow">CryptoGram</h1>
        </Link>
      </div>
      
      <SearchInputField className={"hidden sm:flex"}/>
  
      {currentUserSession ? <UserProfile/> : <AuthToggle/>}
    </div>
  )
}