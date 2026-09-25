import CryptoInsight from "@/components/crypto-insight";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'CryptoGram',
  description: 'daily crypto insight to stay ahead of the market',
}


export default function Home(){
  return (
    <div className="flex min-w-0 justify-center md:justify-between items-center gap-0 md:20">
      <p className="w-80 hidden md:block">Home hfhhhhh</p>
      <div className="min-w-0 flex-1 bg-background-gray">
        <CryptoInsight/>
      </div>
    </div>
  )
}