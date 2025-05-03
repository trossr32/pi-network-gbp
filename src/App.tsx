import React, { useState, useEffect } from 'react';
import { fetchPiNetworkConfig } from './services/api';
import { PiNetworkConfig } from './types';
import { ArrowLeftRight } from 'lucide-react';
import ExchangeInfo from './components/ExchangeInfo';
import Converter from './components/Converter';
import './index.css';
import coinGeckoLogo from '/images/coingecko-logo.png';
//import { useAppUpdateChecker } from './hooks/useAppUpdateChecker';

function App() {
  const [config, setConfig] = useState<PiNetworkConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [piAmount, setPiAmount] = useState<string>('1');
  //const isUpdateAvailable = useAppUpdateChecker({ intervalMinutes: 5 });

  useEffect(() => {
    const loadConfig = async () => {
      try {
        const data = await fetchPiNetworkConfig();
        setConfig(data);

        const urlParams = new URLSearchParams(window.location.search);
        const amount = urlParams.get('amount');
        if (amount) {
          setPiAmount(amount);
        }
      } catch (err) {
        setError('Failed to load Pi Network configuration. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadConfig();
  }, []);

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-[#160c23] bg-gray-50">
      <main className="container mx-auto px-4 pt-16 pb-8">
        {/* {isUpdateAvailable && (
          <div className="fixed bottom-4 left-4 bg-yellow-200 text-black p-3 rounded shadow-lg z-50">
            🔄 A new version of the app is available.&nbsp;
            <button
              onClick={() => window.location.reload()}
              className="underline font-semibold"
            >
              Refresh
            </button>
          </div>
        )} */}

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#a1722f]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-red-600 dark:text-red-400 p-4 bg-red-100 dark:bg-red-900/20 rounded-lg">
            {error}
          </div>
        ) : config && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2 max-w-xl mx-auto">
                <div className="flex justify-center items-center mb-2">
                  <div>Pi Network</div>
                  <ArrowLeftRight className="h-5 w-5 text-amber-600 dark:text-amber-500 mx-6" />
                  <div>GBP</div>
                </div>
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto">
                Exchange rate and conversion for Pi Network cryptocurrency to GBP
              </p>
            </div>

            <ExchangeInfo
              exchangeRateGBP={config.exchangeRateGBP}
              marketCapGBP={config.marketCapGBP}
              percentageChange={config.percentageChange}
            />

            <Converter
              exchangeRateGBP={config.exchangeRateGBP}
              piAmount={piAmount}
              setPiAmount={setPiAmount}
            />
          </>
        )}
      </main>

      <footer className="py-6 mt-12 border-t dark:border-gray-800 text-center text-sm text-gray-600 dark:text-gray-400">
        <div className="flex flex-wrap items-center justify-center mb-2 text-sm">
          Exchange rates updated every 30 minutes using&nbsp;
          <a
            href="https://www.coingecko.com/en/coins/pi-network"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center px-3 py-1 bg-gray-500 hover:bg-gray-700 text-gray-200 hover:text-white rounded-full transition-colors"
          >
            <img src={coinGeckoLogo} alt="CoinGecko" className="h-5 w-auto mr-2" />
            CoinGecko API
          </a>
          &nbsp;| Last updated:{' '}
          {new Date().toLocaleString('en-GB', {
            dateStyle: 'short',
            timeStyle: 'short',
          })}
        </div>
      </footer>
    </div>
  );
}

export default App;
