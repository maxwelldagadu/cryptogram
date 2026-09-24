


export type ChartInterval = '1m' | '2m' | '5m' | '15m' | '30m' | '1h';

export interface MarketCandle {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface PercentageTrend {
  percentage: number;
  currentPrice: number;
  referencePrice: number;
}

export interface MarketTrends {
  today: PercentageTrend;
  sevenDays: PercentageTrend;
  thirtyDays: PercentageTrend;
}

interface BinanceKline {
  0: number;
  1: string;
  2: string;
  3: string;
  4: string;
  5: string;
  6: number;
  7: string;
  8: number;
}

const BINANCE_API_URL = 'https://api.binance.com/api/v3/klines';
const BINANCE_STREAM_URL = 'wss://stream.binance.com:9443/ws';

function toCandle(kline: BinanceKline): MarketCandle {
  return {
    time: Math.floor(kline[0] / 1000),
    open: Number(kline[1]),
    high: Number(kline[2]),
    low: Number(kline[3]),
    close: Number(kline[4]),
    volume: Number(kline[5]),
  };
}

function getPercentageTrend(currentPrice: number, referencePrice: number): PercentageTrend {
  return {
    percentage: referencePrice === 0 ? 0 : ((currentPrice - referencePrice) / referencePrice) * 100,
    currentPrice,
    referencePrice,
  };
}

export async function fetchBinanceCandles(
  symbol: string,
  interval: ChartInterval | '1d',
  limit = 500,
): Promise<MarketCandle[]> {
  const params = new URLSearchParams({
    symbol: symbol.toUpperCase(),
    interval,
    limit: String(limit),
  });
  const response = await fetch(`${BINANCE_API_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Binance candles request failed with status ${response.status}`);
  }

  const klines = (await response.json()) as BinanceKline[];
  const now = Date.now();
  return klines.map(toCandle).filter((candle, index) => {
    const rawKline = klines[index];
    return rawKline[6] <= now;
  });
}

export async function fetchBitcoinMarketData(symbol = 'BTCUSDT', interval: ChartInterval = '1m') {
  const [candles, dailyCandles] = await Promise.all([
    fetchBinanceCandles(symbol, interval),
    fetchBinanceCandles(symbol, '1d', 31),
  ]);
  const currentPrice = candles.at(-1)?.close ?? 0;
  const latestDailyIndex = dailyCandles.length - 1;

  return {
    candles,
    volume: candles.at(-1)?.volume ?? 0,
    percentageTrend: {
      today: getPercentageTrend(currentPrice, dailyCandles.at(-1)?.open ?? currentPrice),
      sevenDays: getPercentageTrend(
        currentPrice,
        dailyCandles[Math.max(0, latestDailyIndex - 6)]?.open ?? currentPrice,
      ),
      thirtyDays: getPercentageTrend(
        currentPrice,
        dailyCandles[Math.max(0, latestDailyIndex - 29)]?.open ?? currentPrice,
      ),
    } satisfies MarketTrends,
  };
}

export function subscribeToBitcoinCandles(
  symbol: string,
  interval: ChartInterval,
  onCandle: (candle: MarketCandle) => void,
) {
  const socket = new WebSocket(
    `${BINANCE_STREAM_URL}/${symbol.toLowerCase()}@kline_${interval}`,
  );

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data) as {
      k: { t: number; o: string; h: string; l: string; c: string; v: string };
    };
    const kline = message.k;
    onCandle({
      time: Math.floor(kline.t / 1000),
      open: Number(kline.o),
      high: Number(kline.h),
      low: Number(kline.l),
      close: Number(kline.c),
      volume: Number(kline.v),
    });
  };

  return () => socket.close();
}