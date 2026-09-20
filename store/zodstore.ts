import { unknown } from 'better-auth';
import {create} from 'zustand';

interface store {
  authError: string  | null,
  blobImage: string,
  profileImage: File | null,
  currentUserSession: string | null,
  setAuthError: (errorData: string | null) => void,
  setCurrentUserSession: (sesssionID: string | null) => void,
  setBlobImage: (blob: string) => void,
  setProfileImage: (profileImage: File | null) => void
}

export const myStore = create<store>((set) => ({
  authError: null,
  currentUserSession: null,
  blobImage: '',
  profileImage: null,
  setAuthError: (errorData: string | null) => set({authError: errorData}),
  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID}),
  setBlobImage: (blob: string) => set({blobImage: blob}),
  setProfileImage: (profileImage: File | null) => set({profileImage})
  }));

