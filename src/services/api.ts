import { PiNetworkConfig } from '../types/PiNetworkConfig';
import { PiNetworkConfigWithAmount } from '../types/PiNetworkConfigWithAmount';

// Fetch config for a given currency (default: 'pi-network')
export const fetchPiNetworkConfig = async (currency: string = 'pi-network'): Promise<PiNetworkConfig> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const allData = await response.json();
    if (!allData[currency]) {
      throw new Error(`Currency '${currency}' not found in data.json`);
    }
    return allData[currency];
  } catch (error) {
    console.error('Error fetching configuration:', error);
    throw error;
  }
};

// Fetch config for a specific coin amount and currency, and add customHoldings
export const fetchPiNetworkConfigForAmount = async (
  coinAmount: number,
  currency: string = 'pi-network'
): Promise<PiNetworkConfigWithAmount> => {
  try {
    const response = await fetch(`${import.meta.env.BASE_URL}data/data.json`);
    if (!response.ok) {
      throw new Error('Failed to fetch configuration');
    }
    const allData = await response.json();
    const data = allData[currency];
    if (!data) {
      throw new Error(`Currency '${currency}' not found in data.json`);
    }

    // Add the new parameter based on coinAmount
    data.customHoldings = {
      count: coinAmount,
      totalGBP: +(data.priceGBP * coinAmount).toFixed(6),
      high_24hGBP: +(data.high_24hGBP * coinAmount).toFixed(6),
      low_24hGBP: +(data.low_24hGBP * coinAmount).toFixed(6),
      allTimeHigh: {
        priceGBP: +(data.allTimeHigh.priceGBP * coinAmount).toFixed(6),
        percentageChange: data.allTimeHigh.percentageChange,
        date: data.allTimeHigh.date
      },
      allTimeLow: {
        priceGBP: +(data.allTimeLow.priceGBP * coinAmount).toFixed(6),
        percentageChange: data.allTimeLow.percentageChange,
        date: data.allTimeLow.date
      }
    };

    return data as PiNetworkConfigWithAmount;
  } catch (error) {
    console.error('Error fetching configuration for amount:', error);
    throw error;
  }
};