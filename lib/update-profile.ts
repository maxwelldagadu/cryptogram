'use client'

import React from "react";
import { authClient } from "./client";


export function UpdateUserProfileImage(e: React.ChangeEvent<HTMLInputElement>){
  const file = e.target.files;
  console.log('YOOOOOO');
}