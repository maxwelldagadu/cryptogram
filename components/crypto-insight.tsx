import TimeframeTrend from "./timeframe-trend";



export default function CryptoInsight() {
  return (
    <div className="w-full flex flex-col justify-between items-start">
      <div className="w-full flex justify-between items-center gap-10 md:gap-20">
        <div className="flex flex-col gap-3">
          <span className="text-sm font-medium text-primary-gray font-mono">TOTAL BALANCE</span>
          <span className="text-base font-medium text-primary-gray font-mono">
            <span className="text-white md:text-3xl lg:text-4xl">$85,000</span>
            .00
          </span>
        </div>
        <div className="flex gap-3  justify-between items-start w-1/3">
          <TimeframeTrend timeframe="Today" trend="+11"/>
          <TimeframeTrend timeframe="7 Days" trend="-0.8"/>
          <TimeframeTrend timeframe="30 Days" trend="+2.3"/>
        </div>
      </div>

      <div>
        
      </div>
    </div>
  )
}
