class WebSocketService {
  constructor() {
    this.ws = null;
    this.baseUrl = import.meta.env.VITE_WEBSOCKET_URL;
  }

  connect() {
    if (!this.ws) {
      this.ws = new WebSocket(this.baseUrl);
      
      this.ws.onopen = () => {
        console.log('WebSocket Connected');
        // Subscribe to crypto streams
        const subscribeMessage = {
          method: "SUBSCRIBE",
          params: [
            "btcusdt@ticker",
            "ethusdt@ticker",
            "bnbusdt@ticker",
            "solusdt@ticker",
            "xrpusdt@ticker"
          ],
          id: 1
        };
        this.ws.send(JSON.stringify(subscribeMessage));
      };

      this.ws.onerror = (error) => {
        console.error('WebSocket Error:', error);
      };
    }
    return this.ws;
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export const mockWebSocket = new WebSocketService(); 