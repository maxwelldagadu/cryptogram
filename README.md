# CryptoGram

CryptoGram is a modern crypto dashboard and market intelligence app built with Next.js. It gives users a clean way to monitor live cryptocurrency prices, view performance trends, track market activity, read the latest crypto headlines, and manage their own account profile in one place.

The app combines live Binance market data, a responsive charting experience, and user authentication to deliver a streamlined experience for crypto traders and enthusiasts.

## Overview

CryptoGram is designed around a simple idea: help users stay informed about market movements without needing to jump between multiple apps or websites. The dashboard surfaces:

- live crypto prices and market trends
- multi-timeframe performance comparisons
- interactive candlestick charts
- trending news articles from major crypto sources
- authentication and user account flows
- profile image updates via cloud storage

The project uses a client-first architecture with real-time market streams, shared app state, and a flexible server setup for authentication and storage.

## Core Features

### 1. Live Market Dashboard
The home dashboard highlights a curated set of major cryptocurrencies including Bitcoin, Ethereum, Solana, and Litecoin. Each card presents:

- current price
- daily change percentage
- volume information
- visual market trend summary

This gives users a quick overview of key market movements at a glance.

### 2. Interactive Candlestick Charts
The app includes a responsive chart panel that displays live candlestick data for the selected market pair. Users can:

- switch between time intervals such as 1m, 5m, 15m, 30m, and 1h
- watch the chart update in real time
- inspect price action over time using the built-in charting library

The chart is fed from Binance REST and WebSocket data, so it reflects ongoing price movement rather than stale snapshots.

### 3. Search and Market Symbol Selection
Users can search for a symbol such as BTCUSDT or ETHUSDT from the main navigation bar. The selected symbol updates the chart and market context, allowing the app to focus on the asset the user cares about.

This keeps the experience dynamic, especially for traders who track multiple coins.

### 4. Timeframe Trend Tracking
CryptoGram calculates and shows percentage movement across several periods:

- Today
- 7 Days
- 30 Days

This helps users understand short- and medium-term momentum without reading raw market numbers manually.

### 5. Trending Crypto News Feed
The app pulls article data from multiple crypto RSS feeds and displays them in a compact news panel. Users can:

- view recent headlines
- click through to the original source
- refresh the feed
- read market-related summaries from independent news providers

The feed filters for cryptocurrency and blockchain-related topics, making it useful for fast market awareness.

### 6. Authentication and Session Handling
The app supports user authentication using Better Auth with email and password sign-in/sign-up. It includes:

- sign up flow
- sign in form with validation
- logged-in state tracking
- logout action

This gives the app a real user experience beyond basic data display.

### 7. Profile Management
Authenticated users can update their profile image. The app supports:

- selecting a local image
- previewing the selected image before uploading
- storing the image in Supabase storage
- replacing the current avatar on the app

This adds a personal and modern account layer to the dashboard.

### 8. Responsive Interface
The dashboard is designed for desktop and smaller screens. Layout elements adapt to available space, and navigation becomes simplified on smaller viewports, while still keeping important app functions available.

## Functional Workflow

### Home dashboard
When the app loads, the homepage loads the main market overview and chart data. It does the following:

1. checks whether the user is logged in
2. loads major market cards for popular coins
3. fetches live Binance ticker information for price and trend data
4. displays trend summaries and current volume
5. renders the live chart for the active symbol

### Market data flow
Crypto market data is managed with a centralized Zustand store. The app stores information such as:

- the current active symbol
- volume and trend values
- chart candle data
- the selected chart coin

This makes the dashboard more efficient because multiple UI sections can share the same source of truth without duplicating API requests.

### Live chart behavior
The chart component:

- creates the chart instance once
- fetches historical candles from Binance
- subscribes to the live kline stream for the selected symbol
- updates the data as new candles arrive
- reuses the same chart when the user switches intervals or symbols

### News feed behavior
The trending news panel calls a local API route, which aggregates RSS content from several crypto publishers. The feed is parsed, filtered for relevant topics, deduplicated, and sorted by recency before rendering.

### Account experience
The auth flow uses Better Auth and keeps the logged-in state in the application store. Once signed in, users can access their profile menu, change their profile photo, and log out securely.

## Tech Stack

This project is built with:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Zustand for client-side state management
- Better Auth for authentication
- Prisma for database access
- Supabase for profile image storage
- Binance API for live market prices and chart data
- RSS/XML parsing for crypto headlines
- lightweight-charts for candlestick visualizations

## Project Structure

```text
cryptogram/
├── app/                      # App router pages and routes
├── components/               # Reusable UI and dashboard components
├── custom-hooks/             # User/session related hooks
├── database/                 # Prisma database setup
├── lib/                      # Market data, auth helpers, and app utilities
├── public/                   # Static assets
├── schemas/                  # Zod validation schemas
├── server-actions/           # Server-side user session checks
├── store/                    # Zustand store configuration
├── supabase/                 # Supabase client/server setup
├── suspense/                 # Loading states for async data
├── package.json              # Project scripts and dependencies
├── next.config.ts            # Next.js configuration
├── prisma.config.ts          # Prisma configuration
├── README.md                 # Project documentation
└── tsconfig.json             # TypeScript config
```

### Why This App Is Useful

CryptoGram is useful for users who want:

- a quick snapshot of crypto market momentum
- live trading-price awareness
- a simple dashboard without heavy technical complexity
- access to recent crypto news while monitoring price action
- a personalized dashboard with account-based profile management

It is especially valuable for casual traders, crypto newcomers, and active market watchers who want a fast overview with real-time data.


### Conclusion

CryptoGram combines live crypto data, trending news, and user management into a single responsive dashboard. It delivers a practical experience for people who want market awareness, fast updates, and a cleaner way to monitor the crypto landscape.

The app is designed to feel modern, informative, and simple, while still tapping into real external APIs to keep the experience live and useful.
