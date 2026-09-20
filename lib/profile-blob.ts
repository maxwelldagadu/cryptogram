'use client';

import { myStore } from "@/store/zodstore";


export let tempBlobImage = '';

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

