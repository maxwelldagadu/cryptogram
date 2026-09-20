'use client';

import { cn } from 'cn';
import { Search } from 'lucide-react';
import { Input } from "@/components/ui/input";


export default function SearchInputField({className}: {className:string}) {
  return (
    <div className={cn("flex justify-center gap-1 items-center w-full border-2 rounded-3xl bg-light-dark/5",className)}>
      <button className="hover:cursor-pointer">
        <Search  className="text-custom-gray ml-1 size-4 sm:size-5"/>
      </button>
      <Input className="appInput" placeholder="BTCUSDT,ETHUSDT"/>
    </div>
  )
}
