'use client'

import React from "react";
import { authClient } from "./client";
import { myStore } from "@/store/zodstore";


export function UpdateUserProfileImage(e: React.ChangeEvent<HTMLInputElement>){
 
  const file = e.target.files;
  if(!file) return;
  //  console.log(file)
  const tempBlobImage = URL.createObjectURL(file[0]);

  // Blob image setter
  myStore.getState().setBlobImage(tempBlobImage);
}