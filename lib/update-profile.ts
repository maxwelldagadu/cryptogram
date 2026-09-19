'use client'

import React from "react";
import { authClient } from "./client";
import { myStore } from "@/store/zodstore";
import { supabase } from "@/supabase/supabase-client";

let tempBlobImage;

// Passing the image blob to the UI

export function UpdateUserProfileBlob(e: React.ChangeEvent<HTMLInputElement>){
  const file = e.target.files;

  if(!file) return;
  //  console.log(file)
  const tempBlobImage = URL.createObjectURL(file[0]);

  // Blob image setter
  myStore.getState().setBlobImage(tempBlobImage);

  // main profile image setter
  myStore.getState().setProfileImage(file[0]);
}


// Updating the user profile

export async function UpdateUserProfileImage(){
  const useremail = await authClient.getSession();

  // Uploading profile photo into avatar bucket
  await supabase.storage.from('avatar').upload(`${useremail.data?.user.email}/profile_photo`,profileImage);

  // Update the user profile image
  const {data} = await supabase.storage.from('avatar').download(`${useremail.data?.user.email}/profile_photo`);

  await authClient.updateUser
}