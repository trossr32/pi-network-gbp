import React from 'react';
import { asGBP } from '../utils/asGBP';
import { asPercent } from '../utils/asPercent';
import { formatDate } from '../utils/formatDate';
import { FileJson } from 'lucide-react';

interface ConverterProps {
  count: number;
  totalGBP: number;
  high_24hGBP: number;
  low_24hGBP: number;
  allTimeHigh: { 
    priceGBP: number;
    percentageChange: number;
    date: string;
  };
  allTimeLow: { 
    priceGBP: number;
    percentageChange: number;
    date: string;
  };
}

const Holdings: React.FC<ConverterProps> = ({
  count,
  totalGBP,
  high_24hGBP,
  low_24hGBP,
  allTimeHigh,
  allTimeLow
}) => {
  // Build the holdings JSON URL with the current count
  const holdingsJsonUrl = `${import.meta.env.BASE_URL}holdings-json?amount=${count}`;

  const handleJsonClick = (e: React.MouseEvent) => {
    e.preventDefault();
    window.open(holdingsJsonUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="relative w-full max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6
                    transition-all duration-300 border border-transparent dark:border-gray-700">
      {/* JSON button with tooltip */}
      <div className="absolute top-1 right-1 group">
        <button
          onClick={handleJsonClick}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors shadow focus:outline-none"
          type="button"
        >
          <FileJson className="h-5 w-5 text-amber-600 dark:text-amber-400" />
        </button>
        <div className="absolute left-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none z-10">
          View holdings JSON response
        </div>
      </div>
      <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Holdings ({count})
      </h2>
      <div className="space-y-4">
        <div className="flex justify-between pb-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium">Total GBP</span>
          <span className="text-amber-600 dark:text-amber-500">{asGBP(totalGBP)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-700 dark:text-gray-300 font-medium">24h High (GBP)</span>
          <span className="text-gray-900 dark:text-white">
            {asGBP(high_24hGBP)}&nbsp;
            <span className="text-xs font-medium text-red-600 dark:text-red-400">
              (
                {totalGBP !== 0
                  ? ((totalGBP - high_24hGBP) / totalGBP * 100).toFixed(2)
                  : '0.00'
                }%
              )
            </span>
          </span>
        </div>
        <div className="flex justify-between pb-4">
          <span className="text-gray-700 dark:text-gray-300 font-medium">24h Low (GBP)</span>
          <span className="text-gray-900 dark:text-white">
            {asGBP(low_24hGBP)}&nbsp;
            <span className="text-xs font-medium text-green-600 dark:text-green-400">
              (
                {totalGBP !== 0
                  ? `+${((totalGBP - low_24hGBP) / totalGBP * 100).toFixed(2)}`
                  : '0.00'
                }%
              )
            </span>
          </span>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">All-Time High</span>
            <span className="text-gray-900 dark:text-white">
              {asGBP(allTimeHigh.priceGBP)}&nbsp;
              <span className="text-xs font-medium text-red-600 dark:text-red-400">({asPercent(allTimeHigh.percentageChange)})</span>
            </span>
          </div>
          <div className="w-full text-right italic text-xs font-medium text-gray-500 dark:text-gray-400">
            {formatDate(allTimeHigh.date)}
          </div>
        </div>
        <div>
          <div className="flex justify-between">
            <span className="text-gray-700 dark:text-gray-300 font-medium">All-Time Low</span>
            <span className="text-gray-900 dark:text-white">
              {asGBP(allTimeLow.priceGBP)}&nbsp;
              <span className="text-xs font-medium text-green-600 dark:text-green-400">(+{asPercent(allTimeLow.percentageChange)})</span>
            </span>
          </div>
          <div className="w-full text-right italic text-xs font-medium text-gray-500 dark:text-gray-400">
            {formatDate(allTimeLow.date)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holdings;