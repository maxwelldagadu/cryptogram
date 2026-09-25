'use client';

import {
	CandlestickSeries,
	ColorType,
	createChart,
	type IChartApi,
	type ISeriesApi,
	type CandlestickData,
	type Time,
} from 'lightweight-charts';
import { useEffect, useRef, useState } from 'react';
import {
	fetchMarketData,
	subscribeToCandles,
	type ChartInterval,
	type MarketCandle,
} from '@/lib/binance-market-data';
import { myStore } from '@/store/zodstore';
import { Loader } from 'lucide-react';


const intervals: ChartInterval[] = ['1m', '2m', '5m', '15m', '30m', '1h'];

function toChartCandle(candle: MarketCandle): CandlestickData<Time> {
	// Lightweight Charts needs the time and OHLC values in its candlestick data shape.
	return {
		time: candle.time as Time,
		open: candle.open,
		high: candle.high,
		low: candle.low,
		close: candle.close,
	};
}



export default function Chart() {
	const containerRef = useRef<HTMLDivElement>(null);
	const chartRef = useRef<IChartApi | null>(null);
	const seriesRef = useRef<ISeriesApi<'Candlestick'> | null>(null);
	const [interval, setInterval] = useState<ChartInterval>('1m');
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);
	const marketData = myStore((state) => state.marketData['BTC/USDT']);
	const setMarketData = myStore((state) => state.setMarketData);
	const updateCandle = myStore((state) => state.updateCandle);
	const candles = marketData?.candles ?? [];

	useEffect(() => {
		if (!containerRef.current) return;

		// Create one chart instance for the component lifetime and attach its candlestick series.
		const chart = createChart(containerRef.current, {
			autoSize: true,
			layout: { background: { type: ColorType.Solid, color: '#1A1A1A' }, textColor: '#A3A3A3' },
			grid: { vertLines: { color: '#292929' }, horzLines: { color: '#292929' } },
			rightPriceScale: { borderColor: '#3A3A3A' },
			timeScale: { borderColor: '#3A3A3A', timeVisible: true, secondsVisible: false },
		});
		const series = chart.addSeries(CandlestickSeries, {
			upColor: '#1DD6B4',
			downColor: '#F46D22',
			borderVisible: false,
			wickUpColor: '#1DD6B4',
			wickDownColor: '#F46D22',
		});
		chartRef.current = chart;
		seriesRef.current = series;

		const resizeObserver = new ResizeObserver(() => chart.applyOptions({
			// Keep the chart dimensions aligned with its responsive container.
			width: containerRef.current?.clientWidth ?? 0,
			height: containerRef.current?.clientHeight ?? 0,
		}));
		resizeObserver.observe(containerRef.current);

		return () => {
			resizeObserver.disconnect();
			chart.remove();
			chartRef.current = null;
			seriesRef.current = null;
		};
	}, []);

	useEffect(() => {
		let closeSocket: () => void = () => undefined;
		let cancelled = false;
		// Each interval change gets fresh history and a matching websocket stream.
		setIsLoading(true);
		setError(null);

		fetchMarketData('BTCUSDT', interval)
			.then((marketData) => {
				if (cancelled) return;
				// Seed the series with already closed candles before listening for live updates.
				setMarketData('BTCUSDT', marketData);
				seriesRef.current?.setData(marketData.candles.map(toChartCandle));
				chartRef.current?.timeScale().fitContent();
				closeSocket = subscribeToCandles('BTCUSDT', interval, (candle) => updateCandle('BTCUSDT', candle));
				setIsLoading(false);
			})
			.catch((error) => {
				if (!cancelled) {
          console.log(error.message);
					setError(`Unable to load ${'BTC/USDT'} market data.`);
					setIsLoading(false);
				}
			});

		return () => {
			// Ignore late REST responses and close the previous interval's websocket.
			cancelled = true;
			closeSocket();
		};
	}, [interval, setMarketData, 'BTCUSDT', updateCandle]);

	useEffect(() => {
		if (candles.length > 0) {
			// Reflect REST data and websocket replacements in the rendered candlestick series.
			seriesRef.current?.setData(candles.map(toChartCandle));
		}
	}, [candles]);

	return (
		<section className="w-full h-full rounded-2xl bg-black p-3 md:p-5" aria-label={`${'BTC/USDT'} price chart`}>
			<div className="mb-4 flex flex-wrap items-center justify-between gap-3">
				<div>
					<h2 className="font-mono text-sm font-medium text-white md:text-base">{'BTC/USDT'}</h2>
					<p className="font-mono text-[10px] md:text-[12px] text-primary-gray">Live {'BTC/USDT'} market data</p>
				</div>
				<div className="flex flex-wrap gap-1" role="group" aria-label="Chart interval">
					{intervals.map((option) => (
						<button
							key={option}
							type="button"
							aria-pressed={interval === option}
							onClick={() => setInterval(option)}
							className={`cursor-pointer rounded-md px-2 py-1 font-mono text-[10px] md:text-[12px] transition-colors ${
								interval === option ? 'bg-accent-yellow text-black' : 'text-primary-gray hover:bg-background-gray hover:text-white'
							}`}
						>
							{option}
						</button>
					))}
				</div>
			</div>
			<div ref={containerRef} className="h-[320px] w-full md:h-[430px]" />
			{(isLoading || error) && (
				<div className="mt-2 font-mono text-xs text-primary-gray">
          { error ?? 
            <div className='flex justify-center items-center gap-3'>
              <Loader className='text-white text-[10px] md:text-base animate-spin'/>
			          Loading {'BTC/USDT'}...
            </div>
          }
        </div>
			)}
		</section>
	);
}
