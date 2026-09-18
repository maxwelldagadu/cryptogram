import {create} from 'zustand';

interface store {
  authError: string  | null,
  setAuthError: (errorData: string | null) => void
  currentUserSession: string | null,
  setCurrentUserSession: (sesssionID: string | null) => void,
}

export const myStore = create<store>((set) => ({
  authError: null,
  currentUserSession: null,
  setAuthError: (errorData: string | null) => set({authError: errorData}),
  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID}),
  }));

