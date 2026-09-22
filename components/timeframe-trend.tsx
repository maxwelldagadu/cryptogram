import { ArrowUpRight } from 'lucide-react';
import { ArrowDownLeft } from 'lucide-react';


export default function TimeframeTrend({timeframe,trend}: {timeframe:string,trend:string}) {
  const marketTrend = Number(trend);
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-primary-gray font-mono">{timeframe}</span>
      <div className="text-white font-semibold text-base font-mono flex justify-between items-center w-full">
        <span className="text-xs">
          {marketTrend < 0 ? `${marketTrend}%` : `+${marketTrend}%`}
        </span>
        <span>
          {marketTrend < 0 ?  <ArrowDownLeft className="text-bearish"/> : <ArrowUpRight className="text-bullish"/>}
        </span>
      </div>
    </div>
  )
}
