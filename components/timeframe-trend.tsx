import { ArrowUpRight } from 'lucide-react';
import { ArrowDownLeft } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';


export default function TimeframeTrend({timeframe,trend}: {timeframe:string,trend:number}) {
  const marketTrend = Number(trend).toFixed(2);
  const marketTrendValue = Number(marketTrend);
  return (
    <div className="h-full flex flex-col gap-2 md:gap-3 justify-stretch">
      <span className="text-[9px] md:text-[12px] font-medium text-primary-gray font-mono">{timeframe}</span>
      <div className="text-white text-[9px] font-medium md:text-base font-mono flex justify-between items-center w-full">
       {
        marketTrend != 'NaN' ?
        <>
          <span className="text-xs">
            {marketTrendValue < 0 ? `${marketTrend}%` : `+${marketTrend}%`}
          </span>
          <span>
            {marketTrendValue < 0 ?  <ArrowDownLeft size={20} className="text-bearish"/> : <ArrowUpRight size={20} className="text-bullish"/>}
          </span>
        </>
        :
        <Skeleton className="h-3  w-full"/>
       }
      </div>
    </div>
  )
}
