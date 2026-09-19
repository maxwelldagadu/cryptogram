import {create} from 'zustand';

interface store {
  authError: string  | null,
  blobImage: string,
  currentUserSession: string | null,
  setAuthError: (errorData: string | null) => void,
  setCurrentUserSession: (sesssionID: string | null) => void,
  setBlobImage: (blob: string) => void
}

export const myStore = create<store>((set) => ({
  authError: null,
  currentUserSession: null,
  blobImage: '',
  setAuthError: (errorData: string | null) => set({authError: errorData}),
  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID}),
  setBlobImage: (blob: string) => set({blobImage: blob}),
  }));

