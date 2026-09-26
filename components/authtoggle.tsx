import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { SquareMenu } from 'lucide-react';

export default function AuthToggle() {
  return (
    <div  className="w-100 lg:w-200 flex justify-end items-center gap-5 ">
      <Link href="/trending-news" className="sm:hidden text-nowrap btn">
        News
      </Link>

      <div className="sm:hidden">
        <DropdownMenu>
          <DropdownMenuTrigger 
            render={
            <Button className="rounded-3xl cursor-pointer h-full bg-transparent hover:bg-transparent"/>}
            className='flex justify-center items-center'
          >
            <SquareMenu className="hover:text-accent-yellow size-6 font-extrabold text-white"/>
          </DropdownMenuTrigger>

          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <Link href="/signin" className="font-mono text-[12px] w-full text-center">
                  SignIn
                </Link>
              </DropdownMenuItem>
                <DropdownMenuItem>
                <Link href="/signup" className=" font-mono text-[12px] w-full text-center">
                  SignUp
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/*This signin/singup buttons only shows on bigger screens*/ }
      <div className="hidden sm:flex justify-end items-center gap-10 w-full">
        <Link href="/signin" className="btn">
          SignIn
        </Link>
        <Link href="/signin" className="btn">
          SignUp
        </Link>
      </div>
    </div>
  )
}
