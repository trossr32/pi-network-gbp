import React, { useState, useEffect } from 'react';
import { RefreshCw, Link } from 'lucide-react';

interface ConverterProps {
  exchangeRateGBP: number;
  piAmount: string;
  setPiAmount: (value: string) => void;
}

const Converter: React.FC<ConverterProps> = ({ exchangeRateGBP, piAmount, setPiAmount }) => {
  const [gbpAmount, setGbpAmount] = useState<string>(exchangeRateGBP.toFixed(5));

  useEffect(() => {
    if (piAmount) {
      const pi = parseFloat(piAmount);
      if (!isNaN(pi)) {
        const gbp = pi * exchangeRateGBP;
        setGbpAmount(gbp.toFixed(5));
      }
    }
  }, [piAmount, exchangeRateGBP]);

  const handlePiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPiAmount(value);
  };

  const handleGbpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setGbpAmount(value);
    
    if (value) {
      const gbp = parseFloat(value);
      if (!isNaN(gbp)) {
        const pi = gbp / exchangeRateGBP;
        setPiAmount(pi.toFixed(5));
      }
    }
  };

  const createPermalink = () => {
    const url = new URL(window.location.href);
    url.searchParams.set('amount', piAmount);
    window.history.pushState({}, '', url.toString());
  };

  const isValidAmount = !isNaN(parseFloat(piAmount));

  return (
    <div className="w-full max-w-md mx-auto mt-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6
                    transition-all duration-300 border border-transparent dark:border-gray-700">
      <h2 className="text-xl font-bold text-center mb-6 text-gray-900 dark:text-white">
        Currency Converter
      </h2>

      <div className="space-y-6">
        <div className="space-y-2">
          <label htmlFor="pi-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Pi Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="pi-amount"
              value={piAmount}
              onChange={handlePiChange}
              className="block w-full p-2 pr-16 sm:text-sm rounded-md 
                       dark:bg-gray-700 dark:text-white dark:border-gray-600
                       border-gray-300 focus:ring-amber-500 focus:border-amber-500 
                       transition-colors duration-200"
              placeholder="0"
              min="0"
              step="0.00001"
            />
            <div className="absolute inset-y-0 right-0 flex items-center space-x-2 pr-3">
              {isValidAmount && (
                <div className="relative group">
                  <button
                    onClick={createPermalink}
                    className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-600 
                              transition-colors duration-200"
                  >
                    <Link className="h-4 w-4 text-amber-600 dark:text-amber-500" />
                  </button>
                  <div className="absolute right-0 top-full mt-2 px-2 py-1 bg-gray-800 text-white text-xs
                                rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity
                                duration-200 whitespace-nowrap pointer-events-none">
                    Create permalink for this amount
                  </div>
                </div>
              )}
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">π</span>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <div className="bg-gray-100 dark:bg-gray-700 p-2 rounded-full">
            <RefreshCw className="h-5 w-5 text-amber-600 dark:text-amber-500" />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="gbp-amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            GBP Amount
          </label>
          <div className="relative rounded-md shadow-sm">
            <input
              type="number"
              id="gbp-amount"
              value={gbpAmount}
              onChange={handleGbpChange}
              className="block w-full p-2 pr-12 sm:text-sm rounded-md 
                       dark:bg-gray-700 dark:text-white dark:border-gray-600
                       border-gray-300 focus:ring-amber-500 focus:border-amber-500
                       transition-colors duration-200 text-xxl"
              placeholder="0"
              min="0"
              step="0.00001"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <span className="text-gray-500 dark:text-gray-400 sm:text-sm">£</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Converter;