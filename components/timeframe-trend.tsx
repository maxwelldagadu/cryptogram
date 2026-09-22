import { ArrowUpRight } from 'lucide-react';
import { ArrowDownLeft } from 'lucide-react';


export default function TimeframeTrend({timeframe,trend}: {timeframe:string,trend:string}) {
  const marketTrend = Number(trend);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-[9px] md:text-[12px] font-medium text-primary-gray font-mono">{timeframe}</span>
      <div className="text-white text-[9px] font-medium md:text-base font-mono flex justify-between items-center w-full">
        <span className="text-xs">
          {marketTrend < 0 ? `${marketTrend}%` : `+${marketTrend}%`}
        </span>
        <span  className="">
          {marketTrend < 0 ?  <ArrowDownLeft size={20} className="text-bearish"/> : <ArrowUpRight size={20} className="text-bullish"/>}
        </span>
      </div>
    </div>
  )
}
