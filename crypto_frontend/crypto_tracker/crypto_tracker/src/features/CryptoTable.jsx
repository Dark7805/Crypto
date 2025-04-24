import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePrice, selectAllAssets } from './CryptoSlice';
import { mockWebSocket } from '../services/WebSocket';
import { formatCurrency, formatPercentage, formatLargeNumber } from '../utils/Formatters';
import PlaceholderImage from '../components/PlaceholderImage';
import SparklineChart from '../components/SparklineChart';
import btcLogo from '../assets/images/btc.png';
import ethLogo from '../assets/images/eth.png';
import tetherLogo from '../assets/images/tether.png';
import xrpLogo from '../assets/images/download.png';
import bnbLogo from '../assets/images/bnb.png';
import solanaLogo from '../assets/images/solana.png';
import '../styles/Table.css';

const InfoIcon = () => (
  <svg className="info-icon" fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
  </svg>
);

const ArrowIcon = ({ direction }) => (
  <svg 
    className={`w-3 h-3 ${direction === 'up' ? 'text-[#16c784]' : 'text-[#ea3943]'}`}
    viewBox="0 0 24 24"
    fill="currentColor"
    style={{ display: 'inline-block', marginTop: '-2px' }}
  >
    <path d={direction === 'up' ? 'M12 2l-3.5 7h7L12 2z' : 'M12 22l-3.5-7h7L12 22z'} />
  </svg>
);

const CryptoTable = () => {
  const assets = useSelector(selectAllAssets);
  const dispatch = useDispatch();

  useEffect(() => {
    const ws = mockWebSocket.connect();
    
    ws.addEventListener('message', (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'price_update') {
        dispatch(updatePrice(data.data));
      }
    });

    return () => ws.close();
  }, [dispatch]);

  const renderPercentageChange = (value) => {
    const numValue = parseFloat(value);
    const isPositive = numValue > 0;
    const colorClass = isPositive ? 'percentage-up' : numValue < 0 ? 'percentage-down' : 'percentage-neutral';
    
    return (
      <span className={colorClass}>
        {isPositive ? '+' : ''}{numValue.toFixed(2)}%
      </span>
    );
  };

  const getCoinLogo = (symbol) => {
    switch(symbol.toLowerCase()) {
      case 'btc':
        return btcLogo;
      case 'eth':
        return ethLogo;
      case 'usdt':
        return tetherLogo;
      case 'xrp':
        return xrpLogo;
      case 'bnb':
        return bnbLogo;
      case 'sol':
        return solanaLogo;
      default:
        return null;
    }
  };

  return (
    <div className="table-container">
      <table className="crypto-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Price</th>
            <th>1h %</th>
            <th>24h %</th>
            <th>7d %</th>
            <th>
              <div className="flex items-center justify-end gap-2">
                Market Cap
                <InfoIcon />
              </div>
            </th>
            <th>
              <div className="flex items-center justify-end gap-2">
                Volume(24h)
                <InfoIcon />
              </div>
            </th>
            <th>
              <div className="flex items-center justify-end gap-2">
                Circulating Supply
                <InfoIcon />
              </div>
            </th>
            <th>Last 7 Days</th>
          </tr>
        </thead>
        <tbody>
          {assets.map((asset, index) => (
            <tr key={asset.id}>
              <td>{index + 1}</td>
              <td>
                <div className="name-cell">
                  {getCoinLogo(asset.symbol) ? (
                    <img 
                      src={getCoinLogo(asset.symbol)} 
                      alt={`${asset.name} logo`} 
                      className="coin-logo"
                    />
                  ) : (
                    <PlaceholderImage className="coin-logo" />
                  )}
                  <div className="coin-info">
                    <span className="coin-name">{asset.name}</span>
                    <span className="coin-symbol">{asset.symbol}</span>
                  </div>
                </div>
              </td>
              <td>{formatCurrency(asset.price)}</td>
              <td>{renderPercentageChange(asset.priceChange1h)}</td>
              <td>{renderPercentageChange(asset.priceChange24h)}</td>
              <td>{renderPercentageChange(asset.priceChange7d)}</td>
              <td>{formatLargeNumber(asset.marketCap)}</td>
              <td>
                <div>
                  <div>{formatLargeNumber(asset.volume24h)}</div>
                  <div className="coin-symbol">{asset.volume24hBtc} {asset.symbol}</div>
                </div>
              </td>
              <td>
                <div>
                  <div>{formatLargeNumber(asset.circulatingSupply)}</div>
                  <div className="coin-symbol">{asset.symbol}</div>
                </div>
              </td>
              <td>
                <SparklineChart 
                  data={asset.sparklineData}
                  color={asset.priceChange7d >= 0 ? "#16c784" : "#ea3943"}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CryptoTable;