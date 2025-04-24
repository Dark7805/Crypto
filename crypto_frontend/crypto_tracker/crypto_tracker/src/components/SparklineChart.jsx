import React from 'react';
import { LineChart, Line, YAxis } from 'recharts';

const SparklineChart = ({ data, color = "#16a34a" }) => {
  // Ensure we have valid data to display
  const chartData = data?.length > 0 
    ? data.map((point, index) => ({
        time: index,
        value: typeof point.value === 'number' ? point.value : 0
      }))
    : Array.from({ length: 24 }, (_, i) => ({
        time: i,
        value: 100
      }));

  // Calculate min and max for better scaling
  const minValue = Math.min(...chartData.map(d => d.value));
  const maxValue = Math.max(...chartData.map(d => d.value));
  const padding = (maxValue - minValue) * 0.1; // Add 10% padding

  return (
    <LineChart width={120} height={40} data={chartData}>
      <YAxis 
        domain={[minValue - padding, maxValue + padding]}
        hide={true}
      />
      <Line
        type="monotone"
        dataKey="value"
        stroke={color}
        strokeWidth={1.5}
        dot={false}
        isAnimationActive={false}
      />
    </LineChart>
  );
};

export default SparklineChart; 