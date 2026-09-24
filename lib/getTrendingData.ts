
  // Websocket URL
export  let ws: any;

export function getTrendingData(coin:string){
  // Fetches the trending crypto data
  return new Promise((resolve) => {
    const ws = new WebSocket(`wss://stream.binance.com:9443/ws/${coin}@ticker`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      resolve({
        price: Math.floor(data.b),
        trend: Number(data.P)
      });
    };
  });
}
