'use client';

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/client";
import { useRouter } from "next/navigation";
import { myStore } from "@/store/zodstore";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { useGetCurrentUser } from "@/custom-hooks/getCurrentUser";


export default function UserProfile() {

  // Get username and profile Image
  const currentUser = useGetCurrentUser();
  const userName = currentUser?.userName;
  const userImage = currentUser?.userImage;

  
  // Router for navigation
  const router = useRouter();

  // Getting the currentUserSession setter form store
  const setCurrentUserSession = myStore(state => state.setCurrentUserSession);

  const fallbackName = userName?.slice(0,2).toUpperCase();

   // Default placeholder image
  const placeholderImage = "https://drive.google.com/file/d/1gWR3-MeYeWJ5mmZpsAsL4kE6Pte4sVPC/view?usp=drive_link";

  // Logout functionality
  async function UserLogout(){
    await authClient.signOut({
      fetchOptions:{
        onSuccess: () => {
          setCurrentUserSession(null);
          router.replace('/');
        }
      }
    });
  }
  
  return (
    <div  className="w-100 lg:w-200 flex justify-end items-center rounded-4xl">
      <div className="flex justify-end items-center gap-2 w-full font-mono font-medium">
        <DropdownMenu>
          <DropdownMenuTrigger 
            render={
            <Button className="rounded-full cursor-pointer h-full bg-transparent hover:bg-transparent"/>}
          >
            <Avatar>
              <AvatarImage className="object-cover" src={userImage || placeholderImage} alt="user-profile-image"/>
              <AvatarFallback className="text-muted-foreground text-base">{fallbackName}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="line-clamp-1 text-muted-foreground text-sm font-mono text-nowrap">
                {userName?.split(' ').at(0)}
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <Link href="/update-profile" className="text-nowrap p-0 cursor-pointer bg-transparent text-muted-foreground text-sm font-mono hover:bg-transparent">
                  Update Profile
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={UserLogout} className="btn h-full">
          LogOut
        </Button>
      </div>
    </div>
  )
}
