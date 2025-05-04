import React, { useEffect, useState } from 'react';
import { fetchPiNetworkConfigForAmount } from '../services/api';
import { AlertTriangle } from 'lucide-react';

const HoldingsJsonPage: React.FC = () => {
  const [json, setJson] = useState<object | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const amount = Number(params.get('amount') || 1);
    fetchPiNetworkConfigForAmount(amount).then(data => {
      setJson(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="min-h-screen transition-colors duration-300 dark:bg-[#160c23] bg-gray-50 py-10">
      <div className="w-full max-w-3xl mx-auto mb-10 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-700 rounded-lg p-4 text-blue-900 dark:text-blue-100 text-center shadow flex items-start gap-3">
        <AlertTriangle className="h-8 w-8 text-amber-600 dark:text-amber-500 flex-shrink-0 mt-0.5" />
        <div className="text-left flex-1 space-y-4">
          <div>
            This JSON is generated client-side and cannot be returned as a raw <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">application/json</code> response due to GitHub Pages limitations.
          </div>
          <div>
            <span className="text-red-700 dark:text-red-400 font-semibold">This URL should not be used as an API endpoint for programmatic access.</span>
          </div>
          <div>
            <strong>How are the <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">customHoldings</code> values calculated?</strong>
          </div>
          <div>
            The <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">customHoldings</code> object is generated in the browser using the following calculations, where <code className="text-blue-700 dark:text-blue-300 bg-blue-100/30 dark:bg-blue-900/30 px-1 rounded">amount</code> is the number of Pi coins you provide:
            <ul className="list-disc list-inside mt-2 text-sm space-y-1">
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">count</code>: <code className="text-blue-700 dark:text-blue-300 bg-blue-100/30 dark:bg-blue-900/30 px-1 rounded">amount</code>
              </li>
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">totalGBP</code>: <span className="text-green-700 dark:text-green-400"><code>priceGBP</code> × <code>amount</code></span>
              </li>
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">high_24hGBP</code>: <span className="text-green-700 dark:text-green-400"><code>high_24hGBP</code> × <code>amount</code></span>
              </li>
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">low_24hGBP</code>: <span className="text-green-700 dark:text-green-400"><code>low_24hGBP</code> × <code>amount</code></span>
              </li>
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">allTimeHigh.priceGBP</code>: <span className="text-green-700 dark:text-green-400"><code>allTimeHigh.priceGBP</code> × <code>amount</code></span>
              </li>
              <li>
                <code className="text-amber-700 dark:text-amber-400 bg-amber-100/30 dark:bg-amber-900/30 px-1 rounded">allTimeLow.priceGBP</code>: <span className="text-green-700 dark:text-green-400"><code>allTimeLow.priceGBP</code> × <code>amount</code></span>
              </li>
              <li>
                <span className="text-gray-700 dark:text-gray-300">Percentage changes and dates are copied directly from the base data.</span>
              </li>
              <li>
                The percentage difference shown in the UI for 24h high/low is calculated as:
                <div className="ml-4 mt-1">
                  <code className="text-purple-700 dark:text-purple-300 bg-purple-100/30 dark:bg-purple-900/30 px-1 rounded">
                    ((<span className="text-green-700 dark:text-green-400">totalGBP</span> - <span className="text-green-700 dark:text-green-400">high_24hGBP</span>) / <span className="text-green-700 dark:text-green-400">totalGBP</span>) × 100
                  </code>
                  <span className="mx-2 text-gray-500 dark:text-gray-400">and</span>
                  <code className="text-purple-700 dark:text-purple-300 bg-purple-100/30 dark:bg-purple-900/30 px-1 rounded">
                    ((<span className="text-green-700 dark:text-green-400">totalGBP</span> - <span className="text-green-700 dark:text-green-400">low_24hGBP</span>) / <span className="text-green-700 dark:text-green-400">totalGBP</span>) × 100
                  </code>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl mx-auto">
        <pre style={{ background: '#222', color: '#fff', padding: 16, borderRadius: 8 }}>
          {JSON.stringify(json, null, 2)}
        </pre>
      </div>
    </div>
  );
};

export default HoldingsJsonPage;