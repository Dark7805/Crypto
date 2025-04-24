class MockWebSocket {
    constructor(url) {
      this.url = url;
      this.listeners = {
        open: [],
        message: [],
        close: [],
      };
      this.interval = null;
    }
  
    connect(dispatch) {
      // Simulate connection opening
      setTimeout(() => {
        this.listeners.open.forEach(listener => listener());
      }, 500);
  
      // Simulate periodic updates
      this.interval = setInterval(() => {
        this.listeners.message.forEach(listener => {
          const mockData = this.generateMockData();
          listener({ data: JSON.stringify(mockData) });
        });
      }, 2000);
  
      return this;
    }
  
    generateMockData() {
      const assets = [1, 2, 3, 4, 5]; // IDs of our assets
      const assetId = assets[Math.floor(Math.random() * assets.length)];
      
      return {
        type: 'price_update',
        data: {
          id: assetId,
          price: Math.random() * 100000,
          priceChange1h: (Math.random() * 10 - 5).toFixed(2),
          priceChange24h: (Math.random() * 15 - 7.5).toFixed(2),
          priceChange7d: (Math.random() * 20 - 10).toFixed(2),
          volume24h: Math.random() * 50000000000,
        }
      };
    }
  
    addEventListener(event, callback) {
      this.listeners[event].push(callback);
    }
  
    close() {
      clearInterval(this.interval);
      this.listeners.close.forEach(listener => listener());
    }
  }
  
  export const mockWebSocket = new MockWebSocket('ws://mock-crypto-prices.com');