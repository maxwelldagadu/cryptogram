import {create} from 'zustand';

interface store {
  error: string  | null,
  setError: (errorData: string) => void
  currentUserSession: string | null,
  setCurrentUserSession: (sesssionID: string | null) => void
}

export const myStore = create<store>((set) => ({
  error: null,
  currentUserSession: null,
  setError: (errorData: string) => set({error: errorData}),
  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID})
  }));