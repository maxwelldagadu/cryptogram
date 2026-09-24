import {create} from 'zustand';
import type { MarketCandle, MarketTrends } from '@/lib/binance-market-data';

interface Store {
  authError: string  | null,
  blobImage: string,
  profileImage: File | null,
  currentUserSession: string | null,
  setAuthError: (errorData: string | null) => void,
  setCurrentUserSession: (sesssionID: string | null) => void,
  setBlobImage: (blob: string) => void,
  setProfileImage: (profileImage: File | null) => void,
  candles: MarketCandle[],
  volume: number,
  percentageTrend: MarketTrends | null,
  setMarketData: (marketData: {
    candles: MarketCandle[];
    volume: number;
    percentageTrend: MarketTrends;
  }) => void,
  updateCandle: (candle: MarketCandle) => void
}

export const myStore = create<Store>((set) => ({
  authError: null,
  currentUserSession: null,
  blobImage: '',
  profileImage: null,
  candles: [],
  volume: 0,
  percentageTrend: null,
  setAuthError: (errorData: string | null) => set({authError: errorData}),
  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID}),
  setBlobImage: (blob: string) => set({blobImage: blob}),
  setProfileImage: (profileImage: File | null) => set({profileImage}),
  setMarketData: (marketData) => set(marketData),
  updateCandle: (candle) => set((state) => {
    const lastCandle = state.candles.at(-1);
    if (lastCandle?.time === candle.time) {
      return { candles: [...state.candles.slice(0, -1), candle], volume: candle.volume };
    }
    return { candles: [...state.candles, candle], volume: candle.volume };
  })
  }));

