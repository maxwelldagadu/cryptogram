import CryptoInsight from "@/components/crypto-insight";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'CryptoGram',
  description: 'daily crypto insight to stay ahead of the market',
}


export default function Home(){
  return (
    <div className="flex justify-between items-center gap-10 md:20">
      <p className="w-100">Home hfhhhhh</p>
      <div className="bg-background-gray flex-1">
        <CryptoInsight/>
      </div>
    </div>
  )
}