


export type ChartInterval = '1m'  | '5m' | '15m' | '30m' | '1h';

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

export interface MarketData {
  candles: MarketCandle[];
  volume: number;
  percentageTrend: MarketTrends;
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
const BINANCE_24_HOUR_TICKER_URL = 'https://api.binance.com/api/v3/ticker/24hr';
const BINANCE_STREAM_URL = 'wss://stream.binance.com:9443/ws';

interface Binance24HourTicker {
  quoteVolume: string;
}

function toCandle(kline: BinanceKline): MarketCandle {
  // Convert Binance's positional kline response into the named fields used by the chart and store.
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
  // Compare the latest price with the opening price for the requested period.
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
  // Ask Binance for enough candles to give the chart useful history before the websocket starts.
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
  // The final REST candle may still be forming, so only expose candles whose close time has passed.
  return klines.map(toCandle).filter((candle, index) => {
    const rawKline = klines[index];
    return rawKline[6] <= now;
  });
}

async function fetchBinance24HourVolume(symbol: string): Promise<number> {
  // quoteVolume is the total value traded in the quote currency, such as USDT for BTCUSDT.
  const params = new URLSearchParams({ symbol: symbol.toUpperCase() });
  const response = await fetch(`${BINANCE_24_HOUR_TICKER_URL}?${params.toString()}`);

  if (!response.ok) {
    throw new Error(`Binance 24-hour ticker request failed with status ${response.status}`);
  }

  const ticker = (await response.json()) as Binance24HourTicker;
  return Number(ticker.quoteVolume);
}

export async function fetchMarketData(symbol: string, interval: ChartInterval = '1m'): Promise<MarketData> {
  // Load chart history, trend references, and the independent 24-hour volume together.
  const [candles, dailyCandles, volume] = await Promise.all([
    fetchBinanceCandles(symbol, interval),
    fetchBinanceCandles(symbol, '1d', 31),
    fetchBinance24HourVolume(symbol),
  ]);
  const currentPrice = candles.at(-1)?.close ?? 0;
  const latestDailyIndex = dailyCandles.length - 1;

  // Keep the chart candles separate from summary values that other dashboard components can consume later.
  return {
    candles,
    volume,
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

export function subscribeToCandles(
  symbol: string,
  interval: ChartInterval,
  onCandle: (candle: MarketCandle) => void,
) {
  // Binance sends updates for the currently forming candle; the store replaces it until its time changes.
  const socket = new WebSocket(
    `${BINANCE_STREAM_URL}/${symbol.toLowerCase()}@kline_${interval}`,
  );

  socket.onmessage = (event) => {
    // Normalize the websocket kline payload to the same shape returned by the REST endpoint.
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

  // Return a disposer so changing intervals or unmounting the chart closes the old stream.
  return () => socket.close();
}