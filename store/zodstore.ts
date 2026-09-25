import {create} from 'zustand';
import type { MarketCandle, MarketData } from '@/lib/binance-market-data';

interface Store {
  authError: string  | null,
  blobImage: string,
  profileImage: File | null,
  currentUserSession: string | null,
  setAuthError: (errorData: string | null) => void,
  setCurrentUserSession: (sesssionID: string | null) => void,
  setBlobImage: (blob: string) => void,
  setProfileImage: (profileImage: File | null) => void,
  marketData: Record<string, MarketData>,
  setMarketData: (symbol: string, marketData: MarketData) => void,
  updateCandle: (symbol: string, candle: MarketCandle) => void
}

export const myStore = create<Store>((set) => ({
  authError: null,
  currentUserSession: null,
  blobImage: '',
  profileImage: null,
  marketData: {},

  setAuthError: (errorData: string | null) => set({authError: errorData}),

  setCurrentUserSession: (sesssionID: string | null) => set({currentUserSession: sesssionID}),

  setBlobImage: (blob: string) => set({blobImage: blob}),

  setProfileImage: (profileImage: File | null) => set({profileImage}),

	// Store each symbol separately so loading one chart never overwrites another coin's data.
  setMarketData: (symbol, marketData) => set((state) => ({
    marketData: { ...state.marketData, [symbol]: marketData },
  })),

	// Replace the active candle while it is forming, or append a new candle when its timestamp changes.
  updateCandle: (symbol, candle) => set((state) => {
    const currentMarketData = state.marketData[symbol];
    if (!currentMarketData) return state;

    const lastCandle = currentMarketData.candles.at(-1);
    
    if (lastCandle?.time === candle.time) {
			// The websocket repeatedly updates the same open candle until the interval closes.
      return { marketData: {
        ...state.marketData,
        [symbol]: { ...currentMarketData, candles: [...currentMarketData.candles.slice(0, -1), candle], volume: candle.volume },
      } };
    }
		// A new timestamp means the previous candle closed, so preserve it and add the new one.
    return { marketData: {
      ...state.marketData,
      [symbol]: { ...currentMarketData, candles: [...currentMarketData.candles, candle], volume: candle.volume },
    } };
  })
  }));

