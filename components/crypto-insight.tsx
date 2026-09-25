'use client';

import TimeframeTrend from "./timeframe-trend";
import Trending from "./trending";
import { Separator } from "./ui/separator";
import Btc from '@/resources/logos/bitcoin.svg';
import Lite from '@/resources/logos/litecoin.svg';
import Ether from '@/resources/logos/etherum.svg';
import Sol from '@/resources/logos/solana.svg';
import { getTrendingData } from '@/lib/getTrendingData';
import BtcVisual from '@/resources/svgs/bitcoin.svg';
import ItcVisual from '@/resources/svgs/litecoin.png';
import EthVisual from '@/resources/svgs/etherum.png';
import SolVisual from '@/resources/svgs/solana.svg';
import { useEffect,useState } from "react";
import { ws } from '@/lib/getTrendingData';
import TrendSuspense from '@/suspense/trendSuspense';
import type { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Chart from '@/components/chart';
import { myStore } from "@/store/zodstore";
import { formatNumber } from "@/lib/number-formatter";
import { Skeleton } from "./ui/skeleton";



export default function CryptoInsight() {
  
  const [data,setData] = useState<Record<string, unknown>[]>([]);
  const [showTrending,setTrending] =  useState<boolean>(false);

  // Get the current crypto
  const cryptoCoin = myStore(state => state.marketData)['BTCUSDT'];
  const getVolume = Math.floor(cryptoCoin?.volume);
  const volume = formatNumber(getVolume);
  
  // Percentage timrframe change
  const trend = cryptoCoin?.percentageTrend;
  

  // Load the four market cards once, then close their shared websocket on unmount.
  useEffect(() => {
  
    async function trendingData(){
      // Fetch the coin requests in parallel so the cards appear as one coordinated update.
      const [bitcoin,litecoin,etherum,solana] = await Promise.all(
        [
          getTrendingData('btcusdt'),
          getTrendingData('ltcusdt'),
          getTrendingData('ethusdt'),
          getTrendingData('solusdt'),
        ]
      );
      // Add presentation metadata to the API results before rendering the cards.
      setData(
        [
          { ...(bitcoin as Record<string, unknown>),logo:Btc,coin:'Bitcoin',shortName:'BTC',trendVisual:BtcVisual },
          { ...(litecoin as Record<string, unknown>),logo:Lite,coin:'Litecoin',shortName:'ITC',trendVisual:ItcVisual },
          { ...(etherum as Record<string, unknown>),logo:Ether,coin:'Etherum',shortName:'ETH',trendVisual:EthVisual },
          { ...(solana as Record<string, unknown>),logo:Sol,coin:'Solana', shortName:'SOL',trendVisual:SolVisual }
        ]
      );

      setTrending(true);
    }

    trendingData();

    return () => ws.close();
  },[]);


  return (
    <div className="md:p-4 w-full min-w-0 flex flex-col justify-between items-start gap-10">
      <div className="w-full flex justify-between items-center gap-3 md:gap-10 p-2">
        <div className="flex flex-col gap-2 md:gap-3">
          <span className="text-nowrap text-[7px] md:text-[12px] font-medium text-primary-gray font-mono">24HR VOLUME</span>
          <span className="text-base font-medium text-primary-gray font-mono">
           {volume != 'NaN' ?  
              <span className="text-white md:text-2xl lg:text-4xl text-semibold">
                {`$${volume}`}
              </span>
              :
              <Skeleton className="h-3 md:h5 w-full"/>
            }
          </span>
        </div>
        <div className="flex gap-2 h-full  justify-between items-start w-1.5/3">
          <TimeframeTrend timeframe="Today" trend={trend?.today.percentage}/>
          <Separator orientation="vertical" className="h-10 md:h-12"/>
          <TimeframeTrend timeframe="7 Days" trend={trend?.sevenDays.percentage}/>
          <Separator orientation="vertical" className="h-10 md:h-12"/>
          <TimeframeTrend timeframe="30 Days" trend={trend?.thirtyDays.percentage}/>
        </div>
      </div>

      
      {showTrending ? (
        <div className="w-full p-2 grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 items-center gap-5">
          {data?.map(data => (
            <Trending 
              key={String(data?.coin)} 
              coin={String(data?.coin ?? '')}
              shortname={String(data?.shortName ?? '')} 
              trend={Number(data?.trend)}
              logo={data?.logo as StaticImport} 
              trendVisual={data?.trendVisual as StaticImport} 
              price={Number(data?.price)}
            />
          ))}
        </div>
        ) : 
        <TrendSuspense/>
      }
        {/* Keep the live BTC chart after the overview and trending sections. */}
        <Chart />
    </div>
  )
}
