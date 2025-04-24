import React from 'react';

const PlaceholderImage = ({ symbol, type = 'logo', className = '' }) => {
  const getBackgroundColor = () => {
    switch (symbol) {
      case 'BTC':
        return 'bg-orange-500';
      case 'ETH':
        return 'bg-purple-500';
      case 'USDT':
        return 'bg-green-500';
      case 'BNB':
        return 'bg-yellow-500';
      case 'SOL':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getDimensions = () => {
    if (type === 'logo') {
      return 'w-6 h-6';
    }
    return 'w-20 h-10';
  };

  return (
    <div 
      className={`${getBackgroundColor()} ${getDimensions()} ${className} flex items-center justify-center text-white text-xs font-bold rounded`}
    >
      {symbol}
    </div>
  );
};

export default PlaceholderImage; 