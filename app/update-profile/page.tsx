'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { UpdateUserProfileImage } from "@/lib/update-profile";
import Image from "next/image";
import { useGetCurrentUser } from "@/custom-hooks/getCurrentUser";
import ProfileAvatar from '@/resources/avatar.jpg';
import { myStore } from "@/store/zodstore";


export default function UpdateUserProfile(){
  // Get's current user 
  const {username} = useGetCurrentUser();

  // Access the blob image form the stor
  const blob = myStore(state => state.blobImage);

  return(
    <div className="cursor-pointer text-muted-foreground p-5 rounded-4xl flex flex-col gap-5
      text-sm font-mono max-w-100 max-h-100 mt-25 bg-primary-gray/20
      justify-center items-center"
      >
      <div className="relative size-50 rounded-full border-3 border-accent-yellow">
        <Image 
          fill
          src={blob || ProfileAvatar}
          className="size-50 rounded-full object-cover"
          alt="update profile image"
        />
      </div>
      <span>{username}</span>
      <p>Proceed to update your user profile photo</p>
      <Label htmlFor="profile" className="btn text-center hover:cursor-pointer">
        Update Photo
      </Label>
      <Input 
        id="profile"
        type="file"
        hidden
        accept="image/*"
        onChange={UpdateUserProfileImage}
      />
    </div>
  )
}