
  // Websocket URL
export  let ws: any;

export function getTrendingData(coin:string){
  const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@ticker`);

  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    return {
      coin: data.s,
      price: Math.floor(data.b),
      trend: Number(data.P)
    }
    
  }
}
