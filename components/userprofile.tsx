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

export default function UserProfile() {

  // Router for navigation
  const router = useRouter();

  // Getting the currentUserSession setter form store
  const setCurrentUserSession = myStore(state => state.setCurrentUserSession);

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
              <AvatarImage className="object-cover" src="https://i.pravatar.cc/48?pl" alt="user-profile-image"/>
              <AvatarFallback className="text-muted-foreground text-base">MD</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-muted-foreground text-sm font-mono text-nowrap">
                Maxwell
              </DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuItem>
                <Button className="p-0 cursor-pointer bg-transparent text-muted-foreground text-sm font-mono hover:bg-transparent">
                  Update Photo
                </Button>
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
