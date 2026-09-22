import TimeframeTrend from "./timeframe-trend";
import Trending from "./trending";
import { Separator } from "./ui/separator";
import btc from '@/resources/logos/bitcoin.svg'
import TrendVisual from '@/resources/svgs/bitcoin.svg';


export default function CryptoInsight() {
  return (
    <div className="p-4 w-full flex flex-col justify-between items-start gap-10">
      <div className="w-full flex justify-between items-center gap-10 md:gap-20 p-2">
        <div className="flex flex-col gap-3">
          <span className="text-xs font-medium text-primary-gray font-mono">TOTAL BALANCE</span>
          <span className="text-base font-medium text-primary-gray font-mono">
            <span className="text-white md:text-3xl lg:text-4xl text-semibold">$85,000</span>
            .00
          </span>
        </div>
        <div className="flex gap-3 h-full  justify-between items-start w-1/3">
          <TimeframeTrend timeframe="Today" trend="+11"/>
          <Separator orientation="vertical" className="h-12"/>
          <TimeframeTrend timeframe="7 Days" trend="-0.8"/>
          <Separator orientation="vertical" className="h-12"/>
          <TimeframeTrend timeframe="30 Days" trend="+2.3"/>
        </div>
      </div>
    
      <div className="w-full p-2 flex justify-between items-center gap-5">
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
        <Trending coin="Bitcoin" shortname="BTC" trend={2.3} logo={btc} trendVisual={TrendVisual} price={456555}/>
      </div>
    </div>
  )
}
