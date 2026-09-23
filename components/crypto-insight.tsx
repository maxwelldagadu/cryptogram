'use client';

import TimeframeTrend from "./timeframe-trend";
import Trending from "./trending";
import { Separator } from "./ui/separator";
import btc from '@/resources/logos/bitcoin.svg'
import TrendVisual from '@/resources/svgs/bitcoin.svg';
import { useEffect } from "react";
import {getTrendingData} from '@/lib/getTrendingData';




export default function CryptoInsight() {
  
  // Getting the trending coin data
  useEffect(() => {
  
    async function trendingData(){
      const [bitcoin] = await Promise.all([getTrendingData('btcusdt')]);
    }

    trendingData();
  },[]);


  return (
    <div className="md:p-4 w-full flex flex-col justify-between items-start gap-10">
      <div className="w-full flex justify-between items-center gap-3 md:gap-20 p-2">
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="text-nowrap text-[7px] md:text-[10px] font-medium text-primary-gray font-mono">TOTAL MARKET CAP</span>
          <span className="text-base font-medium text-primary-gray font-mono">
            <span className="text-white md:text-3xl lg:text-4xl text-semibold">$85,000</span>
            .00
          </span>
        </div>
        <div className="flex gap-2 h-full  justify-between items-start w-1.5/3">
          <TimeframeTrend timeframe="Today" trend="+11"/>
          <Separator orientation="vertical" className="h-10 md:h-12"/>
          <TimeframeTrend timeframe="7 Days" trend="-0.8"/>
          <Separator orientation="vertical" className="h-10 md:h-12"/>
          <TimeframeTrend timeframe="30 Days" trend="+2.3"/>
        </div>
      </div>
    
      <div className="w-full p-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-5">
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
      </div>
    </div>
  )
}
