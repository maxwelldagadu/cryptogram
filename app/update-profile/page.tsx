'use client';

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useGetCurrentUser } from "@/custom-hooks/getCurrentUser";
import ProfileAvatar from '@/resources/avatar.jpg';
import { myStore } from "@/store/zodstore";
import { Button } from "@/components/ui/button";
import {UpdateUserProfileBlob} from "@/lib/profile-blob";
import { UpdateUserProfileImage} from "@/lib/update-profile";
import { useTransition } from "react";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";


export default function UpdateUserProfile(){

  const [isUpdating, setProfile] = useTransition();

  const router = useRouter();

  // Get's current user 
  const currentUser = useGetCurrentUser();
  const userImage = currentUser?.userImage;
  const userName = currentUser?.userName;

  // Access the blob image from the store
  const blob = myStore(state => state.blobImage);
  const profileImage = myStore(state => state.profileImage);
  const setAuthError = myStore(state => state.setAuthError);

  // Blb setter
  const setBlobImage = myStore(state => state.setBlobImage);

  // Upadting the profile image
  function UpdateUserProfile(){
    setProfile(async() => {
      if (!profileImage) {
        setAuthError("No image");
        return;
      }

      const formData = new FormData();
      formData.append("profileImage", profileImage);
      const result = await UpdateUserProfileImage(formData);

      if (!result.success) {
        setAuthError(result.error ?? "Profile update failed");
        return;
      }
      setBlobImage("");
      router.replace('/');
    })
  }

  return(
    <div className="cursor-pointer text-muted-foreground p-5 rounded-4xl flex flex-col gap-5
      text-sm font-mono max-w-100 max-h-100 mt-25 bg-primary-gray/20
      justify-center items-center"
      >
      <div className="relative size-50 rounded-full border-3 border-accent-yellow">
        <Image 
          fill
          src={blob ? blob : userImage ? userImage : ProfileAvatar}
          className="size-50 rounded-full object-cover"
          alt="update profile image"
        />
      </div>
      <span>{userName}</span>
      <p>Proceed to update your user profile photo</p>
      {
        blob ? 
        <Button onClick={UpdateUserProfile} className="btn text-center hover:cursor-pointer">
          { isUpdating  ? 
            <div className="flex gap-5 justify-center items-center">
              <Loader className="text-base animate-spin text-black"/>
              Updating Profile...
            </div> 
            : "Update Profile" 
          }
        </Button> 
        :
        <>
          <Label htmlFor="profile" className="btn text-center hover:cursor-pointer">
            Select Photo
          </Label>
          <Input 
            id="profile"
            type="file"
            hidden
            accept="image/*"
            onChange={UpdateUserProfileBlob}
          />
        </>
      }
    </div>
  )
}