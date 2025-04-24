export const formatCurrency = (value) => {
  if (value >= 1) {
    return `$${value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  }
  return `$${value.toLocaleString('en-US', { minimumFractionDigits: 4, maximumFractionDigits: 4 })}`;
};

export const formatPercentage = (value) => {
  return value.toFixed(2);
};

export const formatLargeNumber = (value) => {
  if (value === null || value === undefined) return 'N/A';
  
  if (value >= 1000000000) {
    return `$${(value / 1000000000).toFixed(2)}B`;
  }
  if (value >= 1000000) {
    return `$${(value / 1000000).toFixed(2)}M`;
  }
  return value.toLocaleString('en-US');
};