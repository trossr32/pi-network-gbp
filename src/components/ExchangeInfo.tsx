import React from 'react';
import { ArrowDown, ArrowUp, PoundSterling } from 'lucide-react';

interface ExchangeInfoProps {
  priceGBP: number;
  marketCapGBP: number;
  percentageChange: number;
}

const ExchangeInfo: React.FC<ExchangeInfoProps> = ({ 
  priceGBP, 
  marketCapGBP, 
  percentageChange
}) => {
  const isPositiveChange = percentageChange >= 0;
  const formattedMarketCap = new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    maximumFractionDigits: 0
  }).format(marketCapGBP);

  const formattedExchangeRate = new Intl.NumberFormat('en-GB', { 
    style: 'currency', 
    currency: 'GBP',
    minimumFractionDigits: 5
  }).format(priceGBP);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-3xl mx-auto mt-8">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300
                     hover:shadow-lg border border-transparent dark:border-gray-700">
        <div className="flex items-center mb-2">
          <PoundSterling className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Exchange Rate</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formattedExchangeRate}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300
                     hover:shadow-lg border border-transparent dark:border-gray-700">
        <div className="flex items-center mb-2">
          <PoundSterling className="h-5 w-5 text-amber-600 dark:text-amber-500 mr-2" />
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">Market Cap</h3>
        </div>
        <p className="text-2xl font-bold text-gray-900 dark:text-white">{formattedMarketCap}</p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-5 transition-all duration-300
                     hover:shadow-lg border border-transparent dark:border-gray-700">
        <div className="flex items-center mb-2">
          {isPositiveChange ? (
            <ArrowUp className="h-5 w-5 text-green-500 mr-2" />
          ) : (
            <ArrowDown className="h-5 w-5 text-red-500 mr-2" />
          )}
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">24h Change</h3>
        </div>
        <p className={`text-2xl font-bold ${
          isPositiveChange ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
        }`}>
          {isPositiveChange ? '+' : ''}{percentageChange.toFixed(2)}%
        </p>
      </div>
    </div>
  );
};

export default ExchangeInfo;