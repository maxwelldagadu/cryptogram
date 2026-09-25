'use client';

import { cn } from 'cn';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { useState } from 'react';
import { myStore } from '@/store/zodstore';
import React from 'react';


export default function SearchInputField({className}: {className:string}) {
  const [symbol, setSymbol] = useState('');
  const setActiveSymbol = myStore((state) => state.setActiveSymbol);

  // Sets the crypto token we wnat to search into the store
  function submitSearch(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();
    const normalizedSymbol = symbol.trim().replace('/', '').toUpperCase();

    if (normalizedSymbol) {
      setActiveSymbol(normalizedSymbol);
    }
  }

  return (
    <form onSubmit={submitSearch} className={cn("flex justify-center gap-1 items-center w-full border-2 rounded-3xl bg-light-dark/5",className)}>
      <button type="submit" className="hover:cursor-pointer" aria-label="Search market data">
        <Search  className="text-custom-gray ml-1 size-4 sm:size-5"/>
      </button>
      <Input
        className="appInput"
        placeholder="BTCUSDT,ETHUSDT"
        value={symbol}
        onChange={(event) => setSymbol(event.target.value)}
        aria-label="Search market symbol"
      />
    </form>
  )
}
