import { useState, useEffect } from 'react';
import { fetchPiNetworkConfig, fetchPiNetworkConfigForAmount } from './services/api';
import { PiNetworkConfig } from './types/PiNetworkConfig';
import { ArrowLeftRight, Link, RefreshCw } from 'lucide-react';
import ExchangeInfo from './components/ExchangeInfo';
import Converter from './components/Converter';
import Holdings from './components/Holdings';
import './index.css';
import coinGeckoLogo from '/images/coingecko-logo.png';
import { PiNetworkConfigWithAmount } from './types/PiNetworkConfigWithAmount';
import { AnimatePresence, motion } from 'framer-motion';
//import { useAppUpdateChecker } from './hooks/useAppUpdateChecker';

function App() {
  const [config, setConfig] = useState<PiNetworkConfig | null>(null);
  const [amountConfig, setAmountConfig] = useState<PiNetworkConfigWithAmount | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [piAmount, setPiAmount] = useState<string>('1');
  const [hasAmountParam, setHasAmountParam] = useState<boolean>(false);
  //const isUpdateAvailable = useAppUpdateChecker({ intervalMinutes: 5 });

  // Move loadConfig outside useEffect so it can be reused
  const loadConfig = async (amountParam?: string) => {
    try {
      const data = await fetchPiNetworkConfig();
      setConfig(data);

      const amount = amountParam ?? new URLSearchParams(window.location.search).get('amount');
      if (amount) {
        const amountData = await fetchPiNetworkConfigForAmount(Number(amount));
        setAmountConfig(amountData);
        setPiAmount(amount);
        setHasAmountParam(true);
      } else {
        setHasAmountParam(false);
      }
    } catch (err) {
      setError('Failed to load Pi Network configuration. Please try again later.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConfig();
    // Listen for browser navigation (back/forward)
    const onPopState = () => {
      const amount = new URLSearchParams(window.location.search).get('amount');
      loadConfig(amount ?? undefined);
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  // Hard refresh handler
  const handleHardRefresh = () => {
    // Clear cache and force reload
    if ('caches' in window) {
      caches.keys().then(function(names) {
        for (const name of names) caches.delete(name);
      });
    }
    window.location.reload();
  };

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
              {/* refresh button */}
              <div className="flex justify-center mt-6">
                <button
                  onClick={handleHardRefresh}
                  className="flex items-center px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-100 rounded-lg shadow transition-colors font-semibold"
                  title="Refresh (clear cache and reload)"
                >
                  <RefreshCw className="h-5 w-5 mr-2" />
                  Refresh
                </button>
              </div>
            </div>

            <ExchangeInfo
              priceGBP={config.priceGBP}
              marketCapGBP={config.marketCapGBP}
              percentageChange={config.percentageChange}
            />

            {/* Info panel: show only if no amount param */}
            <AnimatePresence>
              {!hasAmountParam && (
                <motion.div
                  key="info-panel"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="w-full max-w-3xl mx-auto mt-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-blue-900 dark:text-blue-100 text-center shadow"
                >
                  <span className="font-semibold">Tip:</span> Enter the amount of Pi coins you own and click{' '}
                  <span className="inline-flex items-center font-semibold">
                    Create Permalink
                    <Link className="h-4 w-4 text-amber-600 dark:text-amber-500 ml-1 inline" />
                  </span>{' '}
                  to see the value of your holdings.
                </motion.div>
              )}
            </AnimatePresence>

            <div className={`flex flex-col ${hasAmountParam ? 'lg:flex-row lg:space-x-8' : ''} w-full max-w-3xl mx-auto`}>
              <AnimatePresence>
                {hasAmountParam && amountConfig && (
                  <motion.div
                    key="holdings"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                    className="lg:w-1/2 flex flex-col"
                  >
                    <Holdings
                      count={amountConfig.customHoldings.count}
                      totalGBP={amountConfig.customHoldings.totalGBP}
                      high_24hGBP={amountConfig.customHoldings.high_24hGBP}
                      low_24hGBP={amountConfig.customHoldings.low_24hGBP}
                      allTimeHigh={amountConfig.customHoldings.allTimeHigh}
                      allTimeLow={amountConfig.customHoldings.allTimeLow}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
              <div className={`flex flex-col ${hasAmountParam ? 'lg:w-1/2' : 'w-full'}`}>
                <Converter
                  priceGBP={config.priceGBP}
                  piAmount={piAmount}
                  setPiAmount={setPiAmount}
                  onPermalink={(amount) => {
                    // After permalink, reload config for new amount
                    loadConfig(amount);
                  }}
                />
              </div>
            </div>
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
          {(config?.lastUpdated
            ? new Date(config.lastUpdated).toLocaleString("en-GB", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })
            : ''
          )}
        </div>
      </footer>
    </div>
  );
}

export default App;
