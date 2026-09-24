import Image from "next/image";
import { MoveUpRight } from 'lucide-react';
import { MoveDownLeft } from 'lucide-react';
import { StaticImport } from "next/dist/shared/lib/get-img-props";


interface TrendData{
  logo: StaticImport;
  coin: string,
  shortname: string,
  trend: number,
  price: number,
  trendVisual: StaticImport
}

export default function Trending({logo,coin,shortname,trend,price,trendVisual}: TrendData) {
  // Converts the trend nto a number
  const marketTrend = Number(trend);

  return (
    <div className="trending">
      <div className="flex justify-between items-center gap-5 w-full">
        <div className="relative bg-primary-gray/40 rounded-full size-8 md:size-10 flex items-center justify-center shrink-0">
          <Image src={logo} alt="crypto logo" width={15} height={15}/>
        </div>
        <div className="flex flex-col justify-center items-start gap-2">
          <span className="font-mono text-[10px] md:text-xs text-white font-semibold capitalize">{coin}</span>
          <span className="text-[8px] md:text-[10px] uppercase text-primary-gray font-mono">{shortname}</span>
        </div>
        <div className={`${marketTrend < 0 ? 'bg-bearish' : 'bg-bullish'} size-7 md:size-10 shrink-0 rounded-full flex justify-center items-center`}>
          {marketTrend < 0 ? <MoveDownLeft className="text-black"/> : <MoveUpRight className="text-black"/>}
        </div>
      </div>

      <div className="w-full flex justify-between items-center">
        <div className="h-full w-full flex flex-col justify-between items-start font-mono gap-2">
          <span className="text-[11px] md:text-sm">{`$${price.toLocaleString('en-US')}`}</span>
          <span className={`text-[11px] md:text-xs ${trend < 0 ? 'text-bearish' : 'text-bullish'}`}>
            {trend < 0 ? `${trend}%` : `+${trend}%`}
          </span>
        </div>
        <div className="relative h-12 w-full">
          <Image fill src={trendVisual} alt="trend visual"/>
        </div>
      </div>
    </div>
  )
}
