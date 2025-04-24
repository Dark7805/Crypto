# Crypto Price Tracker

A real-time cryptocurrency price tracking application that displays live prices, market data, and price trends for major cryptocurrencies.

![Crypto Tracker Screenshot](./screenshot.png)

## Features

- Real-time price updates
- Price change percentages (1h, 24h, 7d)
- Market cap and volume information
- Circulating supply details
- 7-day price trend sparkline charts
- Responsive design for all screen sizes

## Tech Stack

- **Frontend Framework**: React 18
- **State Management**: Redux Toolkit
- **Styling**: 
  - CSS Modules
  - Tailwind CSS for utility classes
- **Data Visualization**: Recharts for sparkline graphs
- **Real-time Updates**: WebSocket connection
- **Build Tool**: Vite

## Project Architecture

```
crypto_tracker/
├── src/
│   ├── app/
│   │   └── Store.js           # Redux store configuration
│   ├── assets/
│   │   └── images/           # Cryptocurrency logos
│   ├── components/
│   │   ├── PlaceholderImage.jsx
│   │   └── SparklineChart.jsx
│   ├── features/
│   │   ├── CryptoTable.jsx   # Main table component
│   │   └── CryptoSlice.js    # Redux slice for crypto data
│   ├── services/
│   │   └── WebSocket.js      # WebSocket connection handler
│   ├── styles/
│   │   └── Table.css        # Table styling
│   ├── utils/
│   │   └── Formatters.js    # Number and currency formatters
│   ├── App.jsx
│   └── main.jsx
```

## Setup Instructions

1. **Clone the Repository**
   ```bash
   git clone <repository-url>
   cd crypto_tracker
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   - Create a `.env` file in the root directory
   ```env
   VITE_WS_URL=your_websocket_url
   ```

4. **Start Development Server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

5. **Build for Production**
   ```bash
   npm run build
   ```

## Data Flow

1. **Real-time Updates**
   - WebSocket connection established on component mount
   - Price updates received through WebSocket
   - Redux store updated with new data
   - Components re-render with updated prices

2. **State Management**
   - Redux store maintains cryptocurrency data
   - CryptoSlice handles state updates
   - Components access data through selectors

## Styling Structure

- Base styles in `Table.css`
- Responsive design breakpoints:
  - Desktop: 1280px and above
  - Tablet: 768px to 1279px
  - Mobile: Below 768px

## Performance Optimizations

- Memoized selectors for efficient state access
- Optimized re-renders using React.memo
- Efficient number formatting
- Lazy loading for non-critical components

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
