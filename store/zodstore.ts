import {create} from 'zustand';

interface store {
  error: string,
  setError: (errorData: string) => void
}

export const myStore = create<store>((set) => ({
  error: '',
  setError: (errorData: string) => set({error: errorData})
  }));