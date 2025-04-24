import { createSlice } from '@reduxjs/toolkit';

const generateSparklineData = (basePrice) => {
  const points = [];
  let currentValue = basePrice;
  
  for (let i = 0; i < 24; i++) {
    // Add small random variations (-2% to +2%) to create realistic price movements
    const variation = 1 + (Math.random() * 0.04 - 0.02);
    currentValue = currentValue * variation;
    points.push({ value: currentValue });
  }
  
  return points;
};

const initialState = {
  assets: [
    {
      id: 1,
      name: 'Bitcoin',
      symbol: 'BTC',
      logo: '@/assets/images/btc.png',
      price: 93759.48,
      priceChange1h: 0.43,
      priceChange24h: 0.93,
      priceChange7d: 11.11,
      marketCap: 1861618902186,
      volume24h: 43874950947,
      volume24hBtc: 467.81,
      circulatingSupply: 19850000,
      maxSupply: 21000000,
      sparklineData: generateSparklineData(93759.48)
    },
    {
      id: 2,
      name: 'Ethereum',
      symbol: 'ETH',
      logo: '@/assets/images/eth.png',
      price: 1802.46,
      priceChange1h: 0.60,
      priceChange24h: 3.21,
      priceChange7d: 13.68,
      marketCap: 217581279327,
      volume24h: 23547469307,
      volume24hBtc: 13.05,
      circulatingSupply: 120710000,
      maxSupply: null,
      sparklineData: generateSparklineData(1802.46)
    },
    {
      id: 3,
      name: 'Tether',
      symbol: 'USDT',
      logo: '@/assets/images/usdt.png',
      price: 1.00,
      priceChange1h: 0.00,
      priceChange24h: 0.00,
      priceChange7d: 0.04,
      marketCap: 145320022085,
      volume24h: 92288882007,
      volume24hBtc: 92.25,
      circulatingSupply: 145270000000,
      maxSupply: null,
      sparklineData: generateSparklineData(1.00)
    },
    {
      id: 4,
      name: 'XRP',
      symbol: 'XRP',
      logo: '@/assets/images/xrp.png',
      price: 2.22,
      priceChange1h: 0.46,
      priceChange24h: 0.54,
      priceChange7d: 6.18,
      marketCap: 130073814966,
      volume24h: 5131481491,
      volume24hBtc: 2.30,
      circulatingSupply: 58390000000,
      maxSupply: 100000000000,
      sparklineData: generateSparklineData(2.22)
    },
    {
      id: 5,
      name: 'BNB',
      symbol: 'BNB',
      logo: '@/assets/images/bnb.png',
      price: 606.65,
      priceChange1h: 0.09,
      priceChange24h: -1.20,
      priceChange7d: 3.73,
      marketCap: 85471956947,
      volume24h: 1874281784,
      volume24hBtc: 3.08,
      circulatingSupply: 140890000,
      maxSupply: 200000000,
      sparklineData: generateSparklineData(606.65)
    },
    {
      id: 6,
      name: 'Solana',
      symbol: 'SOL',
      logo: '@/assets/images/sol.png',
      price: 151.51,
      priceChange1h: 0.53,
      priceChange24h: 1.26,
      priceChange7d: 14.74,
      marketCap: 78381958631,
      volume24h: 4881674486,
      volume24hBtc: 32.25,
      circulatingSupply: 517310000,
      maxSupply: null,
      sparklineData: generateSparklineData(151.51)
    }
  ],
  status: 'idle',
};

export const CryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {
    updatePrice: (state, action) => {
      const { id, price, priceChange1h, priceChange24h, priceChange7d, volume24h } = action.payload;
      const asset = state.assets.find(a => a.id === id);
      if (asset) {
        asset.price = price;
        asset.priceChange1h = priceChange1h;
        asset.priceChange24h = priceChange24h;
        asset.priceChange7d = priceChange7d;
        asset.volume24h = volume24h;
        asset.sparklineData = [
          ...asset.sparklineData.slice(1),
          { value: price }
        ];
      }
    },
  },
});

export const { updatePrice } = CryptoSlice.actions;
export const selectAllAssets = (state) => state.crypto.assets;

export default CryptoSlice.reducer;
